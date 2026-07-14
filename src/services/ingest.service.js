const registryService = require("./registry.service");
const redisService = require("./redis.service");

class IngestService {

    async process(payload) {

        console.log("====================================");
        console.log("Nova TAG recebida");
        console.log(JSON.stringify(payload, null, 2));
        console.log("====================================");

        // Atualiza automaticamente a estrutura da planta
        await registryService.register(payload);

        // Atualiza o estado atual da tag
        await redisService.saveState(payload);

    }

}

module.exports = new IngestService();
