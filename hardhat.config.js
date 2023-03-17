require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

const GEORLY_RPC_URL = process.env.GEORLY_RPC_URL || "http://eth-georly"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COIN_MARKET_CAP = process.env.COIN_MARKET_CAP || "key"

module.exports = {
    defaultNetwork: "hardhat",

    networks: {
        georly: {
            url: GEORLY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },

        localhost: {
            url: "http://127.0.0.1:8545/",
            // hardhat has already placed accounts for us
            chainId: 31337,
        },
    },

    solidity: "0.8.8",

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_CAP,
        token: "MATIC",
    },
}
