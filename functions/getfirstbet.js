// Retreiving config.js
const config = require("../config.json")

// Packages used for requests.
const axios = require('axios');
const colors = require('colors')

const { addTimeout, createCSV } = require("./utils")
const { getFirstBetChart } = require("./chart")

const dir = "downloads/firstBet/"

async function getFirstBet() {

    try {

        console.log(colors.blue("Analyzing..."))


        let endpoint = "https://api.dune.com/api/v1/query/3926465/results?limit=10000"
        const head = { 'X-DUNE-API-KEY': config.DUNE_ANALYTICS_KEY }

        const data = {
            header: [
                { id: 'evt_block_time', title: 'Time' },
                { id: 'user', title: 'User' },
                { id: 'trade_type', title: 'Market Type' }
            ],
            row_count: null,
            rows: [],
        }

        while (true) {

            const query = await axios.get(endpoint, { headers: head })
            const rows = query.data.result.rows
            const metadata = query.data.result.metadata
            const isDone = query.data.next_uri ? false : true

            if (isDone) {
                data.rows = data.rows.concat(rows)
                data.row_count = metadata.total_row_count
                break
            } else {
                data.rows = data.rows.concat(rows)
                endpoint = query.data.next_uri
            }

            await addTimeout(0.25)
        }

        data.rows = data.rows.map(item => ({
            evt_block_time: new Date(item.evt_block_time).toISOString().split('T')[0],
            user: item.user,
            trade_type: item.trade_type,
        })).sort((a, b) => b.evt_block_time.localeCompare(a.evt_block_time));

        const summary_rows = createSummary(data.rows)

        const summary = {
            header: [
                { id: 'rank', title: '#' },
                { id: 'category', title: 'Category' },
                { id: 'count', title: 'Amount' },
                { id: 'share', title: 'Share' },
                { id: 'leading_market', title: 'Leading Market' }
            ],
            rows: summary_rows

        }

        createCSV(data, { dir: dir, path: dir + "dataset.csv" })
        createCSV(summary, { dir: dir, path: dir + "summary.csv" })
        getFirstBetChart(summary_rows, { dir: dir, path: dir + "summary.png" })

        return

    } catch (error) {
        console.log(colors.red("An error occured while generating your file:", error))
    }
}

function createSummary(tab) {

    function classifyTradeType(string) {

        const key_words_election = ["winner"]
        const key_phrase_others = "non election bet"
        return key_phrase_others === string.toLowerCase() ? "Others" :
            key_words_election.some(kw => string.toLowerCase().includes(kw)) ? "Election" : "Adjacents";
    }

    const grouped = tab.reduce((acc, item) => {
        const category = classifyTradeType(item.trade_type);

        if (!acc[category]) {
            acc[category] = {
                count: 0,
                leading_market: null,
                leading_count: 0,
                trade_types_count: {}
            };
        }

        acc[category].count += 1;

        acc[category].trade_types_count[item.trade_type] = (acc[category].trade_types_count[item.trade_type] || 0) + 1;
        if (acc[category].trade_types_count[item.trade_type] > acc[category].leading_count) {
            acc[category].leading_market = item.trade_type;
            acc[category].leading_count = acc[category].trade_types_count[item.trade_type];
        }

        return acc;
    }, {});

    let totalCount = 0;
    const categories = Object.keys(grouped).map(category => {
        totalCount += grouped[category].count;
        return { category, count: grouped[category].count };
    }).sort((a, b) => b.count - a.count);

    const result = categories.map((item, index) => {
        const data = grouped[item.category];
        const share = (data.count / totalCount * 100).toFixed(2);
        return {
            rank: index + 1,
            category: item.category,
            count: data.count,
            share: parseFloat(share) + "%",
            leading_market: data.leading_market,
        };
    });

    return result
}

module.exports = getFirstBet
