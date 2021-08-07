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

//get a single room
const getSingleRoom = async(req, res) => {
    try {
        const room = await Room.findById(req.query.id)

        if(!room){
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            })
 
        }

        res.status(200).json({
            success: true,
            room
        })
    } catch (err){
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

// update a room
const updataRoom = async (req, res) => {
    try {
        let room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        if(!room) {
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            })
        }

        res.status(200).json({
            success: true,
            room
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete a room by id
const deleteRoom = async(req, res) => {
    try {
        const room = await Room.findById(req.query.id);
        if(!room) {
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            })
        }

        await room.remove();

        res.status(200).json({
            success: true,
            message: 'Room is deleted'
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updataRoom,
    deleteRoom
}