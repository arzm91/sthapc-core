const stateService = require("../services/state.service");

exports.getState = async (req, res) => {

    try {

        const {
            company,
            plant,
            area,
            equipment,
            tag
        } = req.params;

        const state = await stateService.get(
            company,
            plant,
            area,
            equipment,
            tag
        );

        if (!state) {

            return res.status(404).json({
                success: false,
                message: "Tag não encontrada."
            });

        }

        return res.json(state);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
