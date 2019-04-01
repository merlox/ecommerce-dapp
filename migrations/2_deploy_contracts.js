const Token = artifacts.require("./EcommerceToken.sol")
const Ecommerce = artifacts.require("./Ecommerce.sol")

module.exports = function(deployer) {
    deployer.deploy(
        Token,
        { gas: 8e6 }
    ).then(tokenInstance => {
        return deployer.deploy(Ecommerce, tokenInstance.address, {
            gas: 8e6
        })
    }).then(() => {
        console.log('Deployed both!')
    })
}
