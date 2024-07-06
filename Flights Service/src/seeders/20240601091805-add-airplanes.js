'use strict';
const {Op}=require('sequelize');


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

    await queryInterface.bulkInsert('Airplanes', [
      {
         modelNumber: 'Indigo576',
         capacity: 670,
         createdAt: new Date(),
         updatedAt: new Date()
      },
      {
         modelNumber: 'Airbus620',
         capacity: 290,
         createdAt: new Date(),
         updatedAt: new Date()
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Airplanes',{[Op.or]:[{modelNumber:'Boeing B120'},{modelNumber:'Boeing B720'}]})
  }
};
