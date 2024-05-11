import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT TableNo, GuestFirstName, GuestLastName, HOUR(BookingSlot), MINUTE(BookingSlot)
FROM bookings
ORDER BY HOUR(BookingSlot);"""
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for result in results:
    print(f"Table Number: {result[0]} >>> {result[1]} {result[2]} is expected to arrive at: {result[3]} hrs and {result[4]} mins.")