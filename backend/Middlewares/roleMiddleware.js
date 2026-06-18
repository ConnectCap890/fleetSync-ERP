

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const userType = req.user?.userType;
        if (!userType || !roles.includes(userType)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        

        next();
    }
     
};

module.exports = roleMiddleware;