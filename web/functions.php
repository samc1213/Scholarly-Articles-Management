<?php
	function createuser($username, $password, $email, $firstname, $lastname) {
		require('../vendor/autoload.php');
				
		try{
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
					
			$data = array(
			    array(
			        'username' => $username, 
			        'password' => $password,
			        'email' => $email,
			        'firstname' => $firstname,
			        'lastname' => $lastname
			    ),
			);
		
			$client = new MongoClient($uri);
			
			$db = $client->selectDB("heroku_v7w2qftd");
					
			$users = $db->users;
			// To insert a dict, use the insert method.
			$users->batchInsert($data);
		} catch (Exception $e) {
			throw new Exception($e);
		}
		
// 		
		// $query = array('weeksAtOne' => array('$gte' => 10));
		// $cursor = $songs->find($query)->sort(array('decade' => 1));
		// foreach($cursor as $doc) {
		    // echo 'In the ' .$doc['decade'];
		    // echo ', ' .$doc['song']; 
		    // echo ' by ' .$doc['artist'];
		    // echo ' topped the charts for ' .$doc['weeksAtOne']; 
		    // echo ' straight weeks.', "\n";
		// }	
		
		// Only close the connection when your app is terminating
		$client->close();
	}	//end create user
	
	function loginuser($username, $password) {
		require('../vendor/autoload.php');
				
		try{
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
					
			$client = new MongoClient($uri);
			
			$db = $client->selectDB("heroku_v7w2qftd");
					
			$users = $db->users;	
			
			$user = $users->findOne(array("username" => $username));	
		} catch (Exception $e) {
			throw new Exception ($e);
		}
		echo var_dump($user["password"]);
		
	}
	
?>