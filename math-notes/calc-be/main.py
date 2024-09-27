# .\venv\Scripts\activate
#cd C:\Users\Lenovo\Downloads\Mukund\code\AI Calc\math-notes\calc-be
#cd math-notes\calc-be

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from constants import SERVER_URL, PORT, ENV
from apps.calculator.route import router as calculator_router 
 
 
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://mukund-project.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"message": "Server is running"}

app.include_router(calculator_router, prefix='/calculate', tags=['calculate'])

if __name__ == '__main__':
    uvicorn.run('main:app', host=SERVER_URL, port=int(PORT), reload=(ENV == 'dev'))