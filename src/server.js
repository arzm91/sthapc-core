/*
 * =====================================================
 * STHApc Core
 * =====================================================
 * Arquivo principal da aplicação.
 *
 * Responsabilidades:
 *
 * - Inicializar a API HTTP
 * - Inicializar o Scheduler
 *
 */

const app = require("./app");
const scheduler = require("./scheduler/scheduler");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log("     STHApc Core iniciado");
    console.log("====================================");
    console.log(` Porta: ${PORT}`);
    console.log("");

    /*
     * Inicializa todos os Workers
     */

    scheduler.start();

});
