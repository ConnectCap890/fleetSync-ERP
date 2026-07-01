require('dotenv').config({path:'../.env'})
//console.log('URI:',process.env.MongoDB_URI)
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')
const generateID = require('./Utils/generateID')
const User = require('./Models/Users')

const seed = async () =>{
    await connectDB()

    const hashedPassword = await bcrypt.hash('admin123',10)

    const admin = new User({
        uniqueId : generateID(),
        email : 'admin1@fleetsync.com',
        password: hashedPassword,
        userType: 'Admin'

    })
    await admin.save()
    console.log('Admin Created')
    console.log('Unique ID ', admin.uniqueId,)
}

seed()