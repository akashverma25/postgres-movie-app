//const {Sequelize}=require('Sequelize');
const express = require('express');
const apiRoutes=require('./server/apiRoutes');

const app = express();
app.use(express.json());

app.use('/api',apiRoutes());

const port = 4000;

// const connectToDb=async()=>{
// const sequelize = new Sequelize('postgres', 'postgres', 'Akash', {
//   host: 'localhost',
//   dialect:'postgres'
// });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// connectToDb();

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})