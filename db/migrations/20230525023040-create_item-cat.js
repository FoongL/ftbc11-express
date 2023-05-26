'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('items_categories', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      item_id:{
        allowNull: false,
        type:Sequelize.INTEGER,
        references:{
          model:'items',
          key:'id'
        }
      },
      category_id:{
        allowNull: false,
        type:Sequelize.INTEGER,
        references:{
          model:'categories',
          key:'id'
        }
      },
      date_added:{
        type: Sequelize.DATE
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      }
    
    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('items_categories');
  }
};
