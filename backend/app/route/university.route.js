module.exports = (app) => {

    const university = require('../controller/university.controller');
    
    // Получение всех университетов
    app.get('/api/universities', university.findAll);

    // Добавление университета
    app.post('/api/addUniversity', university.create);

    // Обновление университета по id
    app.post('/api/updateUniversity/:id', university.update);

    // Удаление университета по id
    app.post('/api/deleteUniversity/:id', university.delete);

    // Получение информации об университете по id
    app.get('/api/university/:id', university.findById);

};
