const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('students');
}

function findById(id) {
    return db('students')
    .where({ id })
    .first()
}

async function add(student) {
const [id] = await db('students').insert(student);

return findById(id);
}

function update(id, changes) {
    return db('students')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('students')
    .where({ id })
    .del();
}




