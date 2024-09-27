# from dotenv import load_dotenv
# import os
# load_dotenv()

# SERVER_URL = 'localhost'
# # SERVER_URL = 'https://ai-calc-server.vercel.app'
# PORT = '8900'
# ENV = 'dev'
# GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Change SERVER_URL based on the environment
if os.getenv('ENV') == 'production':
    SERVER_URL = 'https://ai-calc-server.vercel.app'  # This allows the app to be accessible externally
else:
    SERVER_URL = 'localhost'  # Use localhost for development

# Use a default port
PORT = os.getenv('PORT', '8900')  # Set default port to 8900 if not specified
ENV = os.getenv('ENV', 'dev')  # Default to 'dev' if not specified
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # API key for Gemini, if required

# Print statements for debugging (optional)
print(f"SERVER_URL: {SERVER_URL}")
print(f"PORT: {PORT}")
print(f"ENV: {ENV}")
