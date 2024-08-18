const colors = require("colors")

// Importing the various functions.
const getFirstBet = require("./functions/getfirstbet")
const getVolume = require("./functions/getvolume")
const getRetention = require("./functions/getretention")
const getTVL = require("./functions/gettvl")
const getUsers = require("./functions/getusers")
const getLpFees = require("./functions/getlpfees")

// Imorting config.
const config = require("./config.json")

// Retreiving command args.
const command = process.argv[2] ? process.argv[2].toLowerCase() : null

if (config.DUNE_ANALYTICS_KEY) {
    // Directing to the right command.
    if (command === "gettvl") {
        getTVL()
    } else if (command === "getvolume") {
        getVolume()
    } else if (command === "getusers") {
        getUsers()
    } else if (command === "getfirstbet") {
        getFirstBet()
    } else if (command === "getlpfees") {
        getLpFees()
    } else if (command === "getretention") {
        getRetention()
    } else {
        console.log(colors.red("Unknown command, please type 'node app [command name]' to launch the process."))
    }
} else {
    console.log(colors.red("No API Key. To start using the terminal, head over to /config.json and input your Dune Analytics API Key."))
}


