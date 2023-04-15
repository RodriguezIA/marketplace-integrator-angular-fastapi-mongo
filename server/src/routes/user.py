from fastapi import APIRouter, Response
from passlib.hash import sha256_crypt

import asyncio
from prisma import Prisma

from ..models import User

user = APIRouter()

# TODO: para poder actualizar y crear se necesitan todos los cvampos excepto el id

# get all users
@user.get('/')
async def find_all_user():
    db = Prisma()
    await db.connect()

    users = await db.user.find_many()
    return users

# get user by id
@user.get('/{id}')
def find_user(id: str):
    return 'hi user'

# get user by email
@user.post('/login')
async def find_user(user: User):
    db = Prisma()
    await db.connect()

    userData = await db.user.find_first(
        where={
            'email': user.email
        }
    )

    if userData is not None:
        passVerify = sha256_crypt.verify(user.password, userData.password)
        if passVerify == True:
            return userData
        else:
            return ({
                "acces": "false",
                "msj": "password is incorrect"
            })
    else:
        return ({
            "acces": "false",
            "msj": "user not found"
        })


# create user
@user.post('/')
async def create_user(user: User):
    db = Prisma()
    await db.connect()

    passwor_hased = sha256_crypt.encrypt(user.password)

    user = await db.user.create(
        data={
            'name': user.name,
            'email': user.email,
            'password': passwor_hased,
            'role': user.role
        },
    )

    return user

# update user
@user.put('/{id}')
def update_user(id: str):
    return 'hi user'

# delete user
@user.delete('/{id}')
def delete_user(id: str):
    return 'hi user'