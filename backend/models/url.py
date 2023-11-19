from fastapi import FastAPI
from pydantic import BaseModel, Field

class UrlModel(BaseModel):
    url  : str  = Field()
    
