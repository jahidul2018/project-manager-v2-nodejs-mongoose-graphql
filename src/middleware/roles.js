const roleCheck = (requiredRole) => {
    return (resolver) => {
        return async (parent, args, context, info) => {
            if (!context.req.user || context.req.user.role !== requiredRole) {
                throw new Error('Access denied: Insufficient permissions');
            }
            return resolver(parent, args, context, info);
        };
    };
};

module.exports = roleCheck;
