import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
    const token = req.headers.token;
    if(!token){
        return res.status(400).send({
            success:false,
            message:"not authorized login again"
        })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"auth api failed",
            error
        })
    }
}

export default authUser