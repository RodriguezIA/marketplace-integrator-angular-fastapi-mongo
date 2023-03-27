from fastapi import APIRouter, Response
from ..config.db import conn
from ..schemas.user import userEntity, usersEntity
from ..models.user import User, UserLogin
from ..utils.jwt import encode, decode
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

user = APIRouter()

# TODO: para poder actualizar y crear se necesitan todos los cvampos excepto el id


@user.get('/', response_model=list[User], tags=["user"])
def find_all_user():
    return usersEntity(conn.local.user.find())


@user.get('/{id}', response_model=User, tags=["user"])
def find_user(id: str):
    return userEntity(conn.local.user.find_one({"_id":  ObjectId(id)}))


@user.post('/', response_model=User, tags=["user"])
def create_user(user: User):
    new_user = dict(user)
    new_user['password'] = encode(new_user['password'])
    del new_user['id']
    id = conn.local.user.insert_one(new_user).inserted_id
    user = conn.local.user.find_one({"_id": id})
    return userEntity(user)


@user.put('/{id}', response_model=User, tags=["user"])
def update_user(id: str, user: User):
    conn.local.user.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(user)})
    return userEntity(conn.local.user.find_one({"_id": ObjectId(id)}))


@user.delete('/{id}', status_code=HTTP_204_NO_CONTENT, tags=["user"])
def delete_user(id: str):
    userEntity(conn.local.user.find_one_and_delete({"_id":  ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)


@user.post('/login')
def login_user(data: UserLogin):
    email =  data.email
    password = data.password

    user = userEntity(conn.local.user.find_one({"email": email}))
    verify_password = decode(password, user["password"])
    
    if  verify_password == True:
        return ({ "Access": True, "user": user })
    else :
        return ({"Access": False, "user": {}})
