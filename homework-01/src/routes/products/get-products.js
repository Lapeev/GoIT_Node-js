const fs = require('fs');
const path = require('path');


const productRouter = (req, res) => {
    const allProdPath = path.join(__dirname, "../../db/products/all-products.json");
    res.writeHead(200, {"Content-Type": "application/json"});
    const readStream = fs.createReadStream(allProdPath);

    readStream.pipe(res)
}

module.exports = productRouter