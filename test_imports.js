import { DB_NAME } from './src/constants.js';
console.log('constants.js loaded');
import connectDB from './src/db/index.js';
console.log('db loaded');
import { app } from './src/app.js';
console.log('app loaded');
console.log('SUCCESS: All modules loaded');
