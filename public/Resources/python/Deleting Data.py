import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

del_stmt = """DELETE FROM menus WHERE Cuisine = 'Greek'"""
cursor.execute(del_stmt)
select_stmt = """SELECT * FROM menus""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
for t in results:
    print(t)

connection.commit()