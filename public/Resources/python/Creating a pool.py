import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon', pool_name = 'll_pool', pool_size = 3)
print("Pool is created successfully with name: ", pool.pool_name)
print("Pool size is:", pool.pool_size)