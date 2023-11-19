from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as users_router
from routes.url import router as url_router
from auth.auth_bearer import JWTBearer
from bs.techno import router as techno_router

# Init app and adding routes handlers
app = FastAPI()
# Allowing CORSMiddleware Pour lallowage de communication entre les deux app (securité)  
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Including routers
app.include_router(users_router)
app.include_router(url_router)
app.include_router(techno_router)

@app.get('/', dependencies=[Depends(JWTBearer())], tags=["Root"])
async def root() -> dict:
    return {"message": "Welcome and Hello World from JWTed proptected route"}
