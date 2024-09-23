module.exports = (app) => {

    const student_group = require('../controller/student_group.controller');
    
    // Получение всех студенческих групп
    app.get('/api/student_groups', student_group.findAll);

    // Добавление студенческой группы
    app.post('/api/addStudentGroup', student_group.create);

    // Обновление студенческой группы по id
    app.post('/api/updateStudentGroup/:id', student_group.update);

    // Удаление студенческой группы по id
    app.post('/api/deleteStudentGroup/:id', student_group.delete);

    // Получение студенческой группы по id
    app.get('/api/StudentGroup/:id', student_group.findById);

    // Получение списка студенческих групп по id факультета
    app.get('/api/listStudentGroups/faculty_id=:faculty_id', student_group.findByFacultyId);

    // Получение списка студенческих групп по id направления
    app.get('/api/listStudentGroups/direction_id=:direction_id', student_group.findByDirectionId);

    // Получение списка студенческих групп по id факультета и направления
    app.get('/api/listStudentGroups/faculty_id=:faculty_id/direction_id=:direction_id', student_group.findByFacultyAndDirectionId);
};
