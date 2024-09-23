module.exports = (app) => {

    const work = require('../controller/work.controller');
    
    // Получение всех работ
    app.get('/api/works', work.findAll);

    // Добавление работы
    app.post('/api/addWork', work.create);

    // Обновление работы
    app.post('/api/updateWork/:id', work.update);

    // Удаление работы по id
    app.post('/api/deleteWork/:id', work.delete);

    // Получение работы по id
    app.get('/api/work/:id', work.findById);

    // Получение списка работ по id пользователя
    app.get('/api/listWorks/user_id=:user_id', work.findByUserId);

    // Получение списка работ по id пользователя и категории
    app.get('/api/listWorks/user_id=:user_id/category_id=:category_id', work.findByUserAndCategoryId);
};
