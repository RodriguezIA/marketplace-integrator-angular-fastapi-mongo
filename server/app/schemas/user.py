# los esquemas son como los tipos de datos  que entiende el programa con la base de dato, no con el front
def userEntity(item) -> dict:
    user_dict = {
        "id": str(item["_id"]),
        "name": item["name"],
        "email": item["email"],
        "password": item["password"],
    }
    if "role" in item:
        user_dict["role"] = item["role"]
    return user_dict

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]