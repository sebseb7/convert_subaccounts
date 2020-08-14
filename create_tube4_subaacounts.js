
const api = require('./api');

const tube3port = 12131;
const tube4port = 12132;

api.rpc('127.0.0.1',tube3port,'get_accounts',{},function(err,result){

	for(var account of result.subaddress_accounts) {
		api.rpc('127.0.0.1',tube4port,'create_account',{},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				console.log('created index '+result.account_index);
			}
		});
	}
});

