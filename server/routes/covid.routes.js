const CovidController = require("../controllers/covid.controller")
const {authenticate} = require('../config/jwt.config')
module.exports = (app) =>{
    app.get("/api/covid", CovidController.findAllEntries)
    app.post("/api/covid", authenticate, CovidController.createEntry)
    
    app.get("/api/covid/:id", CovidController.findOneEntry)
    app.put("/api/covid/:id", CovidController.updateEntry)
    app.delete("/api/covid/:id", CovidController.deleteEntry)
    app.get("/api/covidByUser/:username", authenticate, CovidController.findAllEntriesByUser);
}