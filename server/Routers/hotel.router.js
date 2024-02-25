import express from 'express'
import { addHotel, getHotel, getSingleHotel, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms} from '../Controllers/hotel.controller';
import { verifyAdmin } from '../middleware/auth.middleware';

const hrouter = express.Router();

hrouter.post('/add-hotel', addHotel);
hrouter.get('/get-all', getHotel);
hrouter.get('/get-hotel/room/:id', getHotelRooms)
hrouter.get('/get-hotel/countByCity', countByCity);
hrouter.get('/get-hotel/countByType', countByType);
hrouter.get('/get-single-hotel/:hotelID', getSingleHotel);
hrouter.put('/update-hotel/:hotelID', updateHotel);
hrouter.delete('/delete/:hotelID', verifyAdmin, deleteHotel);

export default hrouter  