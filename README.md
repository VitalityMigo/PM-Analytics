# Polymarket Analytics

Polymarket Analytics was built as part of a research on decentralized prediction markets which is available [here](https://drive.google.com/uc?export=download&id=1WpKT4IaQIiaGHFNgdQKG5w1KNtKYSj7G). Its purpose is to provide quick and graphed metrics on key aspects of Polymarket usage.

## Functioning

Polymarket Analytics uses Dune Analytics' database to retrieve, format and graph large sets of data. For each command, it returns one or more tables of data (CSV), and one or more graphs (PNG). Here are the 6 commands available.

## Installation

After downloading the folder, you will need to install Node.js environment. You can use this [link](https://nodejs.org/en/download/package-manager/current) or the [Homebrew](https://brew.sh/) command below: 

```bash
brew install node
```
Then, in the project folder, install the packages:
```bash
npm install
```

The last step is to fill your Dune Analytics API key in [`/config.json`](https://github.com/VitalityMigo/PM-Analytics/blob/main/config.json). If you don't have an API key, you can create one [here](https://dune.com/auth/register). For greater security, use an .env file and the [`dotenv`](https://www.npmjs.com/package/dotenv) package to store your key.

## Commands

Polymarket Analytics consists of 6 easy-to-use commands. To run a command, simply use `node app [command name]`. For instance, to run `getUsers`, enter `node app getUsers` in the command line. Here is an overview of the commands: 

- `getVolume`: analyses and graphs the historical development of betting volume, its breakdown between U.S. elections related volume and other volume, and the  cumulative volume.
- `getUsers`: analyses and graphs changes in the number of active users per month and the total number of users.
- `getTVL`: analyses and graphs the historical development of TVL and its delta on a monthly basis.
- `getLpFees`: analyses and graphs the evolution of the fees paid by Polymarket to incentivise LPs, as well as the cumulative fees paid.
- `getRetention`: analyses and graphs the number of new monthly users and their retention over 1 to 12 months.
- `getFirstBet`: analyses and graphs the market categories to which new users go for their first bets. The categories are US Election, Adjacents, and Others.

## Note

An Excel file, which is also associated with the research on prediction markets, is available [here](https://drive.usercontent.google.com/download?id=1c1H6m5Jz3_anoviaPW1I5gYDvWG25kR6&export=download). The data was retrieved using the commands of this project. If you have any questions or feedback about this project or the research it's linked to, you can DM me on X: [@VitalityMigo](https://x.com/VitalityMigo).

## License

[MIT](https://choosealicense.com/licenses/mit/)

