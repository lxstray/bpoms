const serverInfo = (req, res, next) => {
    const oldJson = res.json;
    res.json = function(data) {
        if (typeof data === 'object' && data !== null) {
            data.server = {
                id: process.env.SERVER_ID || 'Unknown',
                port: process.env.PORT || 3000
            };
        }
        return oldJson.call(this, data);
    };
    next();
};

module.exports = serverInfo; 