const Hubs = require('./hubs-model.js');

async function checkHubID(req, res, next) {
    try {
        const hub = await Hubs.findById(req.params.id);
        if(hub) {
            req.hub = hub;
            next();
        } else {
            next({status: 404, message: `Hub ${req.params.id} not found`})
        }
    } catch (err) {
        next(err);
    }
}

function checkNewHub(req, res, next) {
    const { name } = req.body;
    if (name !== undefined && 
        typeof name === 'string' && 
        name.length &&
        name.trim().length
    )
    {
        next();
    } else {
        next({ status: 422, message:'hubs need a name'});
    }
}

module.exports = {
    checkHubID,
    checkNewHub,
};