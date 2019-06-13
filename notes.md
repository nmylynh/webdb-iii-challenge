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

Steps for migration:

npx knex init

Instead of having your configuration in your app, instead you have a dedicated file to hold all your knex configuration.
