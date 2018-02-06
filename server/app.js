require('./init');

var configs = require('./config');

var resServer = require("./resserver");
resServer.init(configs.res_server());

var sqlClient = require('./utils/sqlclient');
sqlClient.init(configs.mysql());

socketHelper.init(configs.account_server());