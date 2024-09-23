module.exports = (app) => {

    const category = require('../controller/category.controller');
    
    // Получение всех категорий
    app.get('/api/categories', category.findAll);

    // Добавление категории
    app.post('/api/addCategory', category.create);

    // Обновление категории по id
    app.post('/api/updateCategory/:id', category.update);

    // Удаление категории по id
    app.post('/api/deleteCategory/:id', category.delete);

    // Получение категории по id
    app.get('/api/category/:id', category.findById);

};
