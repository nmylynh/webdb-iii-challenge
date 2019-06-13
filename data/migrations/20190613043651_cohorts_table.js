exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(table) {
        //primary key is called id, auto-increments, and is an integer
        table.increments();

        //var char called name, 128, unique, not null
        table
            .string('name', 128)
            .notNullable()
            .unique();
    });
};

//how to undo the changes to the schema
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};