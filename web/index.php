<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Grants</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        
        <link rel="stylesheet" href="css/font-awesome-4.3.0/css/font-awesome.min.css">
        
        <link rel="stylesheet" href="css/jquery.modal.css" type="text/css" media="screen" />
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
        
        <!--Keep custom css last  -->
		<link rel="stylesheet"  type="text/css" href="css/custom.css">
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div id='shield'>
        <section id="content" class="clearfix">
	        <header class="clearfix">
	        	<a href="/"> <img id="mainlogo" src="img/sofilogo.png"/> </a>
	        	<?php
	        		session_start();
					if (isset($_SESSION['username'])) {
						echo '<button id="logoutheaderbutton" class="logbutton">Logout</button>';		
					}
					else {
						echo '<a href="/login.html"><button id="loginheaderbutton" class="logbutton">Login</button></a>';
					}
	        	?>
	        	
	        	
	        </header>
	        	
	        	<h2 id="grantheader"><?php session_start();
	        	if (isset($_SESSION['username'])) {
	        		echo $_SESSION['firstname'];
					echo "'s Grants</h2>";
				}
				else {
					echo "<h1 style='text-align: center;'>Login!</h1>";
				}
				
				?>
	        	<section id="grants">
	        			<?php
	        				include 'functions.php';
	        				session_start();
							if (isset($_SESSION['username'])) {
								$user = $_SESSION['username'];
								echo $user;
								echo getgrants($user);
								chdir('/Users/sam/Documents/Aptana Studio 3 Workspace/CP Grants/dist/ruby');
								$jsongrants = shell_exec('ruby get_grants.rb '.$user);
								$dirtyphpgrants = (array)json_decode($jsongrants);
																
								$cleanphpgrants = array();
								foreach ($dirtyphpgrants as $grant) {
									$grant = (array)$grant;
									array_push($cleanphpgrants, $grant);								
								}		//this cleans up the generic objects and makes the whole grant structure an array of arrays
								
								$count = 0;
								
								if (empty($cleanphpgrants))
								{
									echo "<h3 style='text-align: center; color: red;'>You don't have any grants at the moment. Add one below!</h3>";
									
								}
																
								foreach ($cleanphpgrants as $cleangrant) {
									echo '<div id="grant';
									echo $count;
									echo '" class="grant">';
									
									echo '<p class="grantname"> <span class="grantnum">';
									$count = $count + 1;
									echo $count;
									
									echo '. </span>';
									
									echo '<span class="granttitle">';
									echo $cleangrant['title'];
									echo '</span>';
									echo '<span> </span><span class="buttoncover"><button class="btn btn-default editbtn" style="padding: 0;" id="editbtn';
									echo $count;
									echo '"><i class="fa fa-pencil-square-o"';
									
									
									echo '"></i></button></span>';
																									
									$status = $cleangrant['status'];
									$agency = $cleangrant['source'];
									$amount = $cleangrant['amount'];
									$piamount = $cleangrant['piamount'];
									$pmonths = $cleangrant['pmonths'];
									$units = $cleangrant['pmonthunit'];
									$summary = $cleangrant['summary'];
									$fromdate = $cleangrant['fromdate'];
									$todate = $cleangrant['todate'];
									
									echo '<span class="status">'.$status.'</span></p>';
									
									echo '<p class="grantagency">'.$agency.'</p>';
									echo '<p class="amount">Total Annual Amount: $<span class="amountnum">'.$amount.'</span></p>';
									echo '<p class="piamount">Total Annual Amount to PI: $<span class="piamountnum">'.$piamount.'</span></p>';
									echo '<p class="pmonths"> <span class="pmonthnum">'.$pmonths.'</span> <span class="pmonthunits">'.$units. '</span> person-months</p>';
									echo '<p class="dates"><span class="fromdate">'.$fromdate.'</span> to <span class="todate">'.$todate.'</span></p>';
									echo '<p class="summary">'.$summary.'</p>';
									echo '</div>';
								}
								
								if (count($cleanphpgrants) <=2) 
								{
									echo "<div style='height: 10em;'></div>";
								}
								
							}
	        			?>
	        	
	        	<!-- <div id='grant1' class='grant'>
	        		<p class="grantname"> <span class="grantnum">1.</span>This grant is really awesome <span class="status">Current</span></p>
	        		<p class="grantagency"> DOE</p>
	        		<p class="amount">$42,000</p>
	        		<p class="pmonths"> 3.42 person-months</p>
	        		
	        	</div> -->
	        		
	        	</section>

	        	<?php
	        	session_start();
	        	if (isset($_SESSION['username'])) {
	        		echo '<button id="newgrantbutton"><i class="fa fa-plus-square" id="newgrantplus"></i> Add another grant</button>';
				}?>
	    	
	        	
	        	
	        
	                <div id="newgrantpopup" class="grantpopup">
		        	<h2 id="newgrantheader">New Grant</h2>
		        	<form id="newgrantform">
		        		<label class="biglabel" for="grantname">Grant Name:</label>
				        <input type="text" id="grantname" style="width: 90%;"/> <br><br>
				        
		        		<label class="biglabel" for="source">Source:</label>
				        <select id="source">
				        	<option value="DOE">DOE</option>
		    				<option value="NIH">NIH</option>
		    				<option value="NSF">NSF</option>
		    				<option value="Other">Other</option>

				        </select> <br><br>
				        
				        <label class="sublabel" for="otherval" id="otherlabel" style="display: none;">Specify other:</label>
				       	<input type="text" id="otherval" style="display: none;"/>

				        
				        <label class="biglabel">Award Period:</label>
						<label class="sublabel" for="awardperiod1">From:</label>
						<input id="awardperiod1" type="date"/> 
						
						<label class="sublabel" for="awardperiod2">To:</label>
						<input id="awardperiod2" type="date"/><br><br>
		      		
		      			<label class="biglabel" for="status">Status:</label>
						<select id="status">
							<option selected disabled>Choose status</option>
				        	<option value="Completed">Completed</option>
		    				<option value="Pending">Pending</option>
		    				<option value="Submission Planned">Submission Planned</option>
		    				<option value="Transfer of Support">Transfer of Support</option>
				       </select> <br><br>
				       
				       <label class="biglabel" for="personmonths">Person Months:</label>
				       <input type="number" id="personmonths" maxlength="3" step="0.01" min="0"/>
				       
				       <label class="sublabel" for="specify">Specify:</label>
						<select id="specify">
				        	<option value="Calendar">Calendar</option>
		    				<option value="Academic">Academic</option>
		    				<option value="Summer">Summer</option>
				       </select> <br><br>
				       
				       
				       <label class="biglabel" for="amount">Total Annual Amount:</label>
				       <span>$</span><input type="text" id="amount"/> <br><br>
				       
				       <label class="biglabel" for="piamount">Total Annual Amount to PI:</label>
				       <span>$</span><input type="text" id="piamount"/> <br><br>
				       
				       <label class="biglabel" for="description">Description:</label>
				       <textarea type="text" rows="4" id="description"></textarea> <br><br>
				       
				       <span id="newvalidspan"></span>
				       
				       <button style="margin-bottom: 1em;">Submit</button>
						
		        	</form>
					</div>
					
					<div id="editgrantpopup" class="grantpopup">
		        	<h2 id="editgrantheader">Edit Grant</h2>
		        	<form id="editgrantform">
		        		<label class="biglabel" for="grantname">Grant Name:</label>
				        <input type="text" id="egrantname" style="width: 90%;"/> <br><br>
				        
		        		<label class="biglabel" for="esource">Source:</label>
				        <select id="esource">
				        	<option value="DOE">DOE</option>
		    				<option value="NIH">NIH</option>
		    				<option value="NSF">NSF</option>
		    				<option value="Other">Other</option>
				        </select> <br><br>
				        
						<label class="sublabel" for="otherval" id="eotherlabel" style="display: none;">Specify other:</label>
				       	<input type="text" id="eotherval" style="display: none;"/>
				        
				        <label class="biglabel">Award Period:</label>
						<label class="sublabel" for="eawardperiod1">From:</label>
						<input id="eawardperiod1" type="date"/> 
						
						<label class="sublabel" for="eawardperiod2">To:</label>
						<input id="eawardperiod2" type="date"/><br><br>
		      		
		      			<label class="biglabel" for="estatus">Status:</label>
						<select id="estatus">
							<option selected disabled>Choose status</option>
				        	<option value="Completed">Completed</option>
		    				<option value="Pending">Pending</option>
		    				<option value="Submission Planned">Submission Planned</option>
		    				<option value="Transfer of Support">Transfer of Support</option>
				       </select> <br><br>
				       
				       <label class="biglabel" for="epersonmonths">Person Months:</label>
				       <input type="number" id="epersonmonths" maxlength="3" step="0.01" min="0"/>
				       
				       <label class="sublabel" for="specify">Specify:</label>
						<select id="especify">
				        	<option value="Calendar">Calendar</option>
		    				<option value="Academic">Academic</option>
		    				<option value="Summer">Summer</option>
				       </select> <br><br>
				       
				       <label class="biglabel" for="eamount">Total Annual Amount:</label>
				       <span>$</span><input type="text" id="eamount"/> <br><br>
				       
				       <label class="biglabel" for="epiamount">Total Annual Amount to PI:</label>
				       <span>$</span><input type="text" id="epiamount"/> <br><br>
				       
				       <label class="biglabel" for="edescription">Description:</label>
				       <textarea type="text" rows="4" id="edescription"></textarea> <br><br>
				       
				       <button style="margin-bottom: 1em;">Save</button>
						
		        	</form>
					</div>

        </section>
        <!-- ^ end of content section -->
	        </div>


        <script src="js/jquery.min.js"></script>
        <script src="js/jquery.modal.min.js" type="text/javascript" charset="utf-8"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.3.min.js"><\/script>')</script>
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>        
        <script src="js/jquery.watermark.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
		<script src="js/index.js"></script>


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
