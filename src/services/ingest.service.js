class IngestService {

    async process(payload) {

        console.log("====================================");
        console.log("Nova TAG recebida");
        console.log(JSON.stringify(payload, null, 2));
        console.log("====================================");

    }

}

module.exports = new IngestService();
