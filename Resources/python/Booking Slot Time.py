import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT BookingID, CONCAT(GuestFirstName, GuestLastName) AS GuestFullName,
CASE
WHEN HOUR(BookingSlot) BETWEEN 15 AND 16 THEN 'Late Afternoon'
WHEN HOUR(BookingSlot) BETWEEN 17 AND 18 THEN 'Evening'
WHEN HOUR(BookingSlot) BETWEEN 19 AND 20 THEN 'Night'
END AS TimeSlot
FROM bookings;""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for result in results:
    print(result)