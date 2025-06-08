//Archivo que contendrá la configuración de la base de datos. Deberá conectarse a la base de datos de MongoDB en Atlas.

const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada con éxito')
    } catch (error) {
        console.error(error)
        throw new Error('Error a la hora de iniciar la base de datos')
    }
};

module.exports = { dbConnection }