const {model} = require("mongoose");

const {HoldingsSchema} = require('../schemas/HoldingsSchema');

const HoldingsModel =  model("holding",HoldingsSchema);   // New Collection with name holdings will be created in DataBase .

module.exports = {HoldingsModel};

