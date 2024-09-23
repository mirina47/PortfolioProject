module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define(
        'category', // определяем имя таблицы
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

    // Определяем связи таблицы category с другими таблицами
    Category.associate = (models) => {
        // Определение связи один-ко-многим с таблицей work. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы work): в файле work.model.js
        Category.hasMany(models.work, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Category;
};