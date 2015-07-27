<?php
	function createuser($username, $password) {
		$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
				
		$client = new Mongo($uri);
		
		$dbname = "heroku_v7w2qftd";
		
		$db = $client->$dbname;
		
		$c_users = $db->users;
		
		$user = array(
			'first_name' => 'MongoDB',
			'last_name' => 'Fan',
			'tags' => array('developer','user')
		);
				
		$songs = $db->songs;
		// To insert a dict, use the insert method.
		$songs->batchInsert($seedData);
		
		$query = array('weeksAtOne' => array('$gte' => 10));
		$cursor = $songs->find($query)->sort(array('decade' => 1));
		foreach($cursor as $doc) {
		    echo 'In the ' .$doc['decade'];
		    echo ', ' .$doc['song']; 
		    echo ' by ' .$doc['artist'];
		    echo ' topped the charts for ' .$doc['weeksAtOne']; 
		    echo ' straight weeks.', "\n";
		}	
		
		// Since this is an example, we'll clean up after ourselves.
		$songs->drop();
		// Only close the connection when your app is terminating
		$client->close();
	}	//end create user
?>