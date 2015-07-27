$(document).ready(function () {
	$("#signupform").submit(function (e) {
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
			url: "php/signin.php",
			data: {
				username: username,
				password: password,
				},
			success: function(data)
			{
				console.log("Data: " + data);
				console.log(typeof(data));
				if (data == "ERROR") 
				{
					console.log("boo");
					$('#errorspace').text("ERROR! THAT USERNAME/PASSWORD COMBO DOESN'T EXIST");
				}
				else
				{
					console.log("yay");
					window.location.replace("/");
				}
			}
		}); //end ajax
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