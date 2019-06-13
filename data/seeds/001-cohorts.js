exports.seed = function(knex, Promise) {
  return knex('cohorts')
      .truncate() //reset the PK back to 1 in addition to deleting the data
      .then(function () {
          //insert seed entries
          return knex('cohorts').insert([
              {name: 'WEB19'},
              {name: 'UX2'},
              {name: 'WEB18'}
          ]);
      });
};