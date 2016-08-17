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
            self.classInstanceDefaultOptions = {
                url: "http://panel.cloudatcost.com/api/v1/${resource}.php",
                operation: "get",
                args: {
                    parameters: {key: apikey, login: email},
                    headers: {"Content-Type": "application/json"}
                },
                connection: {
                    //BUGBUG: can be unsafe = skipping auth - adding certs for self sign is exercise for the reader
                    rejectUnauthorized: true
                }
            };
            imports.defaultsDeep(self.classInstanceDefaultOptions, overrides);
            self.client = new RestClient(self.classInstanceDefaultOptions.connection || {});
        }

        execQuery(resourceDefaults, overrides) {
            var self = this;
            return new Promise( (resolve, reject) => {
                let compiledOptions = {};

                imports.defaultsDeep(compiledOptions,
                    self.classInstanceDefaultOptions,
                    resourceDefaults,
                    overrides);

                 self
                     .client[compiledOptions.operation]
                     .call(self,
                         compiledOptions.url,
                         compiledOptions.args, (err, data)=> {
                            console.log(err);
                            console.log(data.toString('utf8'));
                            resolve(data);
                        });
            });
        }

        listServers(overrides){
            var resourceDefaults = {
                args: {
                    path: {resource: "listservers"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        listTemplates(overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "listtemplates"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        listTasks(overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "listtasks"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        setPowerOn(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "powerop"},
                    parameters: {action: "poweron"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        serverPowerOff(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "powerop"},
                    parameters: {action: "poweroff"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        serverPowerReset(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "powerop"},
                    parameters: {action: "reset"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        setRunmodeNormal(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "runmode"},
                    parameters: {action: "normal"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }
        setRunmodeSafe(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "runmode"},
                    parameters: {action: "safe"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }
        renameServer(serverid, name, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "renameserver"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }
        reverseDnsSet(serverid, hostname, overrides){
            var resourceDefaults = {
                args: {
                    path: {resource: "rdns"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
        }

        consoleUrl(serverid, overrides) {
            var resourceDefaults = {
                args: {
                    path: {resource: "console"}
                }
            };
            return this.execQuery(resourceDefaults, overrides);
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