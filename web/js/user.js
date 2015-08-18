$(document).ready(function () {
	$("#edituserform").submit (function (e) {
		e.preventDefault();
		var newpass = $(this).find('input[name="newpass"]').val();
		var newpassconfirm = $(this).find('input[name="newpassconfirm"]').val();
		
		if (newpass != newpassconfirm)
		{
			$("#editusererrorspan").text("Passwords Must Match");
			return false;
		}
		
		var data = {};
		
		data.firstname = $(this).find('input[name="firstname"]').val();
		data.middlename = $(this).find('input[name="middlename"]').val();
		data.lastname = $(this).find('input[name="lastname"]').val();
		data.email = $(this).find('input[name="email"]').val();
		data.password = $(this).find('input[name="newpass"]').val();
		
		console.log(data);
	});
});