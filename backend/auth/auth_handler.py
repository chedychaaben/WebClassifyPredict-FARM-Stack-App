import os
import time
import jwt
from typing import Dict
#from decouple import config
# Load .env file
from dotenv import load_dotenv
load_dotenv()


# print(os.environ.get("JWT_SECRET"))

JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM")
SESSSION_TIME_EXPIRATION = 9000  # Seconds

# Normal function


def token_response(token: str):
    return {
        "access_token": token
    }


def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        # the number of seconds passed since epoch
        "expires": time.time() + SESSSION_TIME_EXPIRATION
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(
            token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}
