from fastapi import APIRouter
import base64
from io import BytesIO
from apps.calculator.utils import analyze_image
from schema import ImageData
from PIL import Image
import MySQLdb

# Connect to MySQL database
def get_db_connection():
    return MySQLdb.connect(host="localhost", user="root", password="mukund224", db="calhis")
print("connected to database")

router = APIRouter()


# Function to insert a new calculation
def insert_calculation(user_input, result):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO history (user_input, result) VALUES (%s, %s)"
    cursor.execute(sql, (user_input, result))
    conn.commit()
    cursor.close()
    conn.close()

@router.post('')
async def run(data: ImageData):
    image_data = base64.b64decode(data.image.split(",")[1])  #Assumes data:image/png;base64,<data>
    image_bytes = BytesIO(image_data)
    image = Image.open(image_bytes)
    responses = analyze_image(image, dict_of_vars=data.dict_of_vars)
    data = []
    for response in responses:
        data.append(response)
        insert_calculation(response['expr'], response['result'])
    print('response in route: ', response)
    return {"message": "Image processed", "data": data, "status": "success"}