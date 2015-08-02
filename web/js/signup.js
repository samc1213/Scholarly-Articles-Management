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
			url: "api.php",
			data: {
				type: "create",
				username: username,
				password: password,
				email: email,
				firstname: firstname,
				lastname: lastname,
				},
			success: function(data)
			{
				console.log("DATA" + data + "END");
				if (data == "0") 
				{
					$('#errorspace').text("ERROR! THAT USERNAME EXISTS");
				}
				else if (data == "")
				{
					window.location.replace("/");
				}
				else
				{
					$('#errorspace').text("THERE WAS AN ERROR ADDING THAT USERNAME");
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