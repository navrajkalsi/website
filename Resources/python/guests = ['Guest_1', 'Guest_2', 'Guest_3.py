from mysql.connector.pooling import MySQLConnectionPool
from mysql.connector import Error
import mysql.connector as connector

connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')

try:
    pool = MySQLConnectionPool(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon', pool_name = 'pool_b', pool_size = 2)
    print("Pool is created successfully with name: ", pool.pool_name)
    print("Pool size is:", pool.pool_size)

except Error as er:
    print("An error has occurred.")
    print('Error code: ', er.errno)
    print('Error message: ', er.msg)

guests = ['Guest_1', 'Guest_2', 'Guest_3']

for guest in guests:
    try:
        guest = pool.get_connection()
        print(f"{guest} is now connected with the database.")
    except:
        print("No more connections are avaliable.")
        print("Creating new connection.")
        pool.add_connection(cnx=connection)
        print("New connection is avaliable now.")
        guest = pool.get_connection()
        print(f"{guest} is now connected with the database.")


cursor1 = Guest_1.cursor()
cursor1.execute('SHOW TABLES')
results_1 = cursor1.fetchall()
print(results_1)