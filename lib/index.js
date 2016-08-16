"use strict";

module.exports = setup;

setup._imports = {
    log: console.log,
    defaultsDeep: require("lodash").defaultsDeep,
    RestClient: require('node-rest-client').Client
};

function setup(options, injected, register) {
    var imports = setup._imports;
    imports.defaultsDeep(imports, injected);
    let log = imports.log;
    let RestClient = imports.RestClient;

    class CloudAtCostClient {
        constructor(apikey, email, overrides) {
            var self = this;
            self.options = {
                    url: "https://panel.cloudatcost.com/api/v1/${resource}.php",
                args: {
                    parameters: {key: apikey, login: email},
                    headers: {"Content-Type": "application/json"}
                },
                connection: {
                    rejectUnauthorized: false //BUGBUG: skipping auth - left as an exercise to the reader if you want to add certs here
                }
            };
            imports.defaultsDeep(self.options, overrides);
            self.client = new RestClient(self.options.connection || {});
        }

        execQuery(args, overrides) {
            var self = this;
            return new Promise( (resolve, reject) => {
                let args = {}
                imports.defaultsDeep(args, self.options, overrides);

                resolve('foo');
            });
        }

        listServers(overrides){
            var args = {
                path: { resource: "listservers" }
            };
            return this.execQuery(args, overrides);
        }

        listTemplates(overrides) {
            var args = {
                path: { resource: "listtemplates" }
            };
            return this.execQuery(args, overrides);
        }
        listTasks(overrides) {
            var args = {
                path: { resource: "listtasks" }
            };
            return this.execQuery(args, overrides);
        }
        setPowerOn(serverid, overrides) {
            var args = {
                path: { resource: "powerop" },
                parameters: { action: "poweron" }
            };
            return this.execQuery(args, overrides);
        }
        serverPowerOff(serverid, overrides) {
            var args = {
                path: { resource: "powerop" },
                parameters: { action: "poweroff" }
            };
            return this.execQuery(args, overrides);
        }
        serverPowerReset(serverid, overrides) {
            var args = {
                path: { resource: "powerop" },
                parameters: { action: "reset" }
            };
            return this.execQuery(args, overrides);
        }

        setRunmodeNormal(serverid, overrides) {
            var args = {
                path: { resource: "runmode" },
                parameters: { action: "normal" }
            };
            return this.execQuery(args, overrides);
        }
        setRunmodeSafe(serverid, overrides) {
            var args = {
                path: { resource: "runmode" },
                parameters: { action: "safe" }
            };
            return this.execQuery(args, overrides);
        }
        renameServer(serverid, name, overrides) {
            var args = {
                path: { resource: "renameserver" },
            };
        }
        reverseDnsSet(serverid, hostname, overrides){
            var args = {
                path: { resource: "rdns" },
            };
        }
        consoleUrl(serverid, overrides) {
            var args = {
                path: { resource: "console" },
            };
            return this.execQuery(args, overrides);
        }
    }

    return CloudAtCostClient;
}

if(require.main === module) {
    var Cac = setup();
    var cac = new Cac("ydE7y5UQeREGUvygUJY7EJY5a", "dave@quicks.me");
    cac
        .listServers()
        .then((res) => {
            console.log(res);
        });

}
