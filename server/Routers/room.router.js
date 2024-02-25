import express from 'express';
import { addRoom, getRoom , getSingleRoom, updateRoom, deleteRoom, updateRoomAvailability} from '../Controllers/room.controller';
import { verifyAdmin } from '../middleware/auth.middleware';

const rrouter = express.Router();

rrouter.post('/add-room/:hotelID', addRoom);
rrouter.get('/get-all', getRoom);
rrouter.get('/get-single-room/:roomID', getSingleRoom);
rrouter.put('/update-room/:roomID', verifyAdmin ,updateRoom);
rrouter.put('/availability/:roomID', updateRoomAvailability)
rrouter.delete('/delete-room/:roomID/:hotelID', verifyAdmin ,deleteRoom);

export default rrouter

