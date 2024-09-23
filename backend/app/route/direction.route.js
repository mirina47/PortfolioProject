module.exports = (app) => {

    const direction = require('../controller/direction.controller');
    
    // Получение всех направлений
    app.get('/api/directions', direction.findAll);

    // Добавление направления
    app.post('/api/addDirection', direction.create);

    // Обновление направления по id
    app.post('/api/updateDirection/:id', direction.update);

    // Удаление направления по id
    app.post('/api/deleteDirection/:id', direction.delete);

    // Получение информации о направлении по id
    app.get('/api/direction/:id', direction.findById);

};
