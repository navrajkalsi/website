import mysql.connector as connector
connection = connector.connect(user = 'root', password = 'sargun', host = 'localhost', database = 'little_lemon')

from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon', pool_name = 'll_pool', pool_size = 3)

guests = ["Anna", "Marcos", "Diana", "Joakim", "Hiroki"]

for guest in guests:
    try:
        pool.get_connection()
        print(f"{guest} is successfully connected to the pool.")

    except:
        print("No more connections are avaliable.")
        print("Creating new connecitons.")
        pool.add_connection(cnx = connection)
        print("New connection is avaliable now.")
        pool.get_connection()
        print(f"{guest} is now connected.")
