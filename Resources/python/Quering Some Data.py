import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT * FROM Menus;"""
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchmany(3)
for tuple in results:
    print(tuple)