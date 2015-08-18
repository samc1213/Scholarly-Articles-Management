$(document).ready(function () {
	$("#edituserform").submit (function (e) {
		e.preventDefault();
		var newpass = $(this).find('input[name="newpass"]').val();
		var newpassconfirm = $(this).find('input[name="newpassconfirm"]').val();
		
		if (newpass != newpassconfirm)
		{
			$("#editusererrospan").text("Passwords Must Match");
		}
	});
});