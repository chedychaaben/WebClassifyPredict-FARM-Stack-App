from bs4 import BeautifulSoup
import requests
import re
from database import techno_collection
from fastapi import APIRouter
from models.technologie import TechnoModel
from utils import serializeList

router = APIRouter()
# @router.get("/technologie")
# async def getTechno():
#     techno=serializeList(techno_collection.find())
#     list_techno=[]
#     for i in techno:
#         list_techno.append(i["name"])
#     return (list_techno)



        

def unique(list1):
    unique_list = []
    
    for x in list1:
        if x not in unique_list:
            
            unique_list.append(x)
    return (unique_list)
   

def findTechno(soup,url):
    liens = []
    for a in soup.find_all('a', href=True):
        l=a['href']
        if 'https' not in l:
            liens.append(url+l)
        else:
            liens.append(l)
    liens=unique(liens)
    rem=['mailto','facebook','instagram','whatsapp','javascript:','google','linkedin',"twitter"]
    for l in liens:
        for r in rem:
            if r in l :
                liens.remove(l)
                
    techno=serializeList(techno_collection.find())
    list_techno=[]
    for i in techno:
        list_techno.append(i["name"])       
    techno=list_techno
    print(techno)
    l=[0 for i in range(35)]
    for lien in liens:
        print(lien)
        try:
            result = requests.get(lien)
            soup2 = BeautifulSoup(result.text, 'html.parser')
            text=soup2.text.lower()
            
            for i in techno:
                if i in text:
                    l[techno.index(i)]=1
        except requests.exceptions.ConnectTimeout or requests.exceptions.ReadTimeout :
            continue

    score=0
    technologie=[]
    for i in range(0,35):
        if l[i] == 1 :
            score=score+l[i]
            technologie.append(techno[i])
    score=score*100/35
                
                
    return(score,technologie)
