import roomModel from "../Models/room.model";
import hotelModel from "../Models/hotel.model";
import { request } from "express";

export const addRoom = async (req, res, next) =>{
    try {
        const hotelID = req.params.hotelID;
        const newRoom = new roomModel(req.body);
        const saveRoom = await newRoom.save();
        const savedHotelRoom = await hotelModel.findByIdAndUpdate(hotelID,{
            $push:{rooms:saveRoom._id}
        })
        if(savedHotelRoom){
            res.status(200).json({
                data:saveRoom,
                message: 'Room Added Succesfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Add Room'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

export const getRoom = async (req, res) =>{
    try {
        const getData = await roomModel.find();
        if(getData){
            res.status(200).json({
                data:getData,
                message:'Room Data Fetched Successfully'
            })
        }else{
            res.status(400).json({
                message: 'Cannot Fetch Room Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const getSingleRoom = async (req, res) =>{
    try {
        const roomID = req.params.roomID;
        const getData = await roomModel.findOne({_id:roomID});
        if(getData){
            res.status(200).json({
                data:getData,
                message:'Room Data Fetched Successfully'
            })
        }else{
            res.status(400).json({
                message: 'Cannot Fetch Room Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const updateRoom = async (req, res) =>{
    try {
        const roomID = req.params.roomID;
        const updatedRoom = await roomModel.updateOne({_id:roomID},{$set: req.body},{new:true})
        if(updatedRoom.acknowledged){
            res.status(200).json({
                data: updatedRoom,
                message:'Room Updated Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Update Room'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const updateRoomAvailability = async (req, res) =>{
    try {
        const roomID = req.params.roomID;
        console.log(roomID)
        const datesToAdd = req.body.dates;
        const avail = await roomModel.findOneAndUpdate(
            {
                "roomNumbers._id": roomID
            },
            {
                $push:{
                    "roomNumbers.$.unavailableDates": datesToAdd
                },
            },
            { new: true }
            )
            avail.save()
            console.log(avail);
        if(avail){
            res.status(200).json({
                message:'Room status has been updated'
            })
        }else{
            res.status(400).json({
                message:"Cannot Update room status"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

// export const updateRoomAvailability = async (req, res) => {
//     try {
//         const roomID = req.params.roomID;
//         const datesToAdd = req.body.dates;

//         const room = await roomModel.findOne({ "roomNumbers._id": roomID });

//         if (!room) {
//             return res.status(404).json({
//                 message: 'Room not found'
//             });
//         }

//         // Assuming "roomNumbers" is an array of objects and you want to update a specific object
//         const roomNumberToUpdate = room.roomNumbers.find(number => number._id.toString() === roomID);

//         if (!roomNumberToUpdate) {
//             return res.status(404).json({
//                 message: 'Room number not found'
//             });
//         }

//         // Add the dates to the "unavailableDates" array in the specific room number
//         roomNumberToUpdate.unavailableDates.push(...datesToAdd);
//         console.log(unavailableDates);

//         // Save the updated room document
//         await room.save();

//         res.status(200).json({
//             message: 'Room status has been updated',
//             updatedRoom: room // You can send the updated room as a response if needed
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: `Server Error: ${error.message}`
//         });
//     }
// };


export const deleteRoom = async (req, res) => {
    try {
        const roomID = req.params.roomID;
        const delRoom = await roomModel.deleteOne({_id:roomID})
        try {
            const hotelID = req.params.hotelID;
            await hotelModel.updateOne({_id:hotelID}, {
                $pull:{ rooms: req.params.roomID}
            })
        } catch (error) {
            res.status(500).json({
                message:`Server Error: ${error.message}`
            })
        }
        if(delRoom.acknowledged){
            res.status(200).json({
                data:delRoom,
                message:'Room Deleted Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Delete Room'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}