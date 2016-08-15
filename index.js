process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //BUGBUG security problem quick hack

var CatC = require('node-catc');

var api = new CatC('ydE7y5UQeREGUvygUJY7EJY5a', 'dave@quicks.me');

api.listServers(function(err, res) {
  if(!err) {
    for(var i in res.data) {
      console.log(res.data[i]);
    }
  }
});

api.listTemplates(function(err, res) {
  if(!err) {
    for(var i in res.data) {
      console.log(res.data[i]);
    }
  }
});

