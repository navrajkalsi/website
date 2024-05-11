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

try:
    connection1 = pool.get_connection()
    print("Guest 1 is now connected.")

except:
    print("No free connections are avaliable.")
    print("Adding new conenctions.")
    pool.add_connection(cnx = connection)
    print("New connection is avaliable.")
    connection1 = pool.get_connection()
    print("Guest 1 is now connected.")

cursor1 = connection1.cursor()
stmt_1 = """INSERT INTO bookings(TableNo, GuestFirstName, GuestLastName, BookingSlot, EmployeeID) VALUES(8, 'Anees', 'Java', '18:00', 6)"""
cursor1.execute(stmt_1)

try:
    connection2 = pool.get_connection()
    print("Guest 2 is now connected.")

except:
    print("No free connections are avaliable.")
    print("Adding new conenctions.")
    pool.add_connection(cnx = connection)
    print("New connection is avaliable.")
    connection2 = pool.get_connection()
    print("Guest 2 is now connected.")

cursor2 = connection2.cursor()
stmt_2 = """INSERT INTO bookings(TableNo, GuestFirstName, GuestLastName, BookingSlot, EmployeeID) VALUES(5, 'Bald', 'Vin', '19:00', 6"""
cursor2.execute(stmt_2)

try:
    connection3 = pool.get_connection()
    print("Guest 3 is now connected.")

except:
    print("No free connections are avaliable.")
    print("Adding new conenctions.")
    pool.add_connection(cnx = connection)
    print("New connection is avaliable.")
    connection3 = pool.get_connection()
    print("Guest 3 is now connected.")

cursor3 = connection3.cursor()
stmt_3 = """INSERT INTO bookings(TableNo, GuestFirstName, GuestLastName, BookingSlot, EmployeeID) VALUES(12, 'Jay', 'Kon', '19:30', 6"""

connection1.commit()
connection2.commit()
connection3.commit()
print("All the changes have been saved.")

connection1.close()
connection2.close()
connection3.close()
print('All the connections have been put back in the pool.')

cursor = connection.cursor()

print("The requested report is as follows:\n")

report_stmt = """SELECT Name, EmployeeID FROM employees WHERE Role = 'Manager';"""
cursor.execute(report_stmt)
results = cursor.fetchall()
print("Information about Little Lemon Manager:")
print(cursor.column_names)
for result in results:
    print(result)

report_stmt2 = """SELECT Name, Role FROM employees WHERE Annual_Salary = '$70,000';"""
cursor.execute(report_stmt2)
results2 = cursor.fetchall()
print("Name and Role of the highest paid employee are as follows:\n")
print(cursor.column_names)
for result in results2:
    print(result)

report_stmt3 = """SELECT COUNT(BookingID) FROM bookings WHERE BookingSlot BETWEEN '18:00:00' AND ,20:00:00';"""
cursor.execute(report_stmt3)
result3 = cursor.fetchall()
print("The number of bookings between 18 hrs and 20 hrs is:")
print(result3)

report_stmt4 = """SELECT CONCAT('GuestFirstName',' ', 'GuestLastName') AS GuestFullName, BookingID FROM bookings ORDER BY BookingSlot"""
cursor.execute(report_stmt4)
result4 = cursor.fetchall()
print("The Full Name and Booking ID of all guests are: ")
print(cursor.column_names)
for result in result4:
    print(result)

proc_stmt = """CREATE PROCEDURE BasicSalesReport()
BEGIN
SELECT SUM(BillAmount) AS TotalSales, AVG(BillAmount) AS AverageSale, MIN(BillAmount) AS MinBill, MAX(BillAmount) AS MaxBill FROM orders;
END"""
cursor.execute(proc_stmt)

cursor.callproc("BasicSalesReport")

result5 = next(cursor.stored_results())
dataset = result5.fetchall()

for column_id in cursor.stored_results():
    columns = [column[0] for column in column_id.description]
print(columns)
for data in dataset:
    print(data)

conn = pool.get_connection()
buff_cursor = conn.cursor(buffered = True)

query = """SELECT bookings.BookingSlot AS BookingSlot, CONCAT('bookings.GuestFirstName',' ','bookings.GuestLastName') AS Guest_name, employees.Name AS EmployeeName, employees.Role AS EmployeeRole
FROM bookings
INNER JOIN
employees ON bookings.EmployeeID = employees.EmployeeID """

buff_cursor.execute(query)

results = buff_cursor.fetchmany(3)

for result in results:
    print([result[0]])
    print([result[1]])
    print(f"Assigned to: {result[2]} [{result[3]}]")
