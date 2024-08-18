// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { createCSV, dateToMJJ } = require("./utils")
const { getRetentionChart } = require("./chart")

const dir = "downloads/retention/"

async function getRetention() {

    try {

        console.log(colors.blue("Analyzing..."))

        const endpoint = "https://api.dune.com/api/v1/query/2322587/results?limit=100"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }
        const query = await axios.get(endpoint, { headers: head })

        const dataset_rows = query.data.result.rows
            .sort((a, b) => new Date(b.first_month) - new Date(a.first_month))
            .map(i => ({
                month: dateToMJJ(i.first_month),
                new_users: i.month_0,
                m_1: i.month_1 != 0 ? parseFloat(i.month_1).toFixed(2) + "%" : 0,
                m_2: i.month_2 != 0 ? parseFloat(i.month_2).toFixed(2) + "%" : 0,
                m_3: i.month_3 != 0 ? parseFloat(i.month_3).toFixed(2) + "%" : 0,
                m_4: i.month_4 != 0 ? parseFloat(i.month_4).toFixed(2) + "%" : 0,
                m_5: i.month_5 != 0 ? parseFloat(i.month_5).toFixed(2) + "%" : 0,
                m_6: i.month_6 != 0 ? parseFloat(i.month_6).toFixed(2) + "%" : 0,
                m_7: i.month_7 != 0 ? parseFloat(i.month_7).toFixed(2) + "%" : 0,
                m_8: i.month_8 != 0 ? parseFloat(i.month_8).toFixed(2) + "%" : 0,
                m_9: i.month_9 != 0 ? parseFloat(i.month_9).toFixed(2) + "%" : 0,
                m_10: i.month_10 != 0 ? parseFloat(i.month_10).toFixed(2) + "%" : 0,
                m_11: i.month_11 != 0 ? parseFloat(i.month_11).toFixed(2) + "%" : 0,
                m_12: i.month_12 != 0 ? parseFloat(i.month_12).toFixed(2) + "%" : 0,
            }))

        const dataset = {
            header: [
                { id: 'month', title: 'Date' },
                { id: 'new_users', title: 'New Users' },
                { id: 'm_1', title: 'M1' },
                { id: 'm_2', title: 'M2' },
                { id: 'm_3', title: 'M3' },
                { id: 'm_4', title: 'M4' },
                { id: 'm_5', title: 'M5' },
                { id: 'm_6', title: 'M6' },
                { id: 'm_7', title: 'M7' },
                { id: 'm_8', title: 'M8' },
                { id: 'm_9', title: 'M9' },
                { id: 'm_10', title: 'M10' },
                { id: 'm_11', title: 'M11' },
                { id: 'm_12', title: 'M12' },
            ],
            rows: dataset_rows,
        }

        createCSV(dataset, { dir: dir, path: dir + "dataset.csv" })
        getRetentionChart(dataset_rows.reverse(), { dir: dir, path: dir + "graph.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

module.exports = getRetention
