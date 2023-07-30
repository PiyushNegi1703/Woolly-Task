from fastapi import APIRouter, Body, Depends, HTTPException
from app.model import UserSchema
from app.auth.token import signJwt
from config import User, get_db
from sqlalchemy.orm import Session
import bcrypt

router = APIRouter(
    tags=["user"]
)

@router.post("/signup", status_code=201)
def signup(user : UserSchema = Body(default=None), db : Session = Depends(get_db)):
    username_present = db.query(User).filter_by(
        username = user.username
    ).first()

    email_present = db.query(User).filter_by(
        email = user.email
    ).first()

    if(username_present):
        raise HTTPException(status_code=409, detail="Username already taken")
    
    elif(email_present):
        raise HTTPException(status_code=409, detail="Email already registered. Please login")
    
    else:
        salt = bcrypt.gensalt(9)
        hashed_pass = bcrypt.hashpw(user.password.encode("utf-8"), salt)
        decoded_pass = hashed_pass.decode('utf-8')

        print(hashed_pass, decoded_pass)

        db_user = User(username=user.username, email=user.email, password=decoded_pass)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        db.close()

        return signJwt(user.email), user.username