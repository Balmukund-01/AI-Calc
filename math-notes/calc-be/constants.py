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

# Update with your production URL provided by the hosting platform
SERVER_URL = os.getenv("SERVER_URL", "localhost")  # Replace with the actual production URL
PORT = os.getenv("PORT", "8900")  # Default to 443 for HTTPS
ENV = os.getenv("ENV", "dev")  # Set the environment to production
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
