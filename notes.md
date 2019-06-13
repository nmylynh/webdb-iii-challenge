~Querying Data, Migrations, and Seeding~

A [foreign key] is a column in a table that references the primary key on another table.

You can join tables together by foreign keys. Look at the example below:

App Reference: [https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top]

SELECT orders.orderid, orders.orderdate, customers.customerName, customers.country
FROM [orders]
JOIN [customers]
ON orders.customerid = customers.customerid

Would give:

OrderID	| OrderDate  |	CustomerName	       | Country
---------------------------------------------------------
10248	|1996-07-04	 |Wilman Kala	           |Finland
10249	|1996-07-05	 |Tradição Hipermercados   |Brazil
10250	|1996-07-08	 |Hanari Carnes	           |Brazil
...     ...          ...                       ...

You can also join multiple tables and concatenate columns of data, such as first and last name.

SELECT orders.*, shippers.shippername, shippers.phone,
 (employees.firstname || ' ' || employees.lastname) AS Employee
FROM [orders]
JOIN [shippers] ON orders.shipperid = shippers.shipperid
JOIN [employees] ON orders.employeeid = employees.employeeid

This would return:

OrderID	CustomerID	EmployeeID	OrderDate	ShipperID	   ShipperName	         Phone	        Employee
---------------------------------------------------------------------------------------------------------------
10248	    90          5	    1996-07-04	    3	    Federal Shipping	(503) 555-9931	Steven Buchanan
10249	    81          6	    1996-07-05	    1	    Speedy Express  	(503) 555-9831	Michael Suyama
10250	    34	        4	    1996-07-08	    2	    United Package  	(503) 555-3199	Margaret Peacock
10251	    84	        3	    1996-07-08	    1	    Speedy Express  	(503) 555-9831	Janet Leverling
...        ...         ...      ...            ...      ...                 ...             ...

Inspirational Quote of the Year:
"Migrations are nice, ok?" -Luis Hernandez 2019

Every change to the structure of your database needs a migration. 
"It's git for your database structure." 
Now you always have your database AND your code in sync with ONE command.

[Steps for migration]:

1.) Run:

    npx knex init

Instead of having your configuration in your app, instead you now have a dedicated file to hold all your knex configuration.

2.) Run:

    npx knex migrate:make create_roles_table

After you created the migration, you can use npx knex to see a list of commands.

3.) Go into your newly created migration file.

//new changes to the database schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', function(table) {
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
    return knex.schema.dropTableIfExists('roles');
};

4.) Run:

    npx knex migrate:latest

To migrate to latest. And:

    npx knex migrate:rollback

To migrate to the previous.

5.) To have dummy data (seeds):

    npx knex seed:make 001-roles

So a seeds folder will show up and will have a table of example data, like so:

exports.seed = function(knex, Promise) {
    return knex('roles')
        .truncate() //reset the PK back to 1 in addition to deleting the data
        .then(function () {
            //insert seed entries
            return knex('roles').insert([
                {name: 'Student'},
                {name: 'TA'},
                {name: 'PM'}
            ]);
        });
};

6.) Run your seed:

    npx knex seed:run

7.) For foreign keys:

    npx knex migrate:make users_table

Then, go to the users table migration:


exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {

        table.increments();

        table
            .string('name', 128)
            .notNullable()
            .unique();

        //syntax for foreign key

        table
            .integer('role_id')
            .unsigned()
            .references('id')
            .inTable('roles')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};

8.) Then update the knexfile configuration to include migrations and seeds.


module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/new.db3',
        },
         useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
         },
         seeds: {
            directory: './data/seeds'
        }
    },
}





