const authUsers = require('');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authenticatedusers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('authenticatedusers').insert(authUsers);
    });
};