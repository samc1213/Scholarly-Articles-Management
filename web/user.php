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
						echo '<button id="logoutheaderbutton" class="logbutton">Logout</button>';		
					}
					else {
						echo '<a href="/login.html"><button id="loginheaderbutton" class="logbutton">Login</button></a>';

					}
	        	?>
	        	
	        	
	        </header>
	   <section id="content" class="clearfix">
				<?php session_start();
	        	if (isset($_SESSION['username'])) {
	        		echo var_dump($_SESSION);
					echo '<form id="edituserform">
								<input type="text" name="firstname" value="'.$_SESSION['firstname'].
								'"/><input type="text" name="middlename" value="'.$_SESSION['middlename'].
								'"/><input type="text" name="lastname" value="'.$_SESSION['lastname'].
								'"/><input type="text" name="email" value="'.$_SESSION['email'].
								'"/><input type="password" name="newpass"/>
								<input type="password" name="newpassconfirm"/>
								<button type="submit">Update User</button>
							</form>
							<span id="editusererrorspan"></span>';					
				}
				else {
					header('Location: http://'.$_SERVER[HTTP_HOST].'/login.html');
				}
				
				?>
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
        <script src="js/user.js"></script>
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
