import MySQLdb

# Connect to MySQL database
def get_db_connection():
    return MySQLdb.connect(host="localhost", user="root", password="mukund224", db="calhis")
print("connected to database")

# Function to insert a new calculation
def insert_calculation(user_input, result):
    conn = get_db_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO history (user_input, result) VALUES (%s, %s)"
    cursor.execute(sql, (user_input, result))
    conn.commit()
    cursor.close()
    conn.close()

# Function to display all calculation history
def display_history():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM history ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

# # Example Usage: Insert a calculation into the database
# insert_calculation("user_input", "result")
# # Example Usage: Fetch and display all history
# history = display_history()
# print(history)
