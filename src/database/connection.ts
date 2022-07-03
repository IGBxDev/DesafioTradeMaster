import knex from 'knex';
import knexFile from '../config/knexfile';
export default knex(knexFile['development']);
console.log("Database running", knexFile['development'])