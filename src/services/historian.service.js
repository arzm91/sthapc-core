/*
 * =====================================================
 * Historian Service
 * =====================================================
 *
 * Responsável pelo gerenciamento da fila histórica.
 *
 * Nenhum outro módulo deve acessar o Redis diretamente.
 * Toda operação sobre a fila deve passar por este serviço.
 *
 */

const redis = require("../config/redis");
const metrics = require("../metrics/metrics.service");
const logger = require("../logger/logger");

const QUEUE_NAME = "queue:historian";

class HistorianService {

    async connect() {

        if (!redis.isOpen) {

            await redis.connect();

        }

    }

    /*
     * =====================================================
     * Adiciona um evento na fila
     * =====================================================
     */

    async enqueue(payload) {

        await this.connect();

        const event = {

            ...payload,

            ingestedAt: new Date().toISOString()

        };

        await redis.rPush(
            QUEUE_NAME,
            JSON.stringify(event)
        );

        metrics.increment("historianQueued");

        logger.info("Historian Queue +1");

    }

    /*
     * =====================================================
     * Remove e retorna o próximo evento
     * =====================================================
     */

    async dequeue() {

        await this.connect();

        const value = await redis.lPop(QUEUE_NAME);

        if (!value) {

            return null;

        }

        return JSON.parse(value);

    }

    /*
     * =====================================================
     * Consulta o próximo evento sem removê-lo
     * =====================================================
     */

    async peek() {

        await this.connect();

        const value = await redis.lIndex(
            QUEUE_NAME,
            0
        );

        if (!value) {

            return null;

        }

        return JSON.parse(value);

    }

    /*
     * =====================================================
     * Quantidade de eventos na fila
     * =====================================================
     */

    async size() {

        await this.connect();

        return await redis.lLen(
            QUEUE_NAME
        );

    }

    /*
     * =====================================================
     * Limpa toda a fila
     * =====================================================
     */

    async clear() {

        await this.connect();

        await redis.del(
            QUEUE_NAME
        );

    }

}

module.exports = new HistorianService();
