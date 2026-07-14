const express = require("express");

const router = express.Router();

const registryController = require("../controllers/registry.controller");

/*
 * =====================================================
 * EMPRESAS
 * =====================================================
 */

router.get(
    "/companies",
    registryController.getCompanies
);

/*
 * =====================================================
 * PLANTAS
 * =====================================================
 */

router.get(
    "/companies/:company/plants",
    registryController.getPlants
);

/*
 * =====================================================
 * ÁREAS
 * =====================================================
 */

router.get(
    "/companies/:company/plants/:plant/areas",
    registryController.getAreas
);

/*
 * =====================================================
 * EQUIPAMENTOS
 * =====================================================
 */

router.get(
    "/companies/:company/plants/:plant/areas/:area/equipments",
    registryController.getEquipments
);

/*
 * =====================================================
 * TAGS
 * =====================================================
 */

router.get(
    "/companies/:company/plants/:plant/areas/:area/equipments/:equipment/tags",
    registryController.getTags
);

module.exports = router;
