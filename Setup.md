## Clone repository
```
git clone https://github.com/ServerBlue/Blue
cd Blue
```

## Install dependencies
`npm i`

## Crate database structure

1. Open `database/example.sql` in text editor or just
print it in console with: `cat ./database/example.sql`
then copy script to clipboard.
2. Try to start server with:
`service postgresql start`
3. If you have no server install it with:
`sudo apt install postgresql -y`
Then start server (see step 2)
4. Run psql console
```
sudo -i -u postgres
psql
\l
```
5. If you see `application` database skip this step.
If no you need to create it wiyth: `create database application;`
6. Connect to `application` database with: `\c application`
7. Then paste SQL script to console and run it.
8. Exit psql with: `exit`

## Run main.js
`node main.js`
