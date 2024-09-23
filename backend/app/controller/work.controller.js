var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var sequelize = db.sequelize;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');

var Work = db.work;

// Получение всех работ
exports.findAll = (req, res) => {
    Work.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = async (req, res) => {
    // создаём объект для чтения данных, переданных со стороны клиента (передавали объект FormData)
    var form = new multiparty.Form();

    // читаем данные
    await form.parse(req, async (err, fields, files) => {
        if (!err) {

            //console.log(fields);
            //console.log(files);

            var mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png
            expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

            var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
            var link = './app/files/' + newName;

            fs.rename(files.file[0].path, link, (err) => {
                if (err) {
                    throw err;
                }
            });

            var name = fields.name[0];
            var description = fields.description[0];
            var year = fields.year[0];
            var user_id = fields.user_id[0];
            var category_id = fields.category_id[0];

            Work.create({
                name: name,
                link: newName,
                mime_type: mimeType,
                user_id: user_id,
                category_id: category_id,
                description: description,
                year: year
            }).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        }
        else{
            globalFunctions.sendError(res, err);
        }
    });
};

// Обновление данных работы по id
exports.update = (req, res) => {
    Work.update({
            name: req.body.name,
            user_id: req.body.user_id,
            category_id: req.body.category_id,
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            link: req.body.link
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

/*exports.delete = (req, res) => {
    Work.findByPk(req.params.id)
    .then(async (object) => {
        // удаляем файл
        await fs.unlinkSync(object.dataValues.link);
        await Work.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            globalFunctions.sendResult(res, 'Запись удалена');
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};*/

// Удаление пользователя по id
exports.delete = (req, res) => {
    Work.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.findAll = (req, res) => {
    Work.findAll()
        .then(async objects => {
            var result = [];
            await (objects).forEach(async (object) => {
                object = object.dataValues;
                // читаем содержимое файла для отправки на сторону клиентского приложения
                var contents = fs.readFileSync(object.link, {encoding: 'base64'});
                var data = {
                    id: object.id,
                    name: object.name,
                    file: contents,
                    mime_type: object.mime_type,
                    user_id: object.user_id,
                    category_id: object.category_id,
                    description: object.description,
                    year: object.year
                };
                result.push(data);
            });
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных работы по id
exports.findById = (req, res) => {
    Work.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка работ по id пользователя
exports.findByUserId = (req, res) => {
    Work.findAll({
        where: {
            user_id: req.params.user_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение списка работ по id пользователя и категории
exports.findByUserAndCategoryId = (req, res) => {
    Work.findAll({
        where: {
            user_id: req.params.user_id,
            category_id: req.params.category_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};