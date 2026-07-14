/*
 * =====================================================
 * STHApc Core
 * =====================================================
 * API principal.
 *
 */

const express = require("express");
const cors = require("cors");

const ingestRoutes = require("./routes/ingest.routes");
const stateRoutes = require("./routes/state.routes");
const registryRoutes = require("./routes/registry.routes");
const systemRoutes = require("./routes/system.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {

    res.json({
        status: "OK",
        service: "STHApc Core",
        timestamp: new Date().toISOString()
    });

});

/*
 * =====================================================
 * APIs
 * =====================================================
 */

app.use("/api/v1/ingest", ingestRoutes);

app.use("/api/v1/state", stateRoutes);

app.use("/api/v1/registry", registryRoutes);

app.use("/api/v1/system", systemRoutes);

/*
 * Compatibilidade temporária
 */

app.use("/api/v1/tags", ingestRoutes);

module.exports = app;
