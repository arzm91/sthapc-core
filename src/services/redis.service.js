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

}

module.exports = new RedisService();
