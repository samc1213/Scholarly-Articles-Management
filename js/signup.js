$(document).ready (function () {
	$("#signupform").submit(function (e) {
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
	email = $('#email').val();
	firstname = $('#firstname').val();
	lastname = $('#lastname').val();
		$.ajax ({
			type: "POST",
			url: "php/signup.php",
			data: {
				username: username,
				password: password,
				email: email,
				firstname: firstname,
				lastname: lastname,
				},
			success: function(data)
			{
				console.log("Data" + data);
				console.log(typeof(data));
				if (data == "ERROR USERNAME TAKEN") 
				{
					console.log("yaytak");
					$('#errorspace').text("ERROR! THAT USERNAME EXISTS");
				}
				else
				{
					console.log("nottak");
					window.location.replace("/");
				}
			}
		}); //end ajax
	}); //end signup form
});


function validateForm() {
  var isValid = true;
  $('.signupfield').each(function() {
    if ( $(this).val() === '' )
        isValid = false;
  });
  return isValid;
}