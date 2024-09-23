module.exports = (sequelize, Sequelize) => {
    var Direction = sequelize.define(
        'direction', // определяем имя таблицы
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
            }
        });

    // Определяем связи таблицы direction с другими таблицами
    Direction.associate = (models) => {
        // Определение связи один-ко-многим с таблицей student_group. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы student_group): в файле student_group.model.js
        Direction.hasMany(models.student_group, {
            foreignKey: 'direction_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Direction;
};