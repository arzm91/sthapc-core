/*
 * =====================================================
 * Metrics Service
 * =====================================================
 *
 * Responsável pelas métricas internas do STHApc Core.
 *
 * Nesta primeira versão, as métricas permanecem
 * apenas em memória.
 *
 */

class MetricsService {

    constructor() {

        this.startedAt = new Date();

        this.metrics = {

            mqttMessages: 0,

            historianQueued: 0,

            historianProcessed: 0,

            historianErrors: 0

        };

    }

    increment(name) {

        if (this.metrics[name] !== undefined) {

            this.metrics[name]++;

        }

    }

    get() {

        return {

            uptimeSeconds:
                Math.floor(
                    (Date.now() - this.startedAt.getTime()) / 1000
                ),

            ...this.metrics

        };

    }

}

module.exports = new MetricsService();

