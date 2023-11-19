from fastapi import APIRouter
from models.url import UrlModel
from database import urls_collection
from database import resultat_collection
from bs.datamodel import mainData
from bs.contact import mainContact
from bs.techno import findTechno
import requests
from bs4 import BeautifulSoup
from models.resultat import ResultatModel
from pydantic import ValidationError


router = APIRouter()

@router.post("/url/")
async def create_url(urls: UrlModel):
    url=urls.url
    techno=[]
    score_techno=0
    lien=[]
    mail=[]
    phone=[]

    result = requests.get(url)
    soup = BeautifulSoup(result.text, 'html.parser')
    score=mainData(soup,url)
    if score <0.55:
        string="C'est pas une agence de développement!"
        bool=False
    else:
        string="C'est une agence de développement!"
        bool=True
        technologie=(findTechno(soup,url))
        techno=(technologie[1])
        score_techno=(technologie[0])
        contacts=mainContact(soup,url)
        lien=(contacts[0])
        mail=(contacts[1])
        phone=(contacts[2])
        try:
            resultat=ResultatModel(url=url,techno=techno,phone=phone,mail=mail,msg=string)
            print(resultat)
            resultat_collection.insert_one(dict(resultat))
            urls_collection.insert_one(dict(urls))
        except ValidationError as e:
            print(e)
    return(string,techno,score_techno,lien,mail,phone,bool)