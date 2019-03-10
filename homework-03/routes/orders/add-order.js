const fs = require("fs");
const path = require("path");
const qs = require("querystring");
var uniqid = require('uniqid');

let userBuffer;

const saveOrder = user => {
    if (user.user && user.user !== '') {
        user.orderId = uniqid();
        const userName = user.user;
        let allOrdersPath = path.join(__dirname, "../../", "db/orders", `${userName}.json`);
        if (fs.existsSync(allOrdersPath)) {
            fs.readFile(allOrdersPath, function (err, data) {
                if (err)
                    console.log(err)
                else {
                    user.orderNumber = Math.max(...JSON.parse(data).map(el => el.orderNumber)) + 1;
                    const newData = JSON.parse(data);
                    newData.push(user)
                    userBuffer = user;
                    fs.writeFile(allOrdersPath, JSON.stringify(newData), function (err) {
                        if (err) throw err;
                    })
                }
            })
        } else {
            user.orderNumber = 1;
            const arrOrders = [];
            arrOrders.push(user);
            userBuffer = JSON.stringify(arrOrders);
            fs.writeFile(allOrdersPath, JSON.stringify(arrOrders), function (error) {
                if (error) throw error;
            });
        }

    };
}




function unique(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j])
                arr.splice(j--, 1);
        }
    }
    return arr;
}

function arrExistingProductsInOrder(arr, arrAllProd) {
    const newArr = [];
    arrAllProd.forEach(el => {
        arr.includes(el) ? newArr.push(el) : newArr;
    });
    return newArr;
}

const signUpRoute = (req, res) => {
    const bodyNorm = {
        ...req.body
    };


    const allProdPath = path.join(__dirname, "../../db/products/all-products.json");
    const promise = new Promise(function (resolve, reject) {
        saveOrder(bodyNorm);
    })
    promise.then(
        fs.readFile(allProdPath, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                const arrAllProd = unique(JSON.parse(data).reduce((acc, el) => acc.concat(el.categories), []));
                const arrAllProdOrder = bodyNorm.products.split(',');
                const ArrFaceOrder = arrExistingProductsInOrder(arrAllProdOrder, arrAllProd);
                if (ArrFaceOrder.length > 0) {
                    const resJSONSuccess = {
                        "status": "success",
                        order: {
                            "OrderId": userBuffer.orderId,
                            "orderNumber": userBuffer.orderNumber,
                            "available products": [...ArrFaceOrder],
                            "deliveryType": userBuffer.deliveryType,
                            "deliveryAdress": userBuffer.deliveryAdress
                        }
                    }
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(resJSONSuccess));
                } else {
                    const resJSONFail = {
                        'status': 'failed',
                        'order': null
                    };
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(resJSONFail));
                }
            }

        })
    ).catch()


};


module.exports = signUpRoute;