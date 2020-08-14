
const api = require('./api');

const tube3port = 12131;
const tube4port = 12132;

api.rpc('127.0.0.1',tube3port,'get_accounts',{},function(err,result){

	for(var account of result.subaddress_accounts) {
		console.log('index '+account.account_index+' tag: '+account.tag);
		api.rpc('127.0.0.1',tube4port,'tag_accounts',{"tag":account.tag,"accounts":[result.account_index]},function(err,result){
		});
	}
});

