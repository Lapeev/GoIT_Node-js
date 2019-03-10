const url = require('url');
const fs = require('fs');
const path = require('path');

const getId = url => {
    const lastIndex = url.lastIndexOf('/');
    
    if (lastIndex !== -1) {
      
      return url.slice(lastIndex +1);
    }
  };

const getIds = url => {
  const arr = url.slice(url.lastIndexOf('=') +1).split(',');
  return arr.map(el => Number(el));
}

const getCategory = url => {
  return url.slice(url.lastIndexOf('=') +1).replace(/%22/g, '');
}

const productRouter = (req, res) => {
    const allProdPath = path.join(__dirname, "../../db/products/all-products.json");
    const parsedUrl = url.parse(req.url);
    let productId;
    let productIds = [];
    let productCategory;

    if (parsedUrl.path.includes('id')) {
      productIds = getIds(parsedUrl.path);
    }
    else if (parsedUrl.path.includes('category')) {
      productCategory = getCategory(parsedUrl.path);
    }
    else if (parsedUrl.path.lastIndexOf('/') !== -1) 
    {
      productId = getId(parsedUrl.path);
    }
    console.log(productCategory)
    if (productId && productId.length > 0) {
        res.writeHead(200, {"Content-Type": "application/json"});
        fs.readFile(allProdPath, function(err, data) {
            if(err) {
            console.log(err);
            }
            else {
                const response = JSON.parse(data.toString()).find(el => el.id == productId);
                if (response) {
                  const responseSuccess = { status: "success", prods: response };
                  res.write(JSON.stringify(responseSuccess));
                  res.end();
                  }
                  else {
                    const responseFailure = { status: "no products" };
                    res.write(JSON.stringify(responseFailure));
                    res.end();
                  }
            }
          });
    }

    else if (productIds.length > 0) {
      res.writeHead(200, {"Content-Type": "application/json"});
      fs.readFile(allProdPath, function(err, data) {
        if(err) {
          console.log(err);
          }
          else {
            const response = JSON.parse(data.toString()).filter(el => productIds.includes(el.id));
            if (response.length > 0 ) {
              const responseSuccess = { status: "success", prods: response };
              res.write(JSON.stringify(responseSuccess));
              res.end();
              }
              else {
                const responseFailure = { status: "no products" };
                res.write(JSON.stringify(responseFailure));
                res.end();
              }
        }
      });
    }
    else if (productCategory && productCategory.length > 0) {
      res.writeHead(200, {"Content-Type": "application/json"});
      fs.readFile(allProdPath, function(err, data) {
        if(err) {
          console.log(err);
          }
          else {
            const response = JSON.parse(data.toString()).filter(el => el.categories.includes(productCategory));
            if (response.length > 0 ) {
            const responseSuccess = { status: "success", prods: response };
            res.write(JSON.stringify(responseSuccess));
            res.end();
            }
            else {
              const responseFailure = { status: "no products" };
              res.write(JSON.stringify(responseFailure));
              res.end();
            }
        }
      });
    }
    else {
        res.writeHead(200, {"Content-Type": "application/json"});
        const readStream = fs.createReadStream(allProdPath);
        readStream.pipe(res)
    }    
}



module.exports = productRouter;