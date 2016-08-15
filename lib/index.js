"use strict";

module.exports = setup;

setup._imports = {
    log: console.log,
    defaultsDeep: require("lodash").defaultsDeep,
    RestClient: require('node-rest-client').Client;
};

function setup(options, injected, register) {
    var imports = setup._imports;
    imports.defaultsDeep(imports, injected);
    let log = imports.log;
    let RestClient = imports.RestClient;

    class CloudAtCostClient {
        constructor(apikey, email, options){
            this.options = {
                baseUrl: "https://panel.cloudatcost.com/api/v1/"
            };
            imports.defaultsDeep(this.options, options);
            this.options.apikey = options.apikey || apikey;
            this.options.email = options.email || email;
            this.client = new RestClient();
        }

        execQuery(command, options) {

        }

        listServers(options){
            var command = {
                resource: 'listservers.php'
            };

            return execQuery(command, options);
        }

        listTemplates() {
            var command = {
                resource: 'listtemplates.php'
            };

        }
        listTasks() {
            var command = {
                resource: 'listtasks.php'
            };

        }
        setPower(serverid, action, options){
            var command = {
                resource: 'powerop.php',
                action: 'poweron'
            };

        }
        setPowerOn(serverid, options) {
            var command = {
                resource: 'powerop.php',
                action: 'poweron'
            };

        }
        serverPowerOff(serverid, options) {
            var command = {
                resource: 'powerop.php',
                action: 'poweroff'
            };

        }
        serverPowerReset(serverid, options) {
            var command = {
                resource: 'powerop.php',
                action: 'reset'
            };

        }
        setRunmodeNormal(serverid, action, options) {
            var command = {
                resource: 'runmode.php',
            };
        }
        setRunmodeNormal(serverid, options) {
            var command = {
                resource: 'runmode.php',
                action: 'normal'
            };

        }
        setRunmodeSafe(serverid, options) {
            var command = {
                resource: 'runmode.php',
                action: 'safe'
            };

        }
        renameServer(serverid, name, options) {
            var command = {
                resource: 'renameserver.php'
            };
        }
        reverseDnsSet(serverid, hostname, options){
            var command = {
                resource: 'rdns.php'
            };
        }
        consoleUrl(serverid, options) {
            var command = {
                resource: 'console.php'
            };

        }



    }
}

