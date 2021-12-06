# Notes
* Mongo
  * We use Mongoose as an ORM
  * Open mongo shell used to be `$ mongo` but now is `$ mongosh` (mongo will be deprecated)

## Open local MongoDB
`$ mongosh`

### See all Databases
`> show databases`

### Select a particular Database
`> use bank` (assuming the Database is named `bank`)

### Show all collections
`> show collections`

### Remove a collection
`> db.todos.remove({})` (DEPRECATED)

* Replace with `> db.todos.deleteMany({})`
* You will still see empty collection but there is no data inside it
* Also remove users with `> db.users.deleteMany({})




