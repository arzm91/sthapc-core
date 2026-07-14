const redis = require("../config/redis");

class RegistryService {

    async connect() {

        if (!redis.isOpen) {
            await redis.connect();
        }

    }

    /*
     * =====================================================
     * REGISTRO AUTOMÁTICO DA ESTRUTURA DA PLANTA
     * =====================================================
     */

    async register(payload) {

        await this.connect();

        await redis.sAdd(
            "registry:companies",
            payload.company
        );

        await redis.sAdd(
            `registry:company:${payload.company}:plants`,
            payload.plant
        );

        await redis.sAdd(
            `registry:company:${payload.company}:plant:${payload.plant}:areas`,
            payload.area
        );

        await redis.sAdd(
            `registry:company:${payload.company}:plant:${payload.plant}:area:${payload.area}:equipments`,
            payload.equipment
        );

        await redis.sAdd(
            `registry:equipment:${payload.company}:${payload.plant}:${payload.area}:${payload.equipment}:tags`,
            payload.tag
        );

        console.log("Registry atualizado.");

    }

    /*
     * =====================================================
     * CONSULTAS
     * =====================================================
     */

    async getCompanies() {

        await this.connect();

        return await redis.sMembers(
            "registry:companies"
        );

    }

    async getPlants(company) {

        await this.connect();

        return await redis.sMembers(
            `registry:company:${company}:plants`
        );

    }

    async getAreas(company, plant) {

        await this.connect();

        return await redis.sMembers(
            `registry:company:${company}:plant:${plant}:areas`
        );

    }

    async getEquipments(company, plant, area) {

        await this.connect();

        return await redis.sMembers(
            `registry:company:${company}:plant:${plant}:area:${area}:equipments`
        );

    }

    async getTags(company, plant, area, equipment) {

        await this.connect();

        return await redis.sMembers(
            `registry:equipment:${company}:${plant}:${area}:${equipment}:tags`
        );

    }

}

module.exports = new RegistryService();
