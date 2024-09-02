import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT HOUR(BookingSlot), COUNT(BookingID)
FROM bookings
GROUP BY HOUR(BookingSlot)
ORDER BY HOUR(BookingSlot);"""
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for result in results:
    print(f"Hour: {result[0]} <<>> {result[1]} Booking/s")