from fastapi import FastAPI, Depends, Header, HTTPException
from app.routes import signup, login
from fastapi.middleware.cors import CORSMiddleware
from app.auth.token import decodeJWT

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def token_from_header(authorization : str = Header(None)):
    if authorization is None or not authorization.startswith("Bearer "):
        return None
    
    token = authorization.replace("Bearer ", "")
    return token

@app.get('/', tags=["main"])
def greet(token : str = Depends(token_from_header)):
    if token is None:
        raise HTTPException(status_code=401, detail="Unauthorised user please login")
    else:
        raise HTTPException(status_code=200)

app.include_router(signup.router)
app.include_router(login.router)