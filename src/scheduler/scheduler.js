/*
 * =====================================================
 * Scheduler
 * =====================================================
 *
 * Responsável por iniciar todos os Workers
 * do STHApc Core.
 *
 * Cada Worker possui uma única responsabilidade.
 *
 */

const historianWorker = require("../workers/historian.worker");

class Scheduler {

    start() {

        console.log("");
        console.log("======================================");
        console.log("Inicializando Scheduler...");
        console.log("======================================");
        console.log("");

        /*
         * Historian
         */

        historianWorker.start();

        console.log("");
        console.log("Scheduler iniciado.");
        console.log("");

    }

}

module.exports = new Scheduler();
