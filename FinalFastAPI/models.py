from sqlalchemy import Float, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime


class Patients(Base):
    __tablename__ = "Patients"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    ssn = Column(String)
    email = Column(String)
    age = Column(Integer)
    height = Column(Integer)
    weight = Column(Integer)
    insurance = Column(String)
    gender = Column(String)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    postal = Column(String)
    date_created = Column(DateTime, default=datetime.datetime.utcnow)
    date_modified = Column(DateTime, default=datetime.datetime.utcnow)

    encounters = relationship("Encounters", back_populates="owner")


class Encounters(Base):
    __tablename__ = "Encounters"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("Patients.id"))
    notes = Column(String)
    visit_code = Column(String)
    provider = Column(String)
    billing_code = Column(String)
    icd10 = Column(String)
    total_cost = Column(Float)
    copay = Column(Float)
    chief_complaint = Column(String)
    pulse = Column(Integer)
    systolic = Column(Integer)
    diastolic = Column(Integer)
    date = Column(String)
    date_created = Column(DateTime, default=datetime.datetime.utcnow)
    date_modified = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("Patients", back_populates="encounters")
