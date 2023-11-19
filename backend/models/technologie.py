from unicodedata import name
from fastapi import FastAPI
from pydantic import BaseModel, Field

class TechnoModel(BaseModel):
    name  : str  = Field()