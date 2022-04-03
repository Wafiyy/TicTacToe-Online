const jsonErrorHandler = async (err, req, res,next) => {
    res.status(400).json(
        {
            ok:false,
            message: err.message
        });
}
module.exports = jsonErrorHandler