הגדרת משתני סביבה

לצורך הפעלת הפרויקט צור קובץ בשם
.env
והדבק בתוכו את הטקסט הבא:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=iron_dome
```

הרצת הפרויקט

```
npm i express mysql2
docker compose up -d
docker exec -it iron-dome-db mysql -uroot -proot
npm start
```