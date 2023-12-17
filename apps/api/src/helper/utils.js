module.exports = {
    errorResponse: (rc, succes, message, result, error) =>{
        return{
            rc,
            succes,
            message,
            result,
            error
        }
    }
}