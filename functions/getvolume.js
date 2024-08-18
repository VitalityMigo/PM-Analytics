// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { createCSV, dateToMJJ2 } = require("./utils")
const { getVolume1Chart, getVolume2Chart } = require("./chart")

const dir = "downloads/volume/"

async function getVolume() {

    try {

        console.log(colors.blue("Analyzing..."))

        const endpoint = "https://api.dune.com/api/v1/query/3833991/results?limit=50"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }
        const query = await axios.get(endpoint, { headers: head })

        let cumulative_vol = 0

        const dataset_rows = query.data.result.rows
            .sort((a, b) => new Date(b.month) - new Date(a.month))
            .map(i => {

                cumulative_vol += i.total_vol;

                return {
                    month: dateToMJJ2(i.month),
                    total_vol: Math.round(i.total_vol),
                    us_election_vol: Math.round(i.us_election_vol),
                    other_vol: Math.round(i.other_vol),
                    cumulative_vol: Math.round(cumulative_vol)
                }
            })

        const dataset = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'total_vol', title: 'Total' },
                { id: 'us_election_vol', title: 'US Election' },
                { id: 'other_vol', title: 'Others' },
                { id: 'cumulative_vol', title: 'Cumulative' }
            ],
            rows: dataset_rows,
        }

        const shares_rows = [];
        const shares_rows_raw = []
        for (let i = 0; i < dataset_rows.length; i++) {
            const { month, total_vol, us_election_vol, other_vol } = dataset_rows[i];
            const us_election_share = (us_election_vol / total_vol * 100).toFixed(2);
            const other_share = (other_vol / total_vol * 100).toFixed(2);
            const spread = us_election_share - other_share > 0 ? "+" + (us_election_share - other_share).toFixed(2) + ' pts' : (us_election_share - other_share).toFixed(2) + ' pts'
            shares_rows.push({ month, us_election_share: us_election_share + "%", other_share: other_share + "%", spread });
            shares_rows_raw.push({ month, us_election_share: us_election_share, other_share: other_share, spread:  us_election_share - other_share });
        }

        const shares = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'us_election_share', title: 'US Election' },
                { id: 'other_share', title: 'Others' },
                { id: 'spread', title: 'Spread' },
            ],
            rows: shares_rows,
        }


        createCSV(dataset, { dir: dir, path: dir + "dataset.csv" })
        createCSV(shares, { dir: dir, path: dir + "shares.csv" })
        getVolume1Chart(dataset_rows.reverse(), { dir: dir, path: dir + "graph.png" })
        getVolume2Chart(shares_rows_raw.reverse(), { dir: dir, path: dir + "shares.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

module.exports = getVolume


