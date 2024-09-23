module.exports = (sequelize, Sequelize) => {
    var University = sequelize.define(
        'university', // определяем имя таблицы
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

    // Определяем связи таблицы university с другими таблицами
    University.associate = (models) => {
        // Определение связи один-ко-многим с таблицей faculty. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы faculty): в файле faculty.model.js
        University.hasMany(models.faculty, {
            foreignKey: 'university_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return University;
};