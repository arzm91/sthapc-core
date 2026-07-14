const redisService = require("./redis.service");

class IngestService {

    async process(payload) {

        console.log("====================================");
        console.log("Nova TAG recebida");
        console.log(JSON.stringify(payload, null, 2));
        console.log("====================================");

        await redisService.saveState(payload);

    }

}

module.exports = new IngestService();
