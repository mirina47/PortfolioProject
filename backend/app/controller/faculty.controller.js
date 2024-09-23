var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Faculty = db.faculty;
var University = db.university;

// Получение всех факультетов
exports.findAll = (req, res) => {
    Faculty.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление факультета
exports.create = (req, res) => {
    Faculty.create({
        name: req.body.name,
        university_id: req.body.university_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление факультета по id
exports.update = (req, res) => {
    Faculty.update({
            name: req.body.name,
            university_id: req.body.university_id
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


// Удаление факультета по id
exports.delete = (req, res) => {
    Faculty.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение информации об факультете по id
exports.findById = (req, res) => {
    Faculty.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка факультетов по id университета
exports.findByUniversityId = (req, res) => {
    Faculty.findAll({
        where: {
            university_id: req.params.university_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
