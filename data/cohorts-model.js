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
    return db('cohorts');
}

function findById(id) {
    return db('cohorts')
    .where({ id })
    .first()
}

async function add(cohort) {
const [id] = await db('cohorts').insert(cohort);

return findById(id);
}

function update(id, changes) {
    return db('cohorts')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('cohorts')
    .where({ id })
    .del();
}




