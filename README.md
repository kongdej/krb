# krb
คุณระเบียบ\
--------\
@25-Aug-2021\
@kongdejs

- Installation
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

  ##- Contact --##
  CONTACT=''
  ##- DEV PORT --##
  PORT = 4000

  ##-- prod:dev --##
  NODE_ENV = dev

```

- Connect to WebDav Server\
For Mac: In 'Finder', locate the menu bar at the top and then navigate to Go > Connect to Server.
enter the URL to your WebDAV directory in the 'Server Address' field.\

For Ubantu: \
xxx

  - for dev
```
  $ ngrok http 4000
  $ npm start
```
