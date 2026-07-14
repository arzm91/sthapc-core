const registryService = require("../services/registry.service");

/*
 * =====================================================
 * EMPRESAS
 * =====================================================
 */

exports.getCompanies = async (req, res) => {

    try {

        const companies = await registryService.getCompanies();

        return res.json(companies);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

/*
 * =====================================================
 * PLANTAS
 * =====================================================
 */

exports.getPlants = async (req, res) => {

    try {

        const { company } = req.params;

        const plants = await registryService.getPlants(company);

        return res.json(plants);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

/*
 * =====================================================
 * ÁREAS
 * =====================================================
 */

exports.getAreas = async (req, res) => {

    try {

        const { company, plant } = req.params;

        const areas = await registryService.getAreas(
            company,
            plant
        );

        return res.json(areas);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

/*
 * =====================================================
 * EQUIPAMENTOS
 * =====================================================
 */

exports.getEquipments = async (req, res) => {

    try {

        const {
            company,
            plant,
            area
        } = req.params;

        const equipments =
            await registryService.getEquipments(
                company,
                plant,
                area
            );

        return res.json(equipments);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

/*
 * =====================================================
 * TAGS
 * =====================================================
 */

exports.getTags = async (req, res) => {

    try {

        const {
            company,
            plant,
            area,
            equipment
        } = req.params;

        const tags =
            await registryService.getTags(
                company,
                plant,
                area,
                equipment
            );

        return res.json(tags);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
