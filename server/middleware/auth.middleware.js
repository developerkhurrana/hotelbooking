import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({
            message:'You are not authenticated'
        })
    }
    jwt.verify(token, 'myself123', (err, user) =>{
        if(err){
            res.status(403).json({
                message: "Token in invalid"
            })
        }
            req.user = user
            next()
    });
};
 
export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
                res.status(403).json({
                message:'You are not authorized'
        });
        }
    })
}

export const verifyAdmin =(req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json({
                message: 'You are not authorized'
            })
        }
    })
}