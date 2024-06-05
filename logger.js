const logger = (req, res, next) => {
    const now = new Date();
    console.log(`[${now.toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Call the next middleware function in the stack
};

module.exports = logger;
