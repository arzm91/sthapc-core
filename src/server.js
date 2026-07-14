const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log("   STHApc Core iniciado");
    console.log("====================================");
    console.log(` Porta: ${PORT}`);
    console.log("");

});
