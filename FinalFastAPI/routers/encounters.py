import sys
sys.path.append("..")

from typing import Optional
from fastapi import Depends, HTTPException, APIRouter
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel, validator, ValidationError
import re

router = APIRouter(
    prefix="/patients/{patient_id}/encounters",
    tags=["encounters"],
    responses={404: {"description": "Not found"}}
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Encounter(BaseModel):
    notes: Optional[str]
    visit_code: str
    provider: str
    billing_code: str
    icd10: str
    total_cost: float
    copay: float
    chief_complaint: str
    pulse: Optional[int]
    systolic: Optional[int]
    diastolic: Optional[int]
    date: str

    @validator('visit_code')
    def visit_code_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def visit_code_must_follow_format(cls, v):
        rgvc = re.search("^([A-Z][0-9][A-Z]) ([0-9][A-Z][0-9])$", v)
        if not rgvc:
            raise ValueError(f'{v} must follow the following format: A1B 2C3')
        return v
    
    @validator('provider')
    def provider_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    
    @validator('billing_code')
    def billing_code_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def billing_code_must_follow_format(cls, v):
        rgbc = re.search("^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$", v)
        if not rgbc:
            raise ValueError(f'{v} must follow the following format: 123.456.789-12')
        return v
    
    @validator('icd10')
    def icd10_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def icd10_must_follow_format(cls, v):
        rgicd = re.search("^[A-Z][0-9]{2}$", v)
        if not rgicd:
            raise ValueError(f'{v} must follow the following format: A22')
        return v
    
    @validator('chief_complaint')
    def chief_complaint_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    
    @validator('pulse')
    def pulse_must_be_positive(cls, v):
        if v is not None and v < 1:
            raise ValueError(f'{v} must be a positive number')
        return v
    
    @validator('systolic')
    def systolic_must_be_positive(cls, v):
        if v is not None and v < 1:
            raise ValueError(f'{v} must be a positive number')
        return v
    
    @validator('diastolic')
    def diastolic_must_be_positive(cls, v):
        if v is not None and v < 1:
            raise ValueError(f'{v} must be a positive number')
        return v
    
    @validator('date')
    def date_required(cls, v):
        if v is None or v == '':
            raise ValueError(f'{v} is required')
        return v
    def date_must_follow_format(cls, v):
        rgicd = re.search("^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$", v)
        if not rgicd:
            raise ValueError(f'{v} must have a valid month/day and follow the following format: YYYY-MM-DD')
        return v
    

@router.get("/", status_code=200)
async def get_encounters_by_patient_id(patient_id: int, db: Session = Depends(get_db)):

    try:
        return db.query(models.Encounters).filter(models.Encounters.patient_id == patient_id).all()
    except:
        raise service_unavailable_exception()
    

@router.get("/{encounter_id}", status_code=200)
async def get_encounter_by_id(encounter_id: int, db: Session = Depends(get_db)):

    try:
        encounter_model = db.query(models.Encounters).filter(models.Encounters.id == encounter_id).first()
    except:
        raise service_unavailable_exception()
    
    if encounter_model is None:
        raise HTTPException(status_code=404, detail=f"Encounter with id: {encounter_id} could not be found.", headers=["Not Found"])
    
    return encounter_model

@router.post("/", status_code=201)
async def create_encounter(patient_id: int, encounter: Encounter, db: Session = Depends(get_db)):

    encounter_model = models.Encounters(
        patient_id = patient_id,
        notes = encounter.notes,
        visit_code = encounter.visit_code,
        provider = encounter.provider,
        billing_code = encounter.billing_code,
        icd10 = encounter.icd10,
        total_cost = encounter.total_cost,
        copay = encounter.copay,
        chief_complaint = encounter.chief_complaint,
        pulse = encounter.pulse,
        systolic = encounter.systolic,
        diastolic = encounter.diastolic,
        date = encounter.date
    )
    
    try:
        existing_patient = db.query(models.Patients).filter(models.Patients.id == patient_id).first()
    except:
        raise service_unavailable_exception()

    if existing_patient is None:
        raise HTTPException(status_code=404, detail="Encounter patient_id does not match any patient in the database.", headers=["Not Found"])
    else:
        db.add(encounter_model)
        db.commit()


@router.put("/{encounter_id}", status_code=200)
async def update_encounter(patient_id: int, encounter_id: int, edited_encounter: Encounter, db: Session = Depends(get_db)):

    try:
        encounter_model = db.query(models.Encounters).filter(models.Encounters.id == encounter_id).first()
    except:
        raise service_unavailable_exception()
    
    if encounter_model is None:
        raise HTTPException(status_code=404, detail=f"Encounter with id: {encounter_id} could not be found.", headers=["Not Found"])
    else:
        try:
            encounter_model.patient_id = patient_id
            encounter_model.notes = edited_encounter.notes
            encounter_model.visit_code = edited_encounter.visit_code
            encounter_model.provider = edited_encounter.provider
            encounter_model.billing_code = edited_encounter.billing_code
            encounter_model.icd10 = edited_encounter.icd10
            encounter_model.total_cost = edited_encounter.total_cost
            encounter_model.copay = edited_encounter.copay
            encounter_model.chief_complaint = edited_encounter.chief_complaint
            encounter_model.pulse = edited_encounter.pulse
            encounter_model.systolic = edited_encounter.systolic
            encounter_model.diastolic = edited_encounter.diastolic
            encounter_model.date = edited_encounter.date
        except ValidationError as e:
            raise e
        
        existing_patient = db.query(models.Patients).filter(models.Patients.id == encounter_model.patient_id).first()

        if existing_patient is None:
            raise HTTPException(status_code=404, detail="Encounter patient_id does not match any patient in the database.", headers=["Not Found"])

        db.add(encounter_model)
        db.commit()


def service_unavailable_exception():
    return HTTPException(status_code=503, detail="There was a problem connecting to the database.", headers=["Service Unavailable"])
