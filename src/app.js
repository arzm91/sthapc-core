const express = require("express");
const cors = require("cors");

const ingestRoutes = require("./routes/ingest.routes");
const stateRoutes = require("./routes/state.routes");
const registryRoutes = require("./routes/registry.routes");

const app = express();

app.use(cors());
app.use(express.json());

/*
 * =====================================================
 * HEALTH CHECK
 * =====================================================
 */

app.get("/health", (req, res) => {

    res.json({
        status: "OK",
        service: "STHApc Core",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });

});

/*
 * =====================================================
 * API V1
 * =====================================================
 */

app.use("/api/v1/ingest", ingestRoutes);

app.use("/api/v1/state", stateRoutes);

app.use("/api/v1/registry", registryRoutes);

/*
 * =====================================================
 * COMPATIBILIDADE
 * =====================================================
 * Esta rota existe apenas para manter
 * compatibilidade com o Node-RED atual.
 * Futuramente será removida.
 */

app.use("/api/v1/tags", ingestRoutes);

module.exports = app;
