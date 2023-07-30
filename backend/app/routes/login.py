from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy import or_
import bcrypt
from sqlalchemy.orm import Session
from app.model import UserLogin
from config import User, get_db
from app.auth.token import signJwt

router = APIRouter(tags=["login"])

@router.post("/login", status_code=201)
def login(user: UserLogin = Body(default=None), db: Session = Depends(get_db)):
    user_present = db.query(User).filter(
        or_(User.username == user.email_or_username, User.email == user.email_or_username)
    ).first()

    if user_present and bcrypt.checkpw(user.password.encode('utf-8'), user_present.password.encode('utf-8')):
        return signJwt(user.email_or_username), user_present.username
    else:
        raise HTTPException(status_code=404, detail="User not found or invalid credentials.")
