<?php
	function createuser($username, $password) {
		$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
		$options = array("connectTimeoutMS" => 30000);
		
		$client = new MongoClient($uri, $options);
		$db = $client->selectDB("mydb");
		
		$seedData = array(
		    array(
		        'username' => $username, 
		        'pass' => $password,
		    ),
		);
		
		$songs = $db->songs;
		// To insert a dict, use the insert method.
		$songs->batchInsert($seedData);

		// Since this is an example, we'll clean up after ourselves.
		$songs->drop();
		// Only close the connection when your app is terminating
		$client->close();
	}	//end create user
?>