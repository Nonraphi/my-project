const RequestMiddleware  = function(req, res, next) {
    console.info(`[${new Date()}]: { URL: ${req.originalUrl}, Method: ${req.method} } `)
    next()
}

export default RequestMiddleware 