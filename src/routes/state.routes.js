const express = require("express");

const router = express.Router();

const stateController = require("../controllers/state.controller");

/*
 * Lista todas as tags
 */
router.get(
    "/",
    stateController.getAllStates
);

/*
 * Consulta uma única tag
 */
router.get(
    "/:company/:plant/:area/:equipment/:tag",
    stateController.getState
);

module.exports = router;
