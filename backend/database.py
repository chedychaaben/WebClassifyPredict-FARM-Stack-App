from pymongo import MongoClient


mongodb_uri = "" # Update your Mondodb URI here
port = 8000
connection = MongoClient(mongodb_uri, port)

# Users collection located in webclassifypredect database
users_collection = connection.webclassifypredect.users
urls_collection= connection.webclassifypredect.urls
techno_collection=connection.webclassifypredect.techno
resultat_collection=connection.webclassifypredect.resultat


