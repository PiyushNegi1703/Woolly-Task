from pydantic import BaseModel, Field ,EmailStr

class UserSchema(BaseModel):
    username : str = Field(default=None)
    email : EmailStr = Field(default=None)
    password : str = Field(default=None)

    class Config:
        schema_format = {
            "demo": {
                "username": "xyz",
                "email": "abc@xyz.com",
                "password": "Abc123#"
            }
        }

class UserLogin(BaseModel):
    email_or_username : str = Field(default=None)
    password : str = Field(default=None)

    class Config:
        schema_format = {
            "demo": {
                "email": "abc@xyz.com",
                "password": "Abc123#"
            }
        }