/*
 * =====================================================
 * System Service
 * =====================================================
 *
 * Responsável por fornecer informações sobre a saúde
 * do STHApc Core.
 *
 */

const packageInfo = require("../../package.json");

const metrics = require("../metrics/metrics.service");
const historianService = require("./historian.service");
const redis = require("../config/redis");

class SystemService {

    async status() {

        const data = metrics.get();

        const memory = process.memoryUsage();

        return {

            service: "STHApc Core",

            version: packageInfo.version,

            environment:
                process.env.NODE_ENV || "development",

            status: "running",

            startedAt:
                metrics.startedAt.toISOString(),

            uptimeSeconds:
                data.uptimeSeconds,

            node: {

                version: process.version,

                pid: process.pid

            },

            memory: {

                rssMB:
                    Math.round(memory.rss / 1024 / 1024),

                heapUsedMB:
                    Math.round(memory.heapUsed / 1024 / 1024),

                heapTotalMB:
                    Math.round(memory.heapTotal / 1024 / 1024)

            },

            mqtt: {

                messages:
                    data.mqttMessages

            },

            historian: {

                queued:
                    data.historianQueued,

                processed:
                    data.historianProcessed,

                errors:
                    data.historianErrors,

                queueSize:
                    await historianService.size()

            },

            redis: {

                connected:
                    redis.isOpen

            },

            workers: {

                historian:
                    "running"

            }

        };

    }

}

module.exports = new SystemService();
