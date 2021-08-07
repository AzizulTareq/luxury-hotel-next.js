import Room from '../models/room.js'

// create a room 
const newRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(200).json({
            success: true,
            room
        })
    } catch (error) {
        res.status (400).json({
            success: false,
            error: error.message
        })
    }
}

//get all rooms
const allRooms = async(req, res) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json({
            success: true,
            count : rooms.length,
            rooms
        })
    } catch (err){
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

export {
    allRooms,
    newRoom
}