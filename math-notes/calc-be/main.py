# # .\venv\Scripts\activate
# #cd C:\Users\Lenovo\Downloads\Mukund\code\AI Calc\math-notes\calc-be
# #cd math-notes\calc-be

# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn
# from constants import SERVER_URL, PORT, ENV
# from apps.calculator.route import router as calculator_router 
 
 
 
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     yield
    
# app = FastAPI(lifespan=lifespan)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins = ["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# async def health():
#     return {"message": "Server is running"}

# app.include_router(calculator_router, prefix='/calculate', tags=['calculate'])

# if __name__ == '__main__':
#     uvicorn.run('main:app', host=SERVER_URL, port=int(PORT), reload=(ENV == 'dev'))


from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from constants import SERVER_URL, PORT, ENV
from apps.calculator.route import router as calculator_router 
from history import insert_calculation, display_history  # Import history functions

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"message": "Server is running"}

# Existing route to calculate
# @app.post("/calculate/store")
# async def store_and_get_calculation(request: Request):
#     data = await request.json()
#     user_input = data['input']
#     result = data['result']

#     # Store the previous calculation in MySQL
#     insert_calculation(user_input, result)
    
#     # Fetch updated history to send back to the frontend
#     history = display_history()
    
#     # Return the result of the new calculation and the updated history
#     return {
#         "message": "Calculation stored successfully", 
#         "input": user_input, 
#         "result": result,
#         "history": [{"id": h[0], "input": h[1], "result": h[2], "timestamp": h[3]} for h in history]
#     }



# Route to get the entire calculation history without recalculating
@app.get("/history")
async def get_history():
    history = display_history()
    
    return {
        "history": [{"id": h[0], "input": h[1], "result": h[2], "timestamp": h[3]} for h in history]
    }

# Include the calculator router for your existing logic
app.include_router(calculator_router, prefix='/calculate', tags=['calculate'])

if __name__ == '__main__':
    uvicorn.run('main:app', host=SERVER_URL, port=int(PORT), reload=(ENV == 'dev'))
