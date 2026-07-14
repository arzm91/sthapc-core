/*
 * =====================================================
 * Historian Worker
 * =====================================================
 *
 * Responsável por consumir continuamente a fila
 * do Historian.
 *
 * Nesta versão:
 *
 * - Consome a fila
 * - Atualiza métricas
 * - Gera logs
 *
 */

const historianService = require("../services/historian.service");
const metrics = require("../metrics/metrics.service");
const logger = require("../logger/logger");

class HistorianWorker {

    start() {

        logger.info("Historian Worker iniciado.");

        setInterval(async () => {

            try {

                const event =
                    await historianService.dequeue();

                if (!event) {

                    return;

                }

                metrics.increment(
                    "historianProcessed"
                );

                logger.info(
                    `Evento processado: ${event.company}/${event.plant}/${event.area}/${event.equipment}/${event.tag}`
                );

                console.log(
                    JSON.stringify(event, null, 2)
                );

            } catch (err) {

                metrics.increment(
                    "historianErrors"
                );

                logger.error(err.message);

            }

        }, 1000);

    }

}

module.exports = new HistorianWorker();
