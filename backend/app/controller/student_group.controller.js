var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var StudentGroup = db.student_group;

// Получение всех студенческих групп
exports.findAll = (req, res) => {
    StudentGroup.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление студенческой группы
exports.create = (req, res) => {
    StudentGroup.create({
        name: req.body.name,
        direction_id: req.body.direction_id,
        faculty_id: req.body.faculty_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление студенческой группы по id
exports.update = (req, res) => {
    StudentGroup.update({
            name: req.body.name,
            direction_id: req.body.direction_id,
            faculty_id: req.body.faculty_id
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


// Удаление студенческой группы по id
exports.delete = (req, res) => {
    StudentGroup.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение информации о студенческой группы по id
exports.findById = (req, res) => {
    StudentGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка студенческих групп по id факультета
exports.findByFacultyId = (req, res) => {
    StudentGroup.findAll({
        where: {
            faculty_id: req.params.faculty_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение списка студенческих групп по id направления
exports.findByDirectionId = (req, res) => {
    StudentGroup.findAll({
        where: {
            direction_id: req.params.direction_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение списка студенческих групп по id факультета и направления
exports.findByFacultyAndDirectionId = (req, res) => {
    StudentGroup.findAll({
        where: {
            faculty_id: req.params.faculty_id,
            direction_id: req.params.direction_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};
