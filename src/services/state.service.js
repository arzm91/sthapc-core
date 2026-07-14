const redisService = require("./redis.service");

class StateService {

    async get(company, plant, area, equipment, tag) {

        return await redisService.getState(
            company,
            plant,
            area,
            equipment,
            tag
        );

    }

}

module.exports = new StateService();
