const ingestService = require("../services/ingest.service");

exports.ingest = async (req, res) => {

    try {

        await ingestService.process(req.body);

        res.status(200).json({
            success: true,
            message: "Tag recebida com sucesso."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
