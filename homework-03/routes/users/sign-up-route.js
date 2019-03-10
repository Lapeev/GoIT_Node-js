const fs = require("fs");
const path = require("path");
const qs = require("querystring");


const saveUser = user => {
  const userName = user.username;
  const filePath = path.join(__dirname, "../../", "db/users", `${userName}.json`);

  fs.writeFile(filePath, JSON.stringify(user), function (error) {
    if (error) throw error;
  });
};



const signUpRoute = (req, res) => {
  // console.log(req)
  // let body = "";


  const bodyNorm = {
    ...req.body
  };

  // body += bodyNorm;
  console.log('asd', bodyNorm)


  saveUser(bodyNorm);

  const response = {
    status: "success",
    user: bodyNorm
  };

  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(response));

};

module.exports = signUpRoute;