# from dotenv import load_dotenv
# import os
# load_dotenv()

# SERVER_URL = 'localhost'
# PORT = '8900'
# ENV = 'dev'
# GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')




from dotenv import load_dotenv
import os
load_dotenv()

SERVER_URL = os.getenv("SERVER_URL")
PORT = os.getenv('PORT')
ENV = ('ENV')
GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')
