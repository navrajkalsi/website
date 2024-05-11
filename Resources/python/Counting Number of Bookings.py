import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT TableNo AS TableNumber, COUNT(TableNo) AS NumberOfBookings FROM bookings GROUP BY TableNo ORDER BY NumberOfBookings DESC;""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for result in results:
    print(result)