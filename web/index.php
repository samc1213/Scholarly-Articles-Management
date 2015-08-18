<!doctype html>
<html class="no-js" lang="">
    <head>
    	<link rel="icon" href="favicon.ico" type="image/x-icon"/>	
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Scholarly Awards Management</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">

        <link rel="stylesheet" href="css/main.css">
        
        <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">
        
        <link rel="stylesheet" href="css/jquery.modal.css" type="text/css" media="screen" />
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
		
		<link rel="stylesheet" href="css/jquery-ui.css" type="text/css"/>
        		
		<link href="css/dropzone.css" type="text/css" rel="stylesheet"/>

		<link href="css/bootstrap.min.css" type="text/css" rel="stylesheet"/>
              
        <!--Keep custom css last  -->
		<link rel="stylesheet"  type="text/css" href="css/custom.css">
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div id='shield'>
        </div>
	        <header class="clearfix">
	        	<?php
	        		session_start();
					if (isset($_SESSION['username'])) {
						echo '<button id="logoutheaderbutton" class="logbutton">Logout</button><div id="userspacer"><a href="user.php"><i class="fa fa-user" id="manageuserbtn"</i></a></div>';		
					}
					else {
						echo '<a href="/login.html"><button id="loginheaderbutton" class="logbutton">Login</button></a>';

					}
	        	?>
	        	
	        	
	        </header>
	   <section id="content" class="clearfix">
 	
	        	<h2 id="grantheader"><?php session_start();
	        	if (isset($_SESSION['username'])) {
	        		echo '<span id="firstname">';
	        		echo $_SESSION["firstname"];
	        		echo '</span>';
					echo ' ';
					echo '<span id="middlename">';
					$middlename = $_SESSION["middlename"];
					echo $middlename;
					echo '</span>';
					if ($middlename != '')
					{
						echo ' ';
					}
					echo '<span id="lastname">'.$_SESSION["lastname"].'</span>';
					echo "'s Grants</h2>";						
				}
				else {
					header('Location: http://'.$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI].'login.html');
				}
				
				?>
				
				<div id="editgrantpopup" class="grantpopup popup">
					<span class="fa fa-times"></span>
		        	<h2 id="editgrantheader">Edit Grant</h2>
		        	<form id="editgrantform">
		        		<label class="biglabel" for="egrantname">Grant Name:</label>
				        <input type="text" id="egrantname" class ="wideinput"/> <br><br>
				        
				        <label class="biglabel" for="eawardnumber">Award Number:</label>
				        <input type="text" id="eawardnumber"/> <br><br>
				        
		        		<label class="biglabel" for="esource">Source:</label>
				        <input type="text" id="esource"/>
				       <br><br>
				        
				        <label class="biglabel">Award Period:</label>
						<label class="sublabel" for="eawardperiod1">From:</label>
						<input id="eawardperiod1" type="text" class="datepicker"/> 
						
						<label class="sublabel" for="eawardperiod2">To:</label>
						<input id="eawardperiod2" type="text" class="datepicker"/><br><br>
		      		
		      			<label class="biglabel" for="estatus">Status:</label>
						<select id="estatus">
							<option selected disabled>Choose status</option>
				        	<option value="Completed">Completed</option>
				        	<option value="Current">Current</option>
		    				<option value="Pending">Pending</option>
		    				<option value="Submission Planned">Submission Planned</option>
		    				<option value="Transfer of Support">Transfer of Support</option>
		    				<option value="Not Funded">Not Funded</option>
				       </select> <br><br>
				       
				       <label class="biglabel" for="eapersonmonths">Academic Person Months:</label>
				       <input type="number" id="eapersonmonths" maxlength="3" step="0.01" min="0"/> <br><br>
				       
				       <label class="biglabel" for="ecpersonmonths">Calendar Person Months:</label>
				       <input type="number" id="ecpersonmonths" maxlength="3" step="0.01" min="0"/><br><br>
				       
				       <label class="biglabel" for="espersonmonths">Summer Person Months:</label>
				       <input type="number" id="espersonmonths" maxlength="3" step="0.01" min="0"/><br><br>
				       
				       <label class="biglabel" for="etotamount">Total Amount:</label>
				       <span>$</span><input type="text" id="etotamount"/> <br><br>
				       
				       <label class="biglabel" for="totepiamount">Total Amount to PI:</label>
				       <span>$</span><input type="text" id="etotpiamount"/> <br><br>
				       
				       <label class="biglabel" for="eamount">Total Annual Amount:</label>
				       <span>$</span><input type="text" id="eamount"/> <br><br>
				       
				       <label class="biglabel" for="epiamount">Total Annual Amount to PI:</label>
				       <span>$</span><input type="text" id="epiamount"/> <br><br>
				       
				       <label class="biglabel" for="elocation">Location:</label>
				       <input type="text" id="elocation" class ="wideinput"/> <br><br>
				       
				       <label class="biglabel" for="edescription">Description:</label>
				       <textarea type="text" rows="4" id="edescription" class ="wideinput"></textarea> <br><br>
				       
				       <span id="editgranterror"></span> 
				       
				       <button style="margin-bottom: 1em;" class="btn btn-default">Save</button>
						
		        	</form>
					</div>
				
	        	<section id="grants">
	        			<?php
	        				include 'functions.php';
	        				session_start();
							if (isset($_SESSION['username'])) {
								$user = $_SESSION['username'];

								$grants = getgrants($user);
				
								$count = 0;
								
								if (($grants->count()) == 0)
								{
									echo "<h3 style='text-align: center; color: red;'>You don't have any grants at the moment. Add one below!</h3>";
									
								}
								
								else {
									echo '<div id="newcpdiv"><button class="btn btn-default" id="newcpform">Create New C&P Form</button><button id="newgrantbutton" class="btn btn-default"><i class="fa fa-plus-square" id="newgrantplus"></i> Add another grant</button></div>
';
								}
								
								echo '<table id="maintable">';
								echo '<thead><tr>
								<th data-sort="string" class="teamSelector" id="titleth" class="titlecol">Title</th>
								<th data-sort="string" class="teamSelector awardcol" style="display:none;" >Award Number</th>
								<th data-sort="string" class="teamSelector" class="agencycol">Agency</th>
								<th data-sort="float" class="sorter-currency teamSelector" class="amountcol">Amount</th>
								<th data-sort="float" class="sorter-currency teamSelector" class="piamountcol">Amount to PI</th>
								<th data-sort="float" class="teamSelector" class="pmonthscol">Person Months</th>
								<th data-sort="int" class="teamSelector" class="fromcol">From</th>
								<th data-sort="int" class="teamSelector" class="tocol">To</th>
								<th data-sort="string" class="teamSelector" class="locationcol">Location</th>
								<th data-sort="string" class="teamSelector" class="statuscol">Status</th>
								<th data-sort="float" class="teamSelector summarycol" style="display: none;">Summary</th>
								<th data-sort="int" class="teamSelector" style="border-right: 2px solid black;" class="modifiedcol">Modified</th>	
								<th colspan="3" style="border-right: 2px solid black;" class="actionscol">Actions</th>										
								</tr style="border-right: 2px solid black;"></thead> <tbody>';
								
								$completedarray = array();
								$notfundedarray = array();
														
														
								foreach ($grants as $grant) {																								
									$status = $grant['status'];
									if ($status != 'Completed' && $status != 'Not Funded')
									{
										echo listTableElements($grant, $count);
									}
									else if ($status == 'Completed') {
										$dictarray = array('grant' => $grant, 'count' => $count);
										array_push($completedarray, $dictarray);
									}
									else {
										$dictarray = array('grant' => $grant, 'count' => $count);
										array_push($notfundedarray, $dictarray);
									}
									$count = $count + 1;
								}
								echo '</tbody><tbody class="avoid-sort" id="spacerbody"><tr class="spacertr" style="border-top: 2px solid black;"><td class="emptycol" colspan="13"><a class="showgrants" id="showcompletedgrants">Click to toggle Completed grants</a></td></tr></tbody>';
								echo '<tbody class="avoid-sort grantsbody" id="completedgrantsbody">';
								
								if (empty($completedarray))
								{
									echo '<tr><td colspan="13" style="text-align: center;">There are no Completed grants</td></tr>';
								}
								
								foreach ($completedarray as $dict)
								{
									
									echo listTableElements($dict['grant'], $dict['count']);
								}
								
							echo '</tbody><tr class="spacertr"><td class="emptycol" colspan="13"><a class="showgrants" id="shownotfundedgrants">Click to toggle Not Funded grants</a></td></tr><tbody class="avoid-sort grantsbody" id="notfundedgrantsbody">';
								if (empty($notfundedarray))
								{
									echo '<tr><td colspan="13" style="text-align: center;">There are no Not Funded grants</td></tr>';
								}
								
								foreach ($notfundedarray as $dict)
								{
									
									echo listTableElements($dict['grant'], $dict['count']);
								}

							
							echo '</tbody></table>';
																
							}
	        			?>				
	        	</section>
	        	
	        	<form action="getCSV.php" method ="post" id="getcsvform"> 
					<input type="hidden" name="csv_text" id="csv_text"/>
					<input type="submit" class="btn btn-default" value="Get CSV File" />
				</form>
	        	
				<div id="comparisonbox" style="display: none;" class="popup">
					<span class="fa fa-times negmarg"></span>
					<h2>New C&P Form</h2>
					<img class="waiter" src="img/ajax-loader.gif"/>
				</div>
				
				<div id="deleteconfirmbox" class="popup">
					<span class="fa fa-times negmarg"></span>
					<h2>Confirm Delete</h2>
					<p id="confirmmessage"></p>
					<form id="confirmdeleteform">
						<input name="grantname" type="hidden"/>
						<button id="deleteconfirmbtn" type="submit" class="btn btn-default">Delete</button>
					</form>
				</div>
				
				<div id="filestorebox" class="popup">
					<span class="fa fa-times negmarg"></span>
					<h2 id="filestoreheader"><span id="grantfilesname"></span> Filestore</h2>
					<span id="fileerror"></span>
					<img class="filewaiter" src="img/ajax-loader.gif"/>
					<table id="filelist">
					</table>
					<form enctype="multipart/form-data" method="post" name="fileinfo" id="filesubmit" style="margin-top: 1em;">
						<span id="fileformspan"><span class="btn btn-default"><input id="fileinput" type="file" name="fileinput[]" multiple required/></span>
						<input type="submit" value="Upload" class="btn btn-default"></span>
					</form>
				</div>
				
	                <div id="newgrantpopup" class="grantpopup popup">
	                <span class="fa fa-times"></span>
		        	<h2 id="newgrantheader">New Grant</h2>
		        	<form id="newgrantform">
		        		<label class="biglabel" for="grantname">Grant Name:</label>
				        <input type="text" id="grantname" class ="wideinput"/> <br><br>
				        
				        <label class="biglabel" for="awardnumber">Award Number:</label>
				        <input type="text" id="awardnumber"/> <br><br>
				        
		        		<label class="biglabel" for="source">Source:</label>
				        <input type="text" id="source"/><br><br>
				        
				        <label class="biglabel">Award Period:</label>
						<label class="sublabel" for="awardperiod1">From:</label>
						<input id="awardperiod1" type="text" class="datepicker"/> 
						
						<label class="sublabel" for="awardperiod2">To:</label>
						<input id="awardperiod2" type="text" class="datepicker"/><br><br>
		      			
		      			<label class="biglabel" for="status">Status:</label>
						<select id="status">
							<option selected disabled>Choose status</option>
							<option value="Completed">Completed</option>
				        	<option value="Current">Current</option>
		    				<option value="Pending">Pending</option>
		    				<option value="Submission Planned">Submission Planned</option>
		    				<option value="Transfer of Support">Transfer of Support</option>
		    				<option value="Not Funded">Not Funded</option>
				       </select><br><br>
				       
				       <label class="biglabel" for="apersonmonths">Academic Person Months:</label>
				       <input type="number" id="apersonmonths" maxlength="3" step="0.01" min="0"/> <br><br>
				       
				       <label class="biglabel" for="cpersonmonths">Calendar Person Months:</label>
				       <input type="number" id="cpersonmonths" maxlength="3" step="0.01" min="0"/><br><br>
				       
				       <label class="biglabel" for="spersonmonths">Summer Person Months:</label>
				       <input type="number" id="spersonmonths" maxlength="3" step="0.01" min="0"/><br><br>
				       
				       <label class="biglabel" for="totamount">Total Amount:</label>
				       <span>$</span><input type="text" id="totamount"/> <br><br>
				       
				        <label class="biglabel" for="totpiamount">Total Amount to PI:</label>
				       <span>$</span><input type="text" id="totpiamount"/> <br><br>
				       
				       <label class="biglabel" for="amount">Total Annual Amount:</label>
				       <span>$</span><input type="text" id="amount"/><br><br>
				       
				       <label class="biglabel" for="piamount">Total Annual Amount to PI:</label>
				       <span>$</span><input type="text" id="piamount"/> <br><br>
				       
				       <label class="biglabel" for="location">Location:</label>
				       <input type="text" id="location" class ="wideinput"/> <br><br>
				       
				       <label class="biglabel" for="description">Description:</label>
				       <textarea type="text" rows="4" id="description" class ="wideinput"></textarea> <br><br>
				       
				       <span id="newgranterror"></span>
				       
				       <button style="margin-bottom: 1em;" class="btn btn-default">Submit</button>
						
		        	</form>
					</div>
					
					

        </section>
        <!-- ^ end of content section -->
		

        <script src="js/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.3.min.js"><\/script>')</script>
        <script src="js/jquery-ui.min.js"></script>
        <script src="js/jquery.tablesorter.js"></script>
        <script src="js/table2CSV.js"></script>	
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>        
        <script src="js/jquery.watermark.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
		<script src="js/index.js"></script>
		<script>$(".grantagency").iWouldLikeToAbsolutelyPositionThingsInsideOfFrickingTableCellsPlease();</script>


        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
