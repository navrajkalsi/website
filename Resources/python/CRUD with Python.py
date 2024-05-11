import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

update_stmt = """UPDATE bookings
SET TableNo = 10
WHERE BookingID = 6;"""
cursor.execute(update_stmt) 

select_stmt = """SELECT * FROM bookings""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for t in results:
    print(t)
connection.commit()