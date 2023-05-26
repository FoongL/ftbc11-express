'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('users', [{
      email: 'foong3@foong.com',
      password: 'password123',
      updated_at: new Date(),
      created_at: new Date()
     },{
      email: 'Sean3@sean.com',
      password: 'password123',
      name:'Reuben',
      updated_at: new Date(),
      created_at: new Date()
     }
    ],{})

    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
