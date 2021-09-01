#!/usr/local/bin/python3
import sys
import os
import os.path
import glob
import time
import re
import mysql.connector
import pdftotext

from dotenv import dotenv_values
config = dotenv_values("../.env")

homedir = config['HOMEDIR']
documents = config['WEBDAVDIR']

All = False # -all  add and delete
clearDB = False # -x delete all database
delDB = False # -r delete missing document from DB
addDocuments = False # -a addDocuments

def help():
    print ('** Error: need more options!')
    print ('--help: Help')
    print ('-x: Delete all database')
    print ('-a: Check document and add database')
    print ('-r: Check missing document and remove from database')
    print ('-all: -a add -r')
    exit()

try:
    if len(sys.argv) == 1 :
        help()
    for opt in sys.argv:
        if opt == '-all':
            All = True
        elif opt == '-x':
            clearDB = True
        elif opt == '-r':
            delDB = True
        elif opt == '-a':
            addDocuments = True
        elif opt == '--help':
            help()

except Exception as e:
    help()

mydb = mysql.connector.connect(
  host = config['DBHOST'],
  user = config['DBUSER'],
  password = config['DBPASSWD'],
  database =config['DBNAME']
)

conn = mydb.cursor(dictionary=True)

# option -x delete all datas
if clearDB:
    print ('--- Delete All Documents ---')
    sql = "DELETE FROM rb"
    conn.execute(sql)
    mydb.commit()
    print(conn.rowcount, "record(s) deleted")


# option -a
if addDocuments or All:
    print ('--- Add New Documents ---')
    path = os.walk(documents)
    n = 0
    for root, directories, files in path:
        #del directories[0]
        if "docs" in directories:
            directories.remove("docs")
        for file in files: # loop files in directory
            if file.find('DS_Store') == -1 :  # skip mac dump file

                n += 1
                name =  root+'/'+file
                cat = root.split('/')[len(root.split('/'))-1]
                print ( n, cat, name)

                conn.execute("SELECT * FROM rb WHERE filename='"+file+"'")
                myresult = conn.fetchall()

                if len(myresult) == 0 :
                    '''
                    #extract pdf to output.txt
                    #os.system('java -jar ' + homedir + '/pdfbox-app-2.0.23.jar export:text  -i "'+ name +'" -o '+homedir+'/output.txt')
                    os.system('java -jar ' + homedir + '/pdfbox-app-2.0.23.jar ExtractText "'+ name +'" -o '+ homedir+'/output.txt')
                    #read output.text
                    inputf = open(homedir + '/output.txt', 'r')
                    text = ''
                    for line in inputf:
                        try:
                            text += line   # todo-> dosomethings eg,limit content size or thainlp
                        except KeyError:
                            pass
                    inputf.close()
                    # delete output.html
                    os.remove(homedir + '/output.txt')

                    cleaned_text = re.sub('[^A-Za-z0-9ก-๙\W]+', '', text)

                    print (cleaned_text)
                    '''
                    content=''
                    with open(name, "rb") as f:
                        pdf = pdftotext.PDF(f)
                        for page in pdf:
                            content += page.replace('\n','').replace('\r','')
                        #print (n, name)
                        #print (content)
                        #print ('--------------------------------------------')
                        #n += 1
                        path = root.replace(documents,'')
                        print ('==========================================')
                        sql = "INSERT INTO rb (cat, filename, content, path) VALUES (%s, %s, %s, %s)"
                        val = (cat, file, content, path)
                        conn.execute(sql, val)
                        mydb.commit()

                #print(conn.rowcount, "record inserted.")

    print ('total=',n)

# option -r check missing documents
if delDB or All:
    print ('--- Delete Missing Documents ---')
    conn.execute("SELECT path,filename FROM rb")
    results = conn.fetchall()
    for row in results:
        fname = documents + row['path']+'/'+row['filename']
        if os.path.exists(fname):
            print ('found->',fname)
        else:
            print ('** missing ->', fname)
            # delete delete database
            sql = "DELETE FROM rb WHERE filename = '"+row['filename']+"'"
            conn.execute(sql)
            mydb.commit()
            print(conn.rowcount, "record(s) deleted")
