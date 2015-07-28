$(document).ready(function () {
	$("#signinform").submit(function (e) {
	$('#errorspace').text(" ");

	e.preventDefault();

	valid = validateForm();
	console.log(valid);
	if (valid == false)
	{
		$('#errorspace').text("ERROR! FILL THE FORM!");
		return;
	}

	username = $('#username').val();
	password = $('#password').val();
		$.ajax ({
			type: "POST",
			url: "api.php",
			data: {
				type: "login",
				username: username,
				password: password,
				},
			success: function(data)
			{
				console.log("Data: " + data);
				console.log(typeof(data));
				if (data == "	SUCCESS") 
				{
					console.log("YAYLOGIN!");
					window.location.replace("/");
				}
				else
				{
					$('#errorspace').text(data);
				}
			}
		}); //end
	}); //end login form
	
}); //end document ready

function validateForm() {
  var isValid = true;
  $('.signupfield').each(function() {
    if ( $(this).val() === '' )
        isValid = false;
  });
  return isValid;
}