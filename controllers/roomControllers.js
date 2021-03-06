import Room from '../models/room.js'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures'

// create a room 
const newRoom = catchAsyncErrors(async (req, res) => {
        const room = await Room.create(req.body);
        res.status(200).json({
            success: true,
            room
        })
})

//get all rooms
const allRooms = catchAsyncErrors(async(req, res) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()
    
    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query;

        res.status(200).json({
            success: true,
            roomsCount,
            resPerPage,
            filteredRoomsCount,
            rooms
        })
})

//get a single room
const getSingleRoom = catchAsyncErrors(async(req, res, next) => {
        const room = await Room.findById(req.query.id)

        if(!room){
            return next(new ErrorHandler('Room not found with is id', 404))
        }

        res.status(200).json({
            success: true,
            room
        })
})

// update a room
const updataRoom = catchAsyncErrors(async (req, res) => {

        let room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        if(!room) {
            return next(new ErrorHandler('Room not found with is id', 404))
        }

        res.status(200).json({
            success: true,
            room
        })
})

// delete a room by id
const deleteRoom = catchAsyncErrors(async(req, res) => {
        const room = await Room.findById(req.query.id);
        if(!room) {
            return next(new ErrorHandler('Room not found with is id', 404))
        }

        await room.remove();

        res.status(200).json({
            success: true,
            message: 'Room is deleted'
        })
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updataRoom,
    deleteRoom
}