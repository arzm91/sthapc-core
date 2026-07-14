const express = require("express");
const cors = require("cors");
const stateRoutes = require("./routes/state.routes");

const ingestRoutes = require("./routes/ingest.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {

    res.json({
        status: "OK",
        service: "STHApc Core",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });

});

app.use("/api/v1/ingest", ingestRoutes);
app.use("/api/v1/state", stateRoutes);

/*
Compatibilidade temporária.
Quando migrarmos totalmente o Node-RED,
esta rota poderá ser removida.
*/
app.use("/api/v1/tags", ingestRoutes);

module.exports = app;
