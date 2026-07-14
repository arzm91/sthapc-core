const express = require("express");
const cors = require("cors");

const tagsRouter = require("../routes/tags");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {

    res.json({
        status: "OK",
        service: "STHApc Core",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });

});

// API v1
app.use("/api/v1/tags", tagsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`STHApc Core iniciado na porta ${PORT}`);
});
