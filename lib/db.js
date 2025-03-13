const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development); // development 환경의 DB 설정 사용

module.exports = db;
