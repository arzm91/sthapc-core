const express = require("express");

const router = express.Router();

const stateController = require("../controllers/state.controller");

router.get(
    "/:company/:plant/:area/:equipment/:tag",
    stateController.getState
);

module.exports = router;
