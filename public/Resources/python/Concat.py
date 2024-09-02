import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT BookingID AS ID, CONCAT(GuestFirstName, GuestLastName) AS GuestFullName FROM bookings""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for t in results:
    print(t)