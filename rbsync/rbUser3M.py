#!/usr/local/bin/python3
import mysql.connector
from dotenv import dotenv_values
config = dotenv_values("../.env")

mydb = mysql.connector.connect(
  host = config['DBHOST'],
  user = config['DBUSER'],
  password = config['DBPASSWD'],
  database =config['DBNAME']
)

conn = mydb.cursor(dictionary=True)
print ('** delete user 3 Months **')
sql = "DELETE FROM rb_users WHERE updated < DATE(NOW() - INTERVAL 3 MONTH)"
conn.execute(sql)
mydb.commit()
print(conn.rowcount, "record(s) deleted")
