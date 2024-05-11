import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT BookingID, TableNo, BookingSlot, ADDTIME(BookingSlot, "1:00:00")
FROM bookings
WHERE BookingID = 2 AND TableNo = 12;"""
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for result in results:
    print(f"Booking Time Change ALERT!\nBooking ID: {result[0]}\nTable Number: {result[1]}\nBooked Slot: {result[2]}\nNew Arrival Time: {result[3]}")