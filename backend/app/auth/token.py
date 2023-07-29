import time
import jwt
from decouple import config

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

def token_resp(token : str):
    return {
        "token" : token
    }

def signJwt(userId : str):
    payload = {
        "userId" : userId,
        "expiry" : time.time() + 1800
    }

    token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return token_resp(token)

def decodeJWT(token : str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        return decode_token if decode_token["expires"] >= time.time() else None
    except:
        {}