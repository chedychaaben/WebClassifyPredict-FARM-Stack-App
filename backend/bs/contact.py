from bs4 import BeautifulSoup
import requests
import re


def unique(list1):
    unique_list = []
    
    for x in list1:
        if x not in unique_list:
            
            unique_list.append(x)
    return (unique_list)
   

def findLinks(soup):
    liens = []
    for a in soup.find_all('a', href=True):
        liens.append(a['href'])
    return(liens)


def FindContactUrl(liens,url):
    sub = 'contact'
    lienC = ""
    for lien in liens:
        if sub in lien:

            if 'http' in lien:
                lienC = lien
            else:
                lienC = url+lien

    if lienC == '':
        lienC = url
    return(lienC)


def FindMail(soup):
    reg = '(\w+@\w+\.+\w+)'
    mail = re.findall(reg, soup.text)
    return(mail)


def FindPhone(soup):

    reg = "(\(?\+?\(?\d{1,3}\)?\s?\d{1,3}\s?\d{1,3}\s?\d{2,3}\s?\d{1,4}\s?\d{1,4}\s?\d{1,4})"
    phone = re.findall(reg, soup.text)
    return(phone)


def ScrapContact(lien):
    listlien=[lien]
    listPhone=[]
    listMail=[]
    listCont=[]
    result = requests.get(lien)
    soup2 = BeautifulSoup(result.text, 'html.parser')
    for p in FindPhone(soup2):
        listPhone.append(p)
    for m in FindMail(soup2):
        listMail.append(m)
    listCont.append(listlien)
    listCont.append(unique(listMail))
    listCont.append(unique(listPhone))
    return(listCont)
        

def mainContact(soup,url):
    liens = findLinks(soup)
    cont = FindContactUrl(liens,url)
    return(ScrapContact(cont))
    