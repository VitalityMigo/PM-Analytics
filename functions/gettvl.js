// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { createCSV, dateToMJJ2 } = require("./utils")
const { getTVLChart } = require("./chart")

const dir = "downloads/tvl/"

async function getTVL() {

    try {

        console.log(colors.blue("Analyzing..."))

        // Query settings.
        const endpoint = "https://api.dune.com/api/v1/query/3981600/results?limit=150"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }
        const query = await axios.get(endpoint, { headers: head })


        let previous_tvl = 0

        const dataset_rows = query.data.result.rows
            .sort((a, b) => new Date(b.Month) - new Date(a.Month))
            .reverse()
            .map(i => {

                const growth = previous_tvl === 0 ? "0" : parseFloat(((i.TVL - previous_tvl) / previous_tvl) * 100).toFixed(1) + "%"
                previous_tvl = i.TVL

                return {
                    month: dateToMJJ2(i.Month),
                    tvl: Math.round(i.TVL),
                    delta: Math.round(i.TVLDelta),
                    growth: growth
                }
            })
            .reverse()

        // Data setup.
        const dataset = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'tvl', title: 'TVL' },
                { id: 'delta', title: 'Delta' },
                { id: 'growth', title: 'Growth (MoM)' },

            ],
            rows: dataset_rows,
        }

        createCSV(dataset, { dir: dir, path: dir + "dataset.csv" })
        getTVLChart(dataset_rows.reverse(), { dir: dir, path: dir + "graph.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

module.exports = getTVL
