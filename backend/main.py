from fastapi import FastAPI
from app.model import UserLogin, UserSchema
from app.auth.token import signJwt

app = FastAPI()

@app.get("/")
def hello():
    return {
        "hello": "world"
    };