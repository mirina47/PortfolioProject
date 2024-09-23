module.exports = (sequelize, Sequelize) => {
    var Faculty = sequelize.define(
        'faculty', // определяем имя таблицы
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
            university_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы faculty с другими таблицами
    Faculty.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей university. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы university): в файле university.model.js
        Faculty.belongsTo(models.university, {
            foreignKey: 'university_id'
        });

        // Определение связи один-ко-многим с таблицей student_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_group): в файле student_group.model.js
        Faculty.hasMany(models.student_group, {
            foreignKey: 'faculty_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Faculty;
};