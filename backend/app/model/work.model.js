module.exports = (sequelize, Sequelize) => {
    var Work = sequelize.define(
        'work', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            year: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            link: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            mime_type: {
                type: Sequelize.STRING(25),
                allowNull: false
            }
        });

    // Определяем связи таблицы work с другими таблицами
    Work.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        Work.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        Work.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
    };
    return Work;
};