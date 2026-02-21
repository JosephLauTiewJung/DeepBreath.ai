from pydantic import BaseModel, Field
from typing import Literal, List


class DoctorInfo(BaseModel):
    doctorName: str = Field(description="The name of the doctor")
    doctorSpecialization: str = Field(description="The specialization of the doctor")
    hospitalName: str = Field(description="The name of the hospital where the doctor works")
    hospitalAddress: str = Field(description="The address of the hospital where the doctor works")
    contactNumber: str = Field(description="The contact number of the doctor")
    emailAddress: str = Field(description="The email address of the doctor")
    lat: float = Field(description="The latitude of the hospital where the doctor works")
    lng: float = Field(description="The longitude of the hospital where the doctor works")
    availability: Literal['available', 'unavailable']  = Field(description="The availability of the doctor")

class FindDoctorResponseBaseModel(BaseModel):
    doctorInfo: List[DoctorInfo]