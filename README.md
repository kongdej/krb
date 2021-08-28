# คุณระเบียบ\
--------\
@25-Aug-2021\
by kongdejs@gmail.com

## Installation
```
  $ git clone https://github.com/kongdej/krb.git;
  $ cd krb;
  $ npm install;
```

- Create database & Import table
```
  krb.sql
```
- create line BOT
```
  https://developers.line.biz/en/
```
- create line LIFF
```
  RB_LIFF_REGISTER: end point = <RB_HOST>/rb_register
  RB_LIFF_READPDF: end point = <RB_HOST>/rb_readpdf
  RB_LIFF_ADMIN: end point = <RB_HOST>/rb_admin
```

- Modify .env file
```
  ##-- Line Token --##
  # LINEBOT: RB
  RB_TOKEN = ""
  RB_SECRERT = ""
  RB_LIFF_ADMIN = ''
  RB_LIFF_REGISTER = ''
  RB_LIFF_READPDF = ''
  RB_DOCPATH = '',
  RB_HOST =

  ##-- Mysql Database --##
  DBHOST =
  DBUSER =
  DBPASSWD =
  DBNAME =

  ##-- WebDav --##
  HOMEDIR =
  WEBDAVDIR =

  ##- Contact --##
  CONTACT=''
  ##- DEV PORT --##
  PORT = 4000

  ##-- prod:dev --##
  NODE_ENV = dev

```

## WebDav Server
For Mac:
```
For Mac: In 'Finder', locate the menu bar at the top and then navigate to Go > Connect to Server.
enter the URL to your WebDAV directory in the 'Server Address' field.\
```

For Ubantu:
```
Install davfs2 package to mount WebDAV resource as regular file system.

$ sudo apt-get install davfs2

Mount WebDAV share using command-line
Create the mountpoint directory.

$ sudo mkdir /mnt/dav

$ sudo mount -t davfs -o noexec https://nextcloud.example.com/remote.php/webdav/ /mnt/dav/


Use umount command to unmount the WebDAV share.
$ sudo umount /mnt/dav
```

## Local Development
Install ngrok: https://ngrok.com/

```
  $ ngrok http 4000
  $ npm start
```
