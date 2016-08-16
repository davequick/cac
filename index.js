//var api = new CatC('ydE7y5UQeREGUvygUJY7EJY5a', 'dave@quicks.me');

var Client = require('node-rest-client').Client;
// require('ssl-root-cas/latest')
//     .inject()
//     .addFile(__dirname + '/cac_cert');

// direct way
var client = new Client({connection: {
  rejectUnauthorized: false //BUGBUG: skipping auth - left as an exercise to the reader if you want to add certs here
}});

var args = {
  path: { action: "listservers" },
  parameters: { key: "ydE7y5UQeREGUvygUJY7EJY5a", login: "dave@quicks.me" },
  headers: {
    "Content-Type": "application/json"
  }
};

client.get("https://panel.cloudatcost.com/api/v1/${action}.php", args,
    function (data, response) {
      // parsed response body as js object
      console.log(data);
      // raw response
      console.log(response);
    });