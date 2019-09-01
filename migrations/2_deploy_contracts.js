const Token = artifacts.require("./EcommerceToken.sol")
const Ecommerce = artifacts.require("./Ecommerce.sol")
let token

let productsJson = [
    {
        title: "HAND-DYED WOVEN SLIP-ONS",
        description: "Men’s slip-ons designed for summer ceremonies, fresh and light. They are made from mini weave nappa leather in summer shades of blush pink, light blue and silver. The edging and tassel detail are in fine navy blue kangaroo leather. Leather sole. Made in Italy.",
        price: "440",
        image: 'https://imgur.com/zDtXweP.jpg',
    },
    {
        title: "OXFORD LACE-UPS IN LEATHER WITH STUDS",
        description: "Special Oxford lace-ups in fine black calfskin. The toe and back are animated by mini-studs detailing in dark metal. Leather sole. Made in Italy.",
        price: "375",
        image: 'https://imgur.com/akcp2t9.jpg',
    },
    {
        title: "LEATHER LACE-UPS WITH CORK SOLE",
        description: "Elegant Oxfords in kidskin with intense shades of navy blue. The tassel detail is in a matching colour. The sole in leather and rubber has a natural cork insert that makes these men’s casual summer shoes light. Made in Italy.",
        price: "400",
        image: 'https://imgur.com/spxzXNi.jpg',
    }
]

module.exports = function(deployer, network, accounts) {
    deployer.deploy(
        Token,
        { gas: 8e6 }
    ).then(tokenInstance => {
        token = tokenInstance
        return deployer.deploy(Ecommerce, token.address, {
            gas: 8e6,
            gasPrice: 20e9,
        })
    }).then(async ecommerce => {
        await token.contract.methods.setEcommerce(ecommerce.address).send({
            from: accounts[0],
            gas: 8e6,
            gasPrice: 20e9,
        })
        // for(let i = 0; i < productsJson.length; i++) {
        //     await token.contract.methods.publishProduct(productsJson[i].title, productsJson[i].description, productsJson[i].price, productsJson[i].image).send({
        //         from: accounts[0],
        //         gas: 8e6,
        //         gasPrice: 20e9,
        //     })
        // }
        console.log('Is set?', await token.contract.methods.isEcommerceSet().call())
        console.log('Deployed both!')
    })
}
