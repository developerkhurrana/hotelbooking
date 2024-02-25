import hotelModel from "../Models/hotel.model";
import roomModel from '../Models/room.model';

// ================ ADD HOTEL =====================

export const addHotel = async (req, res) =>{
    try {
        // const { name, type, city, address, distance, title, description, rating, rooms, cheapestPrice} = req.body;
        const newHotel = new hotelModel(req.body)
        // console.log(req.body);
        newHotel.save();
        if(newHotel){
            res.status(200).json({
                data:newHotel,
                message:'Hotel added successfully'
            })
        }else{
            res.status(400).json({
                message:"Cannot add Hotel"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error: ${error.message}`
        })
    }
}

// export const getHotel = async (req, res) =>{
//     try {
//         const { limit, featured, min, max } = req.query
//         console.log(req.query)
//         // const { min, max, ...others } = req.query
//         const hotelGet = await hotelModel.find({featured:true},{cheapestPrice:{$gt:min || 1, $lt:max || 999}}).limit(limit)
//         if(hotelGet){
//             res.status(200).json({
//                 data:hotelGet,
//                 message:'Hotel Data Found Successfully'
//             })
//         }else{
//             res.status(400).json({
//                 message:'Cannot Fetch Hotel Data'
//             })
//         }       
//     } catch (error) {
//         res.status(500).json({
//             message:`Server Error: ${error.message}`
//         })
//     }
// }

export const getHotel = async (req, res) => {
    try {
        // const { limit, featured, min, max } = req.query;

        // const priceFilter = {
        //     cheapestPrice: {
        //         $gt: min || 1,
        //         $lt: max || 999
        //     }
        // };

        // const query = featured ? { featured: true, ...priceFilter }
        //     : priceFilter;

        const {min, max, ...others } = req.query;

        const hotelGet = await hotelModel.find({...others, cheapestPrice: {
                    $gt: min || 1,
                    $lt: max || 999
                }}).limit(Number(req.query.limit));
        // console.log(hotelGet,"hotelGet")

        if (hotelGet) {
            res.status(200).json({
                data: hotelGet,
                message: 'Hotel Data Found Successfully'
            });
        } else {
            res.status(404).json({
                message: 'No Hotel Data Found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
};

export const countByCity = async (req, res, next) =>{
    try {
        const cities = req.query.cities.split(",")
        const list = await Promise.all(cities.map(city=>{
            return hotelModel.countDocuments({city:city})
        }))
        if(list){
            res.status(200).json({
                data:list,
                message:'Hotel Data Found Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Fetch Hotel Data'
            })
        }       
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const countByType = async (req, res, next) =>{
    try {
        const hotelCount = await hotelModel.countDocuments({type:"hotel"})
        const apartmentCount = await hotelModel.countDocuments({type:"apartment"})
        const resortCount = await hotelModel.countDocuments({type:"resort"})
        const villaCount = await hotelModel.countDocuments({type:"villa"})

        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"apartment", count:apartmentCount},
            {type:"resort", count:resortCount},
            {type:"villa", count:villaCount}
        ]);
               
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const getSingleHotel = async (req, res, next) =>{
    try {
        const hotelID = req.params.hotelID
        const hotelGet = await hotelModel.findOne({_id:hotelID});
        if(hotelGet){
            res.status(200).json({
                data:hotelGet,
                message:'Hotel Data Found Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Fetch Hotel Data'
            })
        }   
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const updateHotel = async (req, res) => {
    try {
        const hotelID = req.params.hotelID
        const hotelUpdate = await hotelModel.updateOne({_id: hotelID}, {
            $set: req.body
        })
        if(hotelUpdate.acknowledged){
            res.status(200).json({
                data:hotelUpdate,
                message: 'Hotel Data Updated Successfully'
            })
        }
        else{
            res.status(400).json({
                message:'Cannot Update Hotel Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const hotelID = req.params.hotelID
        const hotelDelete = await hotelModel.deleteOne({_id:hotelID});
        if(hotelDelete.acknowledged){
            res.status(200).json({
                data:hotelDelete,
                message: 'Hotel Data Deleted Successfully'
            })
        }else{
            res.status(400).json({
                message: 'Cannot Delete Hotel Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error: ${error.message}`
        })
    }
}

export const getHotelRooms = async (req, res) =>{
    try {
        const hotel = await hotelModel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
                return roomModel.findById(room)
            })
        )
        res.status(200).json({
            data:list
        })
    } catch (error) {
        res.status(500).json({
            message:`Server error: ${error.message}`
        })
    }
} 