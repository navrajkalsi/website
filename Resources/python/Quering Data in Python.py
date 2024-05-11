import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

all_bookings = """SELECT GuestFirstName, GuestLastName, TableNo FROM Bookings"""
cursor.execute(all_bookings)
columns = cursor.column_names
print(columns)
result = cursor.fetchall()
for tuple in result:
    print(tuple)
