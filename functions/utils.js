const fs = require('fs');
const colors = require('colors')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


async function addTimeout(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function createCSV(table, struct) {

    if (!fs.existsSync(struct.dir)) {
        fs.mkdirSync(struct.dir, { recursive: true });
    }

    // La fonction qui génère le CSV
    const csvWriter = createCsvWriter({
        path: struct.path, // Chemin du fichier CSV qui sera généré
        header: table.header
    });

    csvWriter.writeRecords(table.rows) // écrit les données dans le fichier
    .then(() => {
        console.log(colors.green(`Done! The file "${struct.path.split('/').pop()}" is now avialble in ${struct.dir}`));
    })
    .catch((err) => {
        console.error(colors.red('An error occured while generating your file:', err));
    });
}

function createChart(table, struct) {

    if (!fs.existsSync(struct.dir)) {
        fs.mkdirSync(struct.dir, { recursive: true });
    }

    // Creating a canvas
    const canvas = new ChartJSNodeCanvas({ width: table.width, height: table.height });

    // Render the chart and save it to a file
    (async () => {
        const imageBuffer = await canvas.renderToBuffer(table.config);
        fs.writeFileSync(struct.path, imageBuffer);
    })()
    .then(() => {
        console.log(colors.green(`Done! The graph "${struct.path.split('/').pop()}" is now avialble in ${struct.dir}`));
    })
    .catch((err) => {
        console.error(colors.red('An error occured while generating your graph:', err));
    });

}

function dateToMJJ(string) {
    const date = new Date(string);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month_nb = date.getMonth()
    const loop_add = month_nb === 11
    const month = monthNames[loop_add ? 0 : month_nb + 1];
    const year = (loop_add ? date.getFullYear() + 1 : date.getFullYear()).toString().slice(-2);
    return `${month}-${year}`;
}

function dateToMJJ2(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', year: '2-digit' };
    return date.toLocaleString('en-US', options).replace(' ', '-');;
}


module.exports = { addTimeout, createCSV, dateToMJJ, dateToMJJ2, createChart };