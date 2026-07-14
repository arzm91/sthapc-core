const redis = require("../config/redis");

class RedisService {

    async connect() {

        if (!redis.isOpen) {
            await redis.connect();
            console.log("Redis conectado.");
        }

    }

    async saveState(payload) {

        await this.connect();

        const key =
            `state:${payload.company}:${payload.plant}:${payload.area}:${payload.equipment}:${payload.tag}`;

        const value = {
            value: payload.value,
            quality: payload.quality,
            timestamp: payload.timestamp,
            source: payload.source
        };

        await redis.set(key, JSON.stringify(value));

        console.log("Redis SET:", key);

    }

    async getState(company, plant, area, equipment, tag) {

        await this.connect();

        const key =
            `state:${company}:${plant}:${area}:${equipment}:${tag}`;

        const value = await redis.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value);

    }

    async getAllStates() {

        await this.connect();

        const result = [];

        let cursor = "0";

        do {

            const reply = await redis.scan(cursor, {
                MATCH: "state:*",
                COUNT: 100
            });

            cursor = reply.cursor;

            for (const key of reply.keys) {

                const value = await redis.get(key);

                if (!value) {
                    continue;
                }

                const parts = key.split(":");

                result.push({
                    company: parts[1],
                    plant: parts[2],
                    area: parts[3],
                    equipment: parts[4],
                    tag: parts[5],
                    ...JSON.parse(value)
                });

            }

        } while (cursor !== "0");

        return result;

    }

}

module.exports = new RedisService();
