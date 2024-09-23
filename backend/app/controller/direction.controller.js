var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Direction = db.direction;

// Получение всех направлений
exports.findAll = (req, res) => {
    Direction.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление направления
exports.create = (req, res) => {
    Direction.create({
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление направления по id
exports.update = (req, res) => {
    Direction.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Удаление направления по id
exports.delete = (req, res) => {
    Direction.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение информации о направлении по id
exports.findById = (req, res) => {
    Direction.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
