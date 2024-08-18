// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { createCSV, dateToMJJ } = require("./utils")
const { getUserChart } = require("./chart")

const dir = "downloads/users/"

async function getUsers() {

    try {

        console.log(colors.blue("Analyzing..."))

        const endpoint = "https://api.dune.com/api/v1/query/3966513/results?limit=150"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }
        const query = await axios.get(endpoint, { headers: head })

        const dataset_rows = query.data.result.rows
            .sort((a, b) => new Date(b.Month) - new Date(a.Month))
            .map(i => ({
                month: dateToMJJ(i.Month),
                users: i.Users,
                cumulative: i['Cumulative Users'],
            }))

        // const dataset_rows = [
        //     {
        //         month: 'Jan-2024',
        //         users: 7234,
        //         cumulative: 7234,
        //     },
        //     {
        //         month: 'Feb-2024',
        //         users: 4890,
        //         cumulative: 12124,
        //     },
        //     {
        //         month: 'Mar-2024',
        //         users: 8536,
        //         cumulative: 20660,
        //     },
        //     {
        //         month: 'Apr-2024',
        //         users: 6111,
        //         cumulative: 26771,
        //     },
        //     {
        //         month: 'May-2024',
        //         users: 7445,
        //         cumulative: 34216,
        //     },
        //     {
        //         month: 'Jun-2024',
        //         users: 5367,
        //         cumulative: 39583,
        //     },
        //     {
        //         month: 'Jul-2024',
        //         users: 8923,
        //         cumulative: 48506,
        //     },
        //     {
        //         month: 'Aug-2024',
        //         users: 4782,
        //         cumulative: 53288,
        //     }
        // ];

        const dataset = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'users', title: 'Users' },
                { id: 'cumulative', title: 'Cumulative Unique' },
            ],
            rows: dataset_rows,
        }

        createCSV(dataset, { dir: dir, path: dir + "dataset.csv" })
        getUserChart(dataset_rows.reverse(), { dir: dir, path: dir + "graph.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

module.exports = getUsers