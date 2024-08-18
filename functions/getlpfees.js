// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { createCSV, dateToMJJ2 } = require("./utils")
const { getLpFeesChart } = require("./chart")

const dir = "downloads/lpfees/"

async function getLpFees() {

    try {

        console.log(colors.blue("Analyzing..."))

        const endpoint = "https://api.dune.com/api/v1/query/3950923/results?limit=200"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }
        const query = await axios.get(endpoint, { headers: head })

        let total = 0;
        let previous_fees = 0

        const dataset_rows = query.data.result.rows
            .sort((a, b) => new Date(b.month.split(' ')[0]) - new Date(a.month.split(' ')[0]))
            .reverse()
            .map(i => {

                const fees = i.total_liq_pnl;
                total += fees;
                const growth = previous_fees === 0 ? "0" : parseFloat(((fees - previous_fees) / previous_fees) * 100).toFixed(1) + "%"
                previous_fees = fees

                return {
                    month: dateToMJJ2(i.month.split(' ')[0]),
                    fees: Math.round(fees),
                    cumulative: Math.round(total),
                    growth: growth
                }
            }).reverse()

        const dataset = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'fees', title: 'LP Fees' },
                { id: 'cumulative', title: 'Cumulative Fees' },
                { id: 'growth', title: 'Growth (MoM)' },
            ],
            rows: dataset_rows,
        }

        createCSV(dataset, { dir: dir, path: dir + "dataset.csv" })
        getLpFeesChart(dataset_rows.reverse(), { dir: dir, path: dir + "graph.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

module.exports = getLpFees
