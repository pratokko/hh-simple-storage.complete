//imports

const { ethers, run, network } = require("hardhat")

//async func

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying please wait...")

    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`deployed contract to ${simpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`the currentValue is ${currentValue}`)

    //update the currentvalue

    const transactionResponse = await simpleStorage.store(16)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`the updated value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("verifying contract ...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

//func call

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
