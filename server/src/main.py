from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.user import user


app = FastAPI()

# Configurar CORS
origins = ["*"] # Acepta solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user, prefix='/user')

# @app.get('/')
# async def read_results():
#     db = Prisma()
#     await db.connect()

#     post = await db.post.create(
#         {
#             'title': 'Hello from prisma!',
#             'desc': 'Prisma is a database toolkit and makes databases easy.',
#             'published': True,
#         }
#     )

#     print(f'created post: {post.json(indent=2, sort_keys=True)}')

#     await db.disconnect()

#     return post

