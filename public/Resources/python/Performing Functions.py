import mysql.connector as connector
connection = connector.connect(host = 'localhost', user = 'root', password = 'sargun', database = 'little_lemon')
cursor = connection.cursor()

select_stmt = """SELECT SUM(BookingID) AS books, SUM(BillAmount) AS bills, AVG(BillAmount) FROM orders""" 
cursor.execute(select_stmt)
print(cursor.column_names)
results = cursor.fetchall()
print("Today's statistics:")
for result in results:
    print("Number of bookings:",result[0])
    print("Total sale:",result[1])
    print("Average sale:",result[2])