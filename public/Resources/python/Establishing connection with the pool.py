import mysql.connector as connector
connection = connector.connect(user = 'root', password = 'sargun', host = 'localhost', database = 'little_lemon')

from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon', pool_name = 'll_pool', pool_size = 3)

print("Pool is created successfully with name: ", pool.pool_name)
print("Pool size is:", pool.pool_size)
print('Getting a connection from the pool')
connection_pool = pool.get_connection()
cursor = connection_pool.cursor()

select = """SELECT BookingID, GuestFirstName, GuestLastName FROM bookings"""
print('Executing SQL query.')
cursor.execute(select)

print('Printing results.')
results = cursor.fetchall()
print(cursor.column_names)
for result in results:
    print(result)

print('Closing connection.')
connection_pool.close()
print('Connection is placed back in the pool for other users to connect.')