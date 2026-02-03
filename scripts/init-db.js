const { initDatabase } = require('../src/db/connection.ts');

// Use ts-node or compile first
require('ts-node/register');
initDatabase();
console.log('Done!');
