export const errorMiddleware = (err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    if(err.code === 11000 ){
        return res.status(400).json({
            success:false,
            message:"Email or Phone Number are Already Registered"
        })
    }
    res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
}