
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(table) {

        table.increments();

        table
            .string('name', 128)
            .notNullable()
            .unique();

        //syntax for foreign key

        table
            .integer('cohort_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};