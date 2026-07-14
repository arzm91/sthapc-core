/*
 * =====================================================
 * System Routes
 * =====================================================
 *
 * Rotas de monitoramento do STHApc Core.
 *
 */

const express = require("express");
const router = express.Router();

const systemController = require("../controllers/system.controller");

router.get(
    "/status",
    (req, res) => systemController.status(req, res)
);

module.exports = router;

