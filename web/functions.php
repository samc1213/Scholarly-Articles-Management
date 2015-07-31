	<?php
		function createuser($username, $password, $email, $firstname, $lastname) {
			// require('../vendor/autoload.php');				
			try{
				$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
				// $uri = "mongodb://localhost:27017/";		
				
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
			
		}	//end create user
		
		function loginuser($username, $password) {
			require('../vendor/autoload.php');
			
			$result = array();
					
			try{
				$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
									
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$users = $db->users;	
				
				$user = $users->findOne(array("username" => $username));
				
				$passhash = $user["password"];
				$firstname = $user["firstname"];
				$lastname = $user["lastname"];
				$email = $user["email"];
					
			} catch (Exception $e) {
				$result['message'] = "Trouble connecting to database";
			}
			
			if ($user == null) {
				$result["message"] = "User doesn't exist";
			}
			
			else if (password_verify($password, $passhash)) {
				$result["message"] = "SUCCESS";
				$result["username"] = $username;
				$result["firstname"] = $firstname;
				$result["lastname"] = $lastname;
				$result["email"] = $email;
			}
			else
			{
				$result["message"] = "Password doesn't match";
			}
		return $result;
		}//end login user
	
		function logout() {
			session_start();
			session_destroy();
		} //end logout
		
		function newgrant($name, $source, $awardperiod1, $awardperiod2, $status, $personmonths, $specify, $amount, $piamount, $description, $user) {
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
			
			$grant = array(
				        'name' => $name, 
				        'source' => $source,
				        'awardperiod1' => $awardperiod1,
				        'awardperiod2' => $awardperiod2,
				        'status' => $status,
				        'personmonths' => $personmonths,
				        'specify' => $specify,
				        'amount' => $amount,
				        'piamount' => $piamount,
				        'description' => $description,
				        'user' => $user,
				    );
			try {
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$grants = $db->grants;
	
				$grants->insert($grant);
			} catch (Exception $e) {
				throw new Exception($e);
			}		
		} //end newgrant
		
		function getgrants($user) {
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
			
			$query = array ("user" => $user);
			
			try {
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$grants = $db->grants;
				
				$results = $grants->find($query);
				
				// echo var_dump(iterator_to_array($results));
			} catch (Exception $e) {
				echo $e -> getMessage();
			}
			return $results; //result is an iterator
			
		} //end getgrants
		
		function editgrant($originalname, $originalperiod1, $name, $source, $awardperiod1, $awardperiod2, $status, $personmonths, $specify, $amount, $piamount, $description, $user)
		{
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
						
			$newdata = array(
				        'name' => $name, 
				        'source' => $source,
				        'awardperiod1' => $awardperiod1,
				        'awardperiod2' => $awardperiod2,
				        'status' => $status,
				        'personmonths' => $personmonths,
				        'specify' => $specify,
				        'amount' => $amount,
				        'piamount' => $piamount,
				        'description' => $description,
				        'user' => $user,
				    );		
			
			try {
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$grants = $db->grants;

				$grants->update(array("name" => $originalname, "awardperiod1" => $originalperiod1, "user" => $user), $newdata);
			} catch (Exception $e) {
				echo $e -> getMessage();
			}
		} //end editgrant
		

		// function download($message, $jsondata) {
		function generateDoc($data, $id) {							
			try {
				$str = "https://morning-bastion-4519.herokuapp.com/jobs";
							
				$ch = curl_init();
				
				$fields = array("id" => $id, "data" => $data);

				curl_setopt($ch, CURLOPT_URL, $str);
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_HEADER, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

				$response = curl_exec($ch);
				curl_close($ch);						
				
				fclose($fp);		
				
			} catch (Exception $e) {
				// echo $e -> getMessage();
			}

			
		} //end download
	?>