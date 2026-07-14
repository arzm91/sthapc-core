/*
 * =====================================================
 * System Controller
 * =====================================================
 *
 * Controller responsável pelas informações do Core.
 *
 */

const systemService = require("../services/system.service");

class SystemController {

    async status(req, res) {

        try {

            const data = await systemService.status();

            return res.status(200).json(data);

        } catch (err) {

            return res.status(500).json({

                error: err.message

            });

        }

    }

}

module.exports = new SystemController();
