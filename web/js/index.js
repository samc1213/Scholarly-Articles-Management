$(document).ready( function () {
	var originalname;
	var originalperiod1;

	$(".dlform").submit(function (e) {
		e.preventDefault();
		$("#downloadpopup").show();
		var data = [];
		$(".grant").each(function (i) {
			var grant = {};
			grant.name = $(this).find(".granttitle").text();
			grant.status = $(this).find(".status").text();
			grant.source = $(this).find(".grantagency").text();
			grant.amount = $(this).find(".amountnum").text();
			grant.piamount = $(this).find(".piamountnum").text();
			grant.personmonths = $(this).find(".pmonthnum").text();
			grant.specify = $(this).find(".pmonthunits").text();
			grant.description = $(this).find(".summary").text();
			grant.awardperiod1 = $(this).find(".fromdate").text();
			grant.awardperiod2 = $(this).find(".todate").text();
			grant.firstname = $(document).find("#firstname").text();
			grant.lastname = $(document).find("#lastname").text();
			data.push(grant);
		});
		console.log(data);
		var jsondata = JSON.stringify(data);
		var id = Math.random() * 10000;
		$.ajax ({
			type: "POST",
			url: "api.php",
			data:
			{
				type: "download",
				data: jsondata,
				id: id,
			},
			success: function(data)
			{
				console.log("data: " + data);
				console.log("id: " + id);
				$(".waiter").hide();
				$("#downloadpopup").append("<form action='download.php' method='post' id='downloadform'><input name='id' value='" + id + "' type='hidden'/><button type='submit' style='margin-top: 5px;'>Download The File!</button></form>");
			}
		});
	});
	
	
	$(document).on('click', '#downloadform', function(){ 
    	$(".waiter").show();
    	$("#downloadpopup").hide();
    	$("#downloadform").remove();

	}); 

	$("#logoutheaderbutton").click( function () {
		$.ajax ({
			type: "POST",
			url: "api.php",
			data:
			{
				type: "logout",
			},
			success: function(data)
			{
				console.log(data);
				console.log("logoutattempt");
				window.location.replace("/");
			}
		}); //end ajax
	});//end logout click
	
	$("#newgrantform").submit( function (e) {
		e.preventDefault();
		
		// var valid = validateNewForm();
// 		
		// if (valid == false) {
			// $("#newvalidspan").val("All fields required");
			// return;
		// }
					
		var data = {};
		
		data['name'] = $('#grantname').val();
		data['source'] = $('#source').val();
		data['awardperiod1'] = $('#awardperiod1').val();
		data['awardperiod2'] = $('#awardperiod2').val();
		data['status'] = $('#status').val();
		data['personmonths'] = $('#personmonths').val();
		data['specify'] = $('#specify').val();
		data['amount'] = $('#amount').val();
		data['piamount'] = $('#piamount').val();
		data['description'] = $("#description").val();
		
		var jsondata = JSON.stringify(data);
		
		$.ajax ({
			type: "POST",
			url: "api.php",
			data:
			{
				type: "newgrant",
				data: jsondata
			},
			success: function(data)
			{
				console.log(data);
				location.reload();
			}
		}); //end ajax
	});//end newgrant
	
	$("#editgrantform").submit( function (e) {
		e.preventDefault();
			
		var data = {};
		
		
		data['originalname'] = originalname;
		data['originalperiod1'] = originalperiod1;
		
		data['name'] = $('#egrantname').val();
		
		if ($('#esource').val() == 'Other')
		{
			data['source'] = $('#eotherval').val();
		}
		else
		{
			data['source'] = $('#esource').val();
		}
		data['awardperiod1'] = $('#eawardperiod1').val();
		data['awardperiod2'] = $('#eawardperiod2').val();
		data['status'] = $('#estatus').val();
		data['personmonths'] = $('#epersonmonths').val();
		data['specify'] = $('#especify').val();
		data['amount'] = $('#eamount').val();
		data['piamount'] = $('#epiamount').val();
		data['description'] = $("#edescription").val();

		var jsondata = JSON.stringify(data);
		
		$.ajax ({
			type: "POST",
			url: "api.php",
			data: {
				type: "editgrant",
				data: jsondata
			},
			success: function(data)
			{
				console.log(data);
				location.reload();
			}
		}); //end ajax
	});//end newgrant

	
	$('#shield').click(function () {
		console.log('pen');
		console.log(originalname);
		var display = $('.grantpopup').css('display');
		if (display = 'block')
		{
			$('#shield').css('background-color', 'white');
			$(".grantpopup").hide();
			$('.editbtn').show();	
		}
	});

	
	
	$("#newgrantbutton").click(function(evt) {
		evt.stopPropagation();
		console.log('hi');
		$("#newgrantpopup").show();
		$('#shield').css('background-color', 'grey');
		$('.editbtn').hide();	
		 $('html, body').animate({
	        scrollTop: $("#newgrantpopup").offset().top
	    }, 1000);
				
	});//end logout click
	
	$(".grantpopup").click(function(evt) {
		evt.stopPropagation();		
	});//end logout click
	
	$(".editbtn").click(function(evt) {
		evt.stopPropagation();		
		console.log("yo");
		
		var buttonnumber = $(this).attr('id').substr(7);
		
		var divnumber = buttonnumber -1;
		
		$("#editgrantpopup").show();
		$grantdiv = $("#grant" + divnumber);
		$grantname = $grantdiv.find(".granttitle");
		originalname = $grantname.text();
		$("#egrantname").val($grantname.text());
		
		$grantagency = $grantdiv.find(".grantagency");

		if ($grantagency.text() != 'NSF' && $grantagency.text() != 'DOE' && $grantagency.text() != 'NIH')
		{
			$("#esource").val("Other");
			$("#eotherval").val($grantagency.text());
		}
		else
		{
				$("#esource").val($grantagency.text());
		}
		
		var selected = $("#esource").val();
	    if(selected == 'Other'){
	      $('#eotherval').show();
	      $('#eotherlabel').show();
	    }
	    else{
	    	$('#eotherval').hide();
	      $('#eotherlabel').hide();
	    }

		$fromdate = $grantdiv.find(".fromdate");
		originalperiod1 = $fromdate.text();
		$("#eawardperiod1").val($fromdate.text());
		
		$todate = $grantdiv.find(".todate");
		$("#eawardperiod2").val($todate.text());
		
		$status = $grantdiv.find(".status");
		$("#estatus").val($status.text());
		
		$pmonths = $grantdiv.find(".pmonthnum");
		$("#epersonmonths").val($pmonths.text());
		
		$pmonthunits = $grantdiv.find(".pmonthunits");
		$("#especify").val($pmonthunits.text());
		
		$amount = $grantdiv.find(".amountnum");
		$("#eamount").val($amount.text());
		
		$piamount = $grantdiv.find(".piamountnum");
		$("#epiamount").val($piamount.text());
		
		$description = $grantdiv.find(".summary");
		$("#edescription").val($description.text());
		
		$('.editbtn').hide();	
		$('#shield').css('background-color', 'grey');
		
		$('html, body').animate({
	        scrollTop: $("#editgrantpopup").offset().top
	    }, 1000);	
	});//end logout click
	
	$('#source').change(function() {
	    var selected = $(this).val();
	    if(selected == 'Other'){
	      $('#otherval').show();
	      $('#otherlabel').show();
	    }
	    else{
	    	$('#otherval').hide();
	      $('#otherlabel').hide();
	    }
 	}); //end source
    
    $('#esource').change(function() {
	    var selected = $(this).val();
	    if(selected == 'Other'){
	      $('#eotherval').show();
	      $('#eotherlabel').show();
	    }
	    else{
	    	$('#eotherval').hide();
	      $('#eotherlabel').hide();
	    }
	}); //end esource
	
});//end doc ready


function validateNewForm() {
  var isValid = true;
  $('#newgrantform').each(function() {
    if ( $(this).val() === '' )
        isValid = false;
  });
  return isValid;
}
