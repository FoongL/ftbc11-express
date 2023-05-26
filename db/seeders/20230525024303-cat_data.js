"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "dairy",
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          name: "beverage",
          updated_at: new Date(),
          created_at: new Date(),
        },
        { name: "snack", updated_at: new Date(), created_at: new Date() },
        { name: "breakfast", updated_at: new Date(), created_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
