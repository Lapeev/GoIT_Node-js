const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const saveUser = user => {
  const userName = user.username;
  const filePath = path.join(__dirname, "../../", "db/users", `${userName}.json`);

  fs.writeFile(filePath, JSON.stringify(user), function(error) {
    if (error) throw error; 
  });
};

const signUpRoute = (req, res) => {
  if (req.method === "POST") {
    let body = "";


    req.on("data", function(data) {
      body += data;

    });

    req.on("end", function() {
			const post = qs.parse(body);
      saveUser(post);
			
      const response = { status: "success", user: post };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  }
};

module.exports = signUpRoute;


