module.exports = (app) => {

    const faculty = require('../controller/faculty.controller');
    
    // Получение всех факультетов
    app.get('/api/faculties', faculty.findAll);

    // Добавление факультета
    app.post('/api/addFaculty', faculty.create);

    // Обновление факультета по id
    app.post('/api/updateFaculty/:id', faculty.update);

    // Удаление факультета по id
    app.post('/api/deleteFaculty/:id', faculty.delete);

    // Получение информации об факультете по id
    app.get('/api/Faculty/:id', faculty.findById);

    // Получение списка факультетов по id университета
    app.get('/api/listFaculties/:university_id', faculty.findByUniversityId);

};
