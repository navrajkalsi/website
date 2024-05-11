from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon', pool_name = 'pool_a', pool_size = 2)

print("Pool is created successfully with name: ", pool.pool_name)
print("Pool size is:", pool.pool_size)

connection = pool.get_connection()
cursor = connection.cursor()

procedure_stmt = """CREATE PROCEDURE PeakHours()
BEGIN
SELECT HOUR(BookingSlot) AS Hour,
COUNT(HOUR(BookingSlot)) AS NumberOfBookings
FROM bookings
GROUP BY HOUR(BookingSlot)
ORDER BY NumberOfBookings DESC;
END"""

cursor.execute(procedure_stmt)

cursor.callproc("PeakHours")

results = next(cursor.stored_results())
dataset = results.fetchall()

for column_id in cursor.stored_results():
    columns = [column[0] for column in column_id.description]

print(columns)

for data in dataset:
    print(data)

connection.close()
print("The conenction has been put back into the pool successfully.")