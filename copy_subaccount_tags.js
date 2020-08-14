
const async = require('async');

const api = require('./api');

const tube3port = 12131;
const tube4port = 12132;

api.rpc('127.0.0.1',tube3port,'get_accounts',{},function(err,result){

	async.mapSeries(result.subaddress_accounts, function(account, callback) {
		console.log('index '+account.account_index+' tag: '+account.tag);
		api.rpc('127.0.0.1',tube4port,'tag_accounts',{"tag":account.tag,"accounts":[result.account_index]},function(err,result){
			callback(null,account);
		});
	});
});

