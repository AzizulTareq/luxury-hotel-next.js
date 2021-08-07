const mongoose = require('mongoose')
const rooms = require('../data/rooms.json')
const Room = require('../models/room')

mongoose.connect('mongodb+srv://Tareq:tareq878@cluster0.up943.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const seedRooms = async () => {
    try {
        await Room.deleteMany();
        console.log('Rooms are deleted')

        await Room.insertMany(rooms);
        console.log('All rooms are added')
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms()