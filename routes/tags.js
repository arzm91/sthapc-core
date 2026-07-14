const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {

    console.log("==================================");
    console.log("Nova TAG recebida");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("==================================");

    res.status(200).json({
        success: true,
        message: "Tag recebida com sucesso."
    });

});

module.exports = router;
