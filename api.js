var http = require('http');
var https = require('https');

function jsonHttpRequest(host, port, data, callback, path){
	path = path || '/json_rpc';
	callback = callback || function(){};

	var options = {
		hostname: host,
		port: port,
		path: path,
		method: data ? 'POST' : 'GET',
		headers: {
			'Content-Length': data.length,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	};

	var req = (port === 443 ? https : http).request(options, function(res){
		var replyData = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			replyData += chunk;
		});
		res.on('end', function(){
			var replyJson;
			try{
				replyJson = JSON.parse(replyData);
			}
			catch(e){
				callback(e, {});
				return;
			}
			callback(null, replyJson);
			});
	});

	req.on('error', function(e){
		callback(e, {});
	});

	req.end(data);
}

exports.json = function(host, port, data, callback,path){
	jsonHttpRequest(host, port, data, function(error, replyJson){
		callback(error, replyJson);
	},path);
}

exports.rpc = function(host, port, method, params, callback){
	var data = JSON.stringify({
		id: "0",
		jsonrpc: "2.0",
		method: method,
		params: params
	});
	jsonHttpRequest(host, port, data, function(error, replyJson){
		if (error){
			callback(error, {});
			return;
		}
		callback(replyJson.error, replyJson.result)
	});
}



