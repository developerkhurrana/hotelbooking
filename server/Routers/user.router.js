import express from 'express';
import { register, login, getSingleUser, getUser, updateUser, deleteUser } from '../Controllers/user.controller';
import { verifyToken, verifyUser, verifyAdmin } from '../middleware/auth.middleware';

const urouter = express.Router();

// urouter.get('/checkauthentication', verifyToken, (req, res, next)=>{
//     res.send('Hello User, you are now logged in');
// })

// urouter.get('/checkuser/:id', verifyUser , (req, res, next)=>{
//     res.send('Hello User, you are now logged in, and you can delete your account');
// })

// urouter.get('/checkadmin/:id', verifyAdmin, (req, res,next) =>{
//     res.send('Hello Admin, You can now delete all the accounts')
// })

urouter.post('/register', register);
urouter.post('/login', login);
urouter.get('/get-all', getUser);
urouter.get('/get-single-user/:userID', getSingleUser);
urouter.put('/update-user/:userID', updateUser);
urouter.delete('/delete/:userID', deleteUser);

export default urouter