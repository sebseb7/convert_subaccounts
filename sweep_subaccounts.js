
const async = require('async');
const api = require('./api');

const tube3port = 12131;

api.rpc('127.0.0.1',tube3port,'refresh',{},function(err,result){
	api.rpc('127.0.0.1',tube3port,'get_accounts',{},function(err,result){
		async.mapSeries(result.subaddress_accounts, function(account, callback) {
			api.rpc('127.0.0.1',tube3port,'sweep_tube4',{account_index:account.account_index},function(err,result){
				console.log(err);
				console.log(result);
				callback(null,account);
			});
		});
	});
});

