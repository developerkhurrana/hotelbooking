import userModel from "../Models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = async (req, res) =>{
    try {
        if(req.body.password == req.body.confirm_password){
            const userPassword = bcrypt.hashSync(req.body.password, 10);
            const newUser = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: userPassword,
            })
    
            await newUser.save()
            if(newUser){
                res.status(200).json({
                    data:newUser,
                    message:'User Registered Successfully'
                })
            }else{
                res.status(400).json({
                    message:'Registeration Failed'
                })
            }
        }else{
            res.status(401).json({
                mesasge:`Password does not match`
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const login = async (req, res) =>{
    try {
        const userData = await userModel.findOne({username:req.body.username})
        if(userData){
            const match = await bcrypt.compare(req.body.password, userData.password);
            const {password, isAdmin, ...otherDetails} = userData._doc;
            if(match){
                // const token = jwt.sign({_id:existUser._id,email:existUser.email},'stories123',{expiresIn:'90d'})
    
                const token = jwt.sign({ id:userData._id, isAdmin: userData.isAdmin}, "myself123");
                // console.log(token);
                res.
                cookie("access_token", token,{
                    httpOnly:true,
                })
                .status(200).json({
                    data:{ details:{...otherDetails}, isAdmin},
                    message:'Login Successfull'
                })
            }else{
                res.status(400).json({
                    message:'Invalid Password'
                })
            }
            
        }else{
            res.status(401).json({
                message:`${req.body.username} is not a registered user`
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
} 

export const getUser = async (req, res) =>{
    try {
        const userInfo = await userModel.find();
        if(userInfo){
            res.status(200).json({
                data:userInfo,
                message:'user Data Found Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Fetch user Data'
            })
        }       
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const getSingleUser = async (req, res, next) =>{
    try {
        const userID = req.params.userID
        const userInfo = await userModel.findOne({_id:userID});
        if(userInfo){
            res.status(200).json({
                data:userInfo,
                message:'user Data Found Successfully'
            })
        }else{
            res.status(400).json({
                message:'Cannot Fetch user Data'
            })
        }   
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userID = req.params.userID
        const userUpdate = await userModel.updateOne({_id: userID}, {
            $set: req.body
        })
        if(userUpdate.acknowledged){
            res.status(200).json({
                data:userUpdate,
                message: 'user Data Updated Successfully'
            })
        }
        else{
            res.status(400).json({
                message:'Cannot Update user Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}

export const deleteUser= async (req, res) => {
    try {
        const userID = req.params.userID
        const userDelete = await userModel.deleteOne({_id:userID});
        if(userDelete.acknowledged){
            res.status(200).json({
                data:userDelete,
                message: 'user Data Deleted Successfully'
            })
        }else{
            res.status(400).json({
                message: 'Cannot Delete user Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server error: ${error.message}`
        })
    }
}


