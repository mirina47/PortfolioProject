var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

// Указание, что каталог files используется для хранения статических файлов
app.use(express.static("./app/files"));


var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

app.listen(3000);

var auth = require('./app/route/auth.route.js');
auth(app);

var user = require('./app/route/user.route.js');
user(app);

var university = require('./app/route/university.route.js');
university(app);

var faculty = require('./app/route/faculty.route.js');
faculty(app);

var direction = require('./app/route/direction.route.js');
direction(app);

var student_group = require('./app/route/student_group.route.js');
student_group(app);

var category = require('./app/route/category.route.js');
category(app);

var work = require('./app/route/work.route.js');
work(app);
