module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            login: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            student_group_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    User.associate = (models) => {
        // Определение связи один-ко-многим с таблицей student_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_group): в файле student_group.model.js
        User.belongsTo(models.student_group, {
            foreignKey: 'student_group_id'
        });

        // Определение связи один-ко-многим с таблицей work. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы work): в файле work.model.js
        User.hasMany(models.work, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return User;
};