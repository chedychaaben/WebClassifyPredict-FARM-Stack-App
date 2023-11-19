from fastapi import FastAPI
from pydantic import BaseModel, Field , validator
from utils import serializeList
from database import resultat_collection



class ResultatModel(BaseModel):
    url  : str  = Field()
    techno : list = Field()
    phone :  list  = Field()
    mail : list  = Field()
    msg: str = Field()

    @validator('url')
    def url_must_be_unique(cls, value):
        all_resultats = serializeList(resultat_collection.find())
        all_urls = []
        for result in all_resultats:
            url = result['url'].lower()
            all_urls.append(url)
        if value.lower() in all_urls:
            raise ValueError("Le URL est déja utilisé avant !")
        return value