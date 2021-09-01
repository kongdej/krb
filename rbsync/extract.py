import pdftotext
import os

# Load your PDF
path = os.walk('/Volumes/539953/Line')
n = 0
for root, directories, files in path:
    for file in files:
        name =  root+'/'+file
        content = ''
        with open(name, "rb") as f:
            pdf = pdftotext.PDF(f)
            for page in pdf:
                content += page.replace('\n','').replace('\r','')
            print (n, name)
            print (content)
            print ('--------------------------------------------')
            n += 1
