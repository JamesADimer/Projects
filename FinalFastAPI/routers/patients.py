import sys
sys.path.append("..")

from fastapi import Depends, HTTPException, APIRouter
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel, validator, ValidationError
import re

router = APIRouter(
    prefix="/patients",
    tags=["patients"],
    responses={404: {"description": "Not found"}}
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Patient(BaseModel):
    first_name: str
    last_name: str
    ssn: str
    email: str
    age: int
    height: int
    weight: int
    insurance: str
    gender: str
    street: str
    city: str
    state: str
    postal: str

    @validator('first_name', 'last_name')
    def name_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def name_must_only_contain_alphanumeric(cls, v):
        assert re.search("[^A-Za-z \-']", v), f'{v} must only be alphabetic characters only allowing apostrophes ( \' ) or dashes ( - )'
        return v
    
    @validator('ssn')
    def ssn_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def ssn_must_follow_format(cls, v):
        rgssn = re.search("^[0-9]{3}-[0-9]{2}-[0-9]{4}$", v)
        if not rgssn:
            raise ValueError(f'{v} must follow the following format: 123-12-1234')
        return v
    
    @validator('email')
    def email_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def email_must_follow_format(cls, v):
        rgemail = re.search("^[A-Za-z0-9]+@[A-Za-z]+\.([A-Za-z]{2,4})$", v)
        if not rgemail:
            raise ValueError(f'{v} must follow the following format: username@domain.com')
        return v
    
    @validator('age', 'height', 'weight')
    def field_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def field_must_be_positive_whole_number(cls, v):
        if v < 1:
            raise ValueError(f'{v} must be a positive whole number')
        return v
    
    @validator('insurance')
    def insurance_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    
    @validator('gender')
    def gender_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def gender_must_be_listed(cls, v):
        genders = ['Male', 'Female', 'Other']
        if v not in genders:
            raise ValueError(f'{v} must be Male, Female, or Other')
        return v
    
    @validator('street')
    def street_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    
    @validator('city')
    def city_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    
    @validator('state')
    def state_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def state_must_be_listed(cls, v):
        states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
        if v not in states:
            raise ValueError(f'{v} must be a valid two letter abbreviation')
        return v
    
    @validator('postal')
    def postal_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def postal_must_follow_format(cls, v):
        rgpostal = re.search("^[0-9]{5}(?:-[0-9]{4})?$", v)
        if not rgpostal:
            raise ValueError(f'{v} must follow the following format: 12345 or 12345-1234')
        return v
    
    class Config:
        validate_assignment = True
    

@router.get("/", status_code=200)
async def get_patients(db: Session = Depends(get_db)):

    try:
        return db.query(models.Patients).all()
    
    except:
        raise service_unavailable_exception()


@router.get("/{patient_id}", status_code=200)
async def get_patient_by_id(patient_id: int, db: Session = Depends(get_db)):

    try:
        patient_model = db.query(models.Patients).filter(models.Patients.id == patient_id).first()

    except:
        raise service_unavailable_exception()

    if patient_model is None:
        raise HTTPException(status_code=404, detail=f"Patient with id: {patient_id} could not be found.")
    
    return patient_model


@router.post("/", status_code=201)
async def create_patient(patient: Patient, db: Session = Depends(get_db)):

    patient_model = models.Patients(
        first_name = patient.first_name,
        last_name = patient.last_name,
        ssn = patient.ssn,
        email = patient.email,
        age = patient.age,
        height = patient.height,
        weight = patient.weight,
        insurance = patient.insurance,
        gender = patient.gender,
        street = patient.street,
        city = patient.city,
        state = patient.state,
        postal = patient.postal,
    )

    try:
        existing_patient = db.query(models.Patients).filter(models.Patients.email == patient.email).first()
    except:
        raise service_unavailable_exception()

    if existing_patient is not None:
        raise HTTPException(status_code=409, detail="A patient with this email already exists.")
    else:
        db.add(patient_model)
        db.commit()
        db.refresh(patient_model)
        return patient_model


@router.put("/{patient_id}", status_code=200)
async def update_patient(patient_id: int, edited_patient: Patient, db: Session = Depends(get_db)):

    try:
        patient_model = db.query(models.Patients).filter(models.Patients.id == patient_id).first()
    except:
        raise service_unavailable_exception()
    
    if patient_model is None:
        raise HTTPException(status_code=404, detail=f"Patient with id: {patient_id} could not be found.")
    else:
        try:
            patient_model.first_name = edited_patient.first_name
            patient_model.last_name = edited_patient.last_name
            patient_model.ssn = edited_patient.ssn
            patient_model.email = edited_patient.email
            patient_model.age = edited_patient.age
            patient_model.height = edited_patient.height
            patient_model.weight = edited_patient.weight
            patient_model.insurance = edited_patient.insurance
            patient_model.gender = edited_patient.gender
            patient_model.street = edited_patient.street
            patient_model.city = edited_patient.city
            patient_model.state = edited_patient.state
            patient_model.postal = edited_patient.postal
        except ValidationError as e:
            raise e
        
        existing_patient = db.query(models.Patients).filter(models.Patients.email == patient_model.email).first()

        if existing_patient is not None:
            raise HTTPException(status_code=409, detail="A patient with this email already exists.")

        db.add(patient_model)
        db.commit()


@router.delete("/{patient_id}", status_code=200)
async def delete_patient_by_id(patient_id: int, db: Session = Depends(get_db)):

    try:
        patient_model = db.query(models.Patients).filter(models.Patients.id == patient_id).first()
        #existing_encounter = db.query(models.Encounters).filter(models.Encounters.patient_id == patient_id).first()
    except:
        raise service_unavailable_exception()
    
    if patient_model is None:
        raise HTTPException(status_code=404, detail=f"Patient with id: {patient_id} could not be found.")
    #elif existing_encounter is not None:
        #raise HTTPException(status_code=409, detail=f"Patient with id: {patient_id} has encounters associated with it and could not be deleted.")
    else:
        db.query(models.Patients).filter(models.Patients.id == patient_id).delete()
        db.commit()


def service_unavailable_exception():
    return HTTPException(status_code=503, detail="There was a problem connecting to the database.")
