var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'fRxKmOHf5ybIDZjM67VVlgxAi',
  consumer_secret: 'KYqFv5RAJUGj28nhX6iO7bLCr81IjK3AMAEVjzvBi1dMDDAkIH',
  access_token_key: '2597302057-3cOZ19lySDHGMwY3hl73B8T5NN1GtZUjtnZiSWH',
  access_token_secret: 'pRytwuPmqPv0UIPG9VwllacILJ5ZuNVg5pFfZMapDfmnT',
/*  request_options: {
  	proxy: 'http://proxy.iiit.ac.in:8080'
  }
*/});


exports.getTwitter = function (req, res) {
	var qtype = req.query.qtype;
	var params = req.query.params;
	//console.log(Object.keys(req));
	//req['query'];
	if(qtype == 'available')
	{
		client.get('trends/available', params, function (error, data, response) {
			//console.log(response);
			if(!error) {
				res.send(data);
			}
		});
	}

	else if(qtype == 'place')
	{
		client.get('trends/place', params, function (error, data, response) {
			if(!error) {
				res.send(data);
			}
		});
	}
};

/*exports.trendsAvailable = function(req, res) {
	var client = 
}*/