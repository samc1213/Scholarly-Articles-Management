	<?php
		function createuser($username, $password, $email, $firstname, $lastname, $middlename) {
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
				        'lastname' => $lastname,
				        'middlename' => $middlename,
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
				$middlename = $user["middlename"];
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
				$result["middlename"] = $middlename;
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
		
		function newgrant($name, $awardnumber, $source, $awardperiod1, $awardperiod2, $status, $apersonmonths, $cpersonmonths, $spersonmonths, $amount, $piamount, $totamount, $totpiamount, $description, $user, $location) {
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
			
			$today = date("m/d/Y");		
			
			$grant = array(
				        'name' => $name,
				        'awardnumber' => $awardnumber, 
				        'source' => $source,
				        'awardperiod1' => $awardperiod1,
				        'awardperiod2' => $awardperiod2,
				        'status' => $status,
				        'apersonmonths' => $apersonmonths,
				        'cpersonmonths' => $cpersonmonths,
				        'spersonmonths' => $spersonmonths,
				        'specify' => $specify,
				        'amount' => $amount,
				        'piamount' => $piamount,
				        'totamount' => $totamount,
				        'totpiamount' => $totpiamount,
				        'description' => $description,
				        'user' => $user,
				        'location' => $location,
				        'edited' => $today,
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
		
		function editgrant($originalname, $awardnumber, $originalperiod1, $name, $source, $awardperiod1, $awardperiod2, $status, $apersonmonths, $cpersonmonths, $spersonmonths, $amount, $piamount, $totamount, $totpiamount, $description, $user, $location)
		{
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
						
			$today = date("m/d/Y");		
				
			$newdata = array(
				        'name' => $name, 
				        'awardnumber' => $awardnumber,
				        'source' => $source,
				        'awardperiod1' => $awardperiod1,
				        'awardperiod2' => $awardperiod2,
				        'status' => $status,
				        'apersonmonths' => $apersonmonths,
				        'cpersonmonths' => $cpersonmonths,
				        'spersonmonths' => $spersonmonths,
				        'specify' => $specify,
				        'amount' => $amount,
				        'piamount' => $piamount,
				        'totamount' => $totamount,
				        'totpiamount' => $totpiamount,
				        'description' => $description,
				        'user' => $user,
				        'location' => $location,
				        'edited' => $today,
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
		
		function deleteGrant($name, $user) {
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
			
			try {
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$grants = $db->grants;
	
				$query = array("name" => $name, "user" => $user);
				
				echo var_dump($query);
		
				$grants->remove($query);
			} catch (Exception $e) {
				echo $e -> getMessage();
			}	
			
		}	
		
		
		// function download($message, $jsondata) {
		function generateDoc($data, $id, $template, $user) {							
			try {
				$str = "https://morning-bastion-4519.herokuapp.com/jobs";
							
				$ch = curl_init();
				
				$fields = array("id" => $id, "data" => $data, "template" => $template, "user" => $user);
				echo $id;				
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
		
		function getFiles($user, $grantname) {
			require('../vendor/autoload.php');
			$prefixstr = $user.'/'.$grantname.'/';
			$filenamearray = array();
			
			$s3 = Aws\S3\S3Client::factory();		
			
			$objects = $s3->getIterator('ListObjects', array('Bucket' => 'cpgrantsuploads', 'Prefix' => $prefixstr));
			foreach ($objects as $object) {
				array_push($filenamearray, $object['Key']);
			}
			echo json_encode($filenamearray);
		}
		function deleteFile($user, $grantname, $filename) {
			require('../vendor/autoload.php');
			$prefixstr = $user.'/'.$grantname.'/';
			
			$filestr = $prefixstr.$filename;
			
			$s3 = Aws\S3\S3Client::factory();	
			
			$result = $s3->deleteObject(array(
		    'Bucket' => 'cpgrantsuploads',
		    'Key'    => $filestr
			));
			
			echo $result;	
		}
		function getTemplates($user) {
			require('../vendor/autoload.php');
			$prefixstr = $user.'/';
			
			$s3 = Aws\S3\S3Client::factory();
			
			$filenamearray = array();
			
			$objects = $s3->getIterator('ListObjects', array('Bucket' => 'cpgrantstemplates', 'Prefix' => $prefixstr));
			foreach ($objects as $object) {
				array_push($filenamearray, $object['Key']);
			}
			echo json_encode($filenamearray);
			
		}
		
		function listTableElements($grant, $count) {
			$status = $grant['status'];
			$awardnumber = $grant['awardnumber'];
			$agency = $grant['source'];
			$apmonths = $grant['apersonmonths'];
			if ($apmonths != '')
			{
				$alabel = '&nbsp;Academic ';
			}
			else
			{
				$alabel = '';
			}
			$cpmonths = $grant['cpersonmonths'];
			if ($cpmonths != '')
			{
				$clabel = '&nbsp;Calendar ';
			}
			else
			{
				$clabel = '';
			}
			$spmonths = $grant['spersonmonths'];
			if ($spmonths != '')
			{
				$slabel = '&nbsp;Summer';
			}
			else
			{
				$slabel = '';
			}
			$summary = $grant['description'];
			$fromdate = $grant['awardperiod1'];
			$todate = $grant['awardperiod2'];
			$location = $grant['location'];
			$edited = $grant['edited'];
			$totamount = $grant['totamount'];
			$totpiamount = $grant['totpiamount'];
			$amount = $grant['amount'];
			$piamount = $grant['piamount'];
			
			if ($totamount == '')
			{
				$totamountdol = '';
				$totamountlabel = '';
			}
			else {
				$totamountdol = '$';
				$totamountlabel = ' (Total) ';
			}
			if ($totpiamount == '')
			{
				$totpiamountdol = '';
				$totpiamountlabel = '';
			}
			else {
				$totpiamountdol = '$';
				$totpiamountlabel = ' (Total) ';
			}
			
			if ($piamount == '')
			{
				$piamountdol = '';
				$piamountlabel = '';
			}
			else {
				$piamountdol = '$';
				$piamountlabel = ' (Annual) ';
			}
			if ($amount == '')
			{
				$amountdol = '';
				$amountlabel = '';
			}
			else {
				$amountdol = '$';
				$amountlabel = ' (Annual) ';
			}
			
			echo '<tr id="grant';
			echo $count;
			echo '" class="grant">';
			
			echo '<td class="granttitle">';
			echo $grant['name'];
			echo '</td>';
			
			echo '<td class="awardnumber" style="display:none;">'.$awardnumber.'</td>';
			$descsummary = $summary;
			if ($descsummary == '')
			{
				$descsummary = 'No description added.';
			}
			
			echo '<td class="grantagency"><div class="descdiv" id="descdiv'.$count.'">'.$descsummary.'</div><span class="grantagencyval">'.$agency.'</span></td>';
			echo '<td class="amount"><span class = "amountdol">'.$amountdol.'</span><span class="amountnum">'.$amount.'</span>'.$amountlabel.'<span class="totamountdol">'.$totamountdol.'</span><span class="totamountnum">'.$totamount.'</span>'.$totamountlabel.'</td>';
			echo '<td class="piamount"><span class="piamountdol">'.$piamountdol.'</span><span class="piamountnum">'.$piamount.'</span>'.$piamountlabel.'<span class="totpiamountdol">'.$totpiamountdol.'</span><span class="totpiamountnum">'.$totpiamount.'</span>'.$totpiamountlabel.'</td>';
			echo '<td class="pmonths"><span class="apmonthnum">'.$apmonths.'</span>'.$alabel.'<span class="cpmonthnum">'.$cpmonths.'</span>'.$clabel.'<span class="spmonthnum">'.$spmonths.'</span>'.$slabel.'</td>';
			echo '<td class="from"><span class="fromdate">'.$fromdate.'</span></td>';
			echo '<td class="to"><span class="todate">'.$todate.'</span></td>';
			echo '<td class = "location"><span class="locationval">'.$location.'</span></td>';
			echo '<td class="status">'.$status.'</span></td>';
			echo '<td class="summary" style="display: none;">'.$summary.'</td>';
			echo '<td class="edited">'.$edited.'</td>';
			echo '<td class="edittd"><div class="editbtn teamSelector" style="padding: 0;" id="editbtn';
			echo $count;
			echo '"><i class="fa fa-pencil-square-o"';
			echo '"></i></div></td>';
			echo '<td class="deletetd"><div class="deletebtn teamSelector" style="padding: 0;" id="deletebtn';
			echo $count;
			echo '"><i class="fa fa-trash-o"';
			echo '"></i></div></td>';
			echo '<td class="filestoretd"><div class="filestorebtn teamSelector" style="padding: 0;" id="filestorebtn';
			echo $count;
			echo '"><i class="fa fa-folder"';
			echo '"></i></div></td>';
			echo '<span class="comparison" style="display:none">';
			echo '</tr>';
		}

		function editUser($username, $firstname, $middlename, $lastname, $email, $newpass)
		{				
			require('../vendor/autoload.php');
			$uri = "mongodb://heroku_v7w2qftd:a5h7slci8p0b2p9nt7qe96hmvv@ds027483.mongolab.com:27483/heroku_v7w2qftd";
			
			$query = array ("username" => $username);
			
			if ($newpass != '')
			{
				$newdata = array (
				'firstname' => $firstname,
				'middlename' => $middlename,
				'lastname' => $lastname,
				'email' => $email,
				'password' => $newpass,
				);
			}
			else
			{
				$newdata = array (
				'firstname' => $firstname,
				'middlename' => $middlename,
				'lastname' => $lastname,
				'email' => $email,
				);
			}
			
			
			$updatearray = array('$set' => $newdata);
			
			try {
				$client = new MongoClient($uri);
				
				$db = $client->selectDB("heroku_v7w2qftd");
						
				$users = $db->users;
				
				$users->update($query, $updatearray);
				
				// echo var_dump(iterator_to_array($results));
			} catch (Exception $e) {
				echo $e -> getMessage();
			}
		}
	?>