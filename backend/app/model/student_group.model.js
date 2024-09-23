module.exports = (sequelize, Sequelize) => {
    var StudentGroup = sequelize.define(
        'student_group', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            direction_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            faculty_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы student_group с другими таблицами
    StudentGroup.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы direction): в файле direction.model.js
        StudentGroup.belongsTo(models.direction, {
            foreignKey: 'direction_id'
        });

        // Определение связи один-ко-многим с таблицей faculty. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы faculty): в файле faculty.model.js
        StudentGroup.belongsTo(models.faculty, {
            foreignKey: 'faculty_id'
        });

        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        StudentGroup.hasMany(models.user, {
            foreignKey: 'student_group_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return StudentGroup;
};