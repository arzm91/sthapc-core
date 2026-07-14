const registryService = require("./registry.service");
const redisService = require("./redis.service");
const historianService = require("./historian.service");

class IngestService {

    async process(payload) {

        console.log("====================================");
        console.log("Nova TAG recebida");
        console.log(JSON.stringify(payload, null, 2));
        console.log("====================================");

        /*
         * Atualiza automaticamente a estrutura da planta
         */
        await registryService.register(payload);

        /*
         * Atualiza o estado atual da TAG
         */
        await redisService.saveState(payload);

        /*
         * Adiciona a leitura na fila do Historian
         */
        await historianService.enqueue(payload);

    }

}

module.exports = new IngestService();
