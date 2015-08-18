$(document).ready(function () {
	$("#edituserform").submit (function (e) {
		e.preventDefault();
		var newpass = $(this).find('input[name="newpass"]').val();
		var newpassconfirm = $(this).find('input[name="newpassconfirm"]').val();
		
		if (newpass != newpassconfirm)
		{
			$("#editusererror").text("Passwords Must Match");
			return false;
		}
		
		var data = {};
		
		data.firstname = $(this).find('input[name="firstname"]').val();
		data.middlename = $(this).find('input[name="middlename"]').val();
		data.lastname = $(this).find('input[name="lastname"]').val();
		data.email = $(this).find('input[name="email"]').val();
		data.password = $(this).find('input[name="newpass"]').val();
		
		console.log(data);
		
		var jsondata = JSON.stringify(data);
		
		$.ajax({
			type: "POST",
			url: "api.php",
			data:
			{
				type: "edituser",
				data: jsondata,
			},
			success: function (data)
			{
				console.log(data);
				window.location.replace('/');
			},
		});
	});
});