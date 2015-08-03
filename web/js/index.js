$(document).ready( function () {
	var originalname;
	var originalperiod1;
	var comparecount;
	var grantnum;
	$("#maintable").stupidtable();

	$(window).resize(function () {
		if ($("#comparisonbox").is(":visible"))
		{
			var h = $(window).height();
			$("#junkdiv").height(h - $("header").outerHeight(true) - $("#grantheader").outerHeight(true) - $("#grants").outerHeight(true) - $("#comparisonbox").outerHeight(true));
		}
	});

	$("#newcpform").click (function (e) {
		e.stopPropagation();
		$("#comparisonbox").show();
		var h = $(window).height();
		$("#junkdiv").height(h - $("header").outerHeight(true) - $("#grantheader").outerHeight(true) - $("#grants").outerHeight(true) - $("#comparisonbox").outerHeight(true));
		$('#shield').css('background-color', 'grey');
		$('.editbtn').hide();
		$("#newgrantbutton").hide();		
	});

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
			grant.location = $(this).find(".locationval").text();
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
	
	$(".compareform").submit( function (e) {
		e.preventDefault();
		comparecount = 0;
		grantnum = $(this).find('input[name="grantnum"]').val();
		grantnum = grantnum - 1;
		console.log("grantnum: " + grantnum);
		$("#comparepopup").show();
		if (comparecount != grantnum) {
			var grantstr = "#grant" + grantnum;
			$comparergrant = $(grantstr);
			var comparername = $comparergrant.find(".granttitle").text();
			$compareegrant = $("#grant" + comparecount);
			var compareename = $compareegrant.find(".granttitle").text();
			$("#comparelabel").text("Compare " + comparername + "to " + compareename);
		}
		else {
			comparecount = comparecount + 1;
			var grantstr = "#grant" + grantnum;
			$comparergrant = $(grantstr);
			var comparername = $comparergrant.find(".granttitle").text();
			$compareegrant = $("#grant" + comparecount);
			var compareename = $compareegrant.find(".granttitle").text();
			$("#comparelabel").text("Compare " + comparername + "to " + compareename);
		}
	});
	
	$("#compareformpopup").submit( function (e) {
		e.preventDefault();
		var grantstr = "#grant" + grantnum;
		$comparergrant = $(grantstr);
		var comparername = $comparergrant.find(".granttitle").text();
		$compareegrant = $("#grant" + comparecount);
		var compareename = $compareegrant.find(".granttitle").text();
		if (comparecount != grantnum) {
			$("#comparelabel").text("Compare " + comparername + " to " + compareename);
			var grantstr = "#grant" + comparecount;
			$grant = $(document).find(grantstr);
			var str = $(this).find('input[name="comparisontext"]').val();
			$grant.find(".comparison").text(str);
			$(this).find('input[name="comparisontext"]').val('');
		}

		if (comparecount == $(".grant").length - 2)
		{
			console.log("HIDE!");
			$("#comparelabel").text("lastone");
			$("#comparepopup").hide();
		}
		comparecount = comparecount + 1;
	});
	
	$(document).on('submit', '#downloadform', function(){ 
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
		
		if ($('#source').val() == 'Other')
		{
			data['source'] = $('#otherval').val();
		}
		else
		{
			data['source'] = $('#source').val();
		}
		
		data['name'] = $('#grantname').val();
		data['awardperiod1'] = $('#awardperiod1').val();
		data['awardperiod2'] = $('#awardperiod2').val();
		data['status'] = $('#status').val();
		data['personmonths'] = $('#personmonths').val();
		data['specify'] = $('#specify').val();
		data['amount'] = $('#amount').val();
		data['piamount'] = $('#piamount').val();
		data['description'] = $("#description").val();
		data['location'] = $("#location").val();
		
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
		data['location'] = $("#elocation").val();

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
		var display = $('.grantpopup').css('display');
		if (display = 'block')
		{
			$('#shield').css('background-color', 'white');
			$(".grantpopup").hide();
			$('.editbtn').show();	
			$('#newgrantbutton').show();
			$("#comparisonbox").hide();
		}
	});

	
	
	$("#newgrantbutton").click(function(evt) {
		evt.stopPropagation();
		$(this).hide();
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
		$("#newgrantbutton").hide();		
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
