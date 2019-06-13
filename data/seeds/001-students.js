exports.seed = function(knex, Promise) {
    return knex('students')
        .truncate() //reset the PK back to 1 in addition to deleting the data
        .then(function () {
            //insert seed entries
            return knex('students').insert([
                {name: 'Thranduil', cohort_id: 1},
                {name: 'Prince Nuada', cohort_id: 2},
                {name: 'Hannibal', cohort_id: 3}
          ]);
      });
  };