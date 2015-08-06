$(document).ready( function () {
	var originalname;
	var originalperiod1;
	var comparecount;
	var grantnum;
	
	$("#maintable").stupidtable();
	
	$(".datepicker").datepicker();
	
	$("#comparisonbox").click( function (e) {
		e.stopPropagation();
	});
	
	// var target = document.querySelector("body");
// 	
	// var config = { attributes: true, childList: true, characterData: true };
// 
// 	
	// var observer = new MutationObserver(function () {
		// if ($("#grantheader").is(":visible"))
		// {
			// var h = $(window).height();
			// $("#junkdiv").height(h - $("header").outerHeight(true) - $("#grantheader").outerHeight(true) - $("#grants").outerHeight(true) - $("#comparisonbox").outerHeight(true));
			// if ($("#newgrantpopup").is(":visible")) {
				// $("#junkdiv").height(0);
			// }
			// if ($("#editgrantpopup").is(":visible")) {
				// $("#junkdiv").height(0);
			// }
		// }	
	// });
// 
	// observer.observe(target, config);
	
	// $(window).resize(function () {
		// if ($("#grantheader").is(":visible")) {		
			// var h = $(window).height();
			// $("#junkdiv").height(h - $("header").outerHeight(true) - $("#grantheader").outerHeight(true) - $("#grants").outerHeight(true) - $("#comparisonbox").outerHeight(true));
			// if ($("#newgrantpopup").is(":visible")) {
				// $("#junkdiv").height(0);
			// }
			// if ($("#editgrantpopup").is(":visible")) {
				// $("#junkdiv").height(0);
			// }
		// }	
	// });

	$("#newcpform").click (function (e) {
		e.stopPropagation();
		$("#newcpform").hide();		
		$("#comparisonbox").show();
		var h = $(window).height();
		$("#junkdiv").height(h - $("header").outerHeight(true) - $("#grantheader").outerHeight(true) - $("#grants").outerHeight(true) - $("#comparisonbox").outerHeight(true));
		$('#shield').show();
		$('.editbtn').hide();
		$("#newgrantbutton").hide();
		$('html, body').animate({
	        scrollTop: $("#comparisonbox").offset().top
	    }, 1000);
	    if(! $("#choosesourceform").length)
	    {
	    	$("#comparisonbox").append('<form id="choosesourceform">');
	    	$("#choosesourceform").append('<label for ="sourceformselect">Which form would you like to use?</label>');
	    	$("#choosesourceform").append('<select id="sourceselect">');
	    	$.each(['DOE'], function (i, v) {
	    		$("#sourceselect").append('<option value ="' + v + '">' + v + '</option>');
	    	});
	    	$("#choosesourceform").append('<div><button id="choosesourcebtn">Next</button></div>');
	    }
	    $("#choosecomparerform").remove();
	    $("#comparetoform").remove();
	});

	$(document).on('submit', '#choosesourceform', function (e) {
		e.preventDefault();
		$(this).remove();
		$("#comparisonbox").append('<form id="choosecomparerform">');
	    $("#choosecomparerform").append('<label for="comparergrantselect">Which grant are you generating the C&P form for?</label>');
	    $("#choosecomparerform").append('<select id="comparergrantselect" style="margin-bottom: 2em;">');
	    $comparer = $("#comparergrantselect");
	    $(".grant").each( function () {
	    	var str = '<option value="' + $(this).find(".granttitle").text() + '">' + $(this).find(".granttitle").text() + '</option>';
	    	$comparer.append(str);
	    });
	    $("#choosecomparerform").append('<div><button id="choosecomparerbtn">Next</button></div>');
		
	});

	$(document).on('submit', '#choosecomparerform', function (e) {
		e.preventDefault();
		comparisons = {};
		grants = [];
		grantcount = 0;
		
		var comparergrant = $("#comparergrantselect").val();
		$gtitle = $(document).find('.granttitle:contains("' + comparergrant + '")');
		$tr = $gtitle.closest('tr');
		var comparerdescription = $tr.find('td.summary').text();
		comparisons[comparergrant] = comparerdescription;
		grants[grantcount] = comparergrant;		//save the grant we're comparing in the object and increment counter
		grantcount++;
		
		if($('.granttitle').length == 1)
		{
			$("#comparetoform").remove();
			$("#choosecomparerform").remove();
			$(".waiter").show();
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
				grant.description = comparisons[grant.name];
				grant.awardperiod1 = $(this).find(".fromdate").text();
				grant.awardperiod2 = $(this).find(".todate").text();
				grant.firstname = $(document).find("#firstname").text();
				grant.lastname = $(document).find("#lastname").text();
				grant.middlename = $(document).find("#middlename").text();
				console.log("mname" + grant.middlename);
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
						if ($(".waiter").is(":visible")) {		//make sure waiter is there in case someone gets bored and closes box before ajax callback
							$("#comparisonbox").append("<form action='download.php' method='post' id='downloadform'><input name='id' value='" + id + "' type='hidden'/><button type='submit'>Download The File!</button></form>");
						} 
							$(".waiter").hide();
					}
				});
				return;
		}
		
		$('.granttitle').each (function () {
			var compareegrant = $(this).text();
			if (compareegrant != comparergrant)
			{
				grants.push(compareegrant);		//store all of the other grants in the grants array (the comparer is in position 0)
			}
			console.log("grants array: " + grants);
		});	
		$(this).remove();
		
		$("#comparisonbox").append('<form id="comparetoform">');		
		
		var comparee = grants[grantcount];
		$gtitle = $(document).find('.granttitle:contains("' + comparee + '")');
		$tr = $gtitle.closest('tr');
		var compareedescription = $tr.find('td.summary').text();			//do first comparison in this function
		
		$("#comparetoform").append('<textarea type="text" rows="2" style="width: 80%;" name="comparison">' + compareedescription + '</textarea>');
		$("#comparetoform").append('<label for="comparison">' + 'Add a line that shows how <strong>' + grants[0] + '</strong> compares to <strong>' + comparee + '</strong></label>');
		$("#comparetoform").append('<input type="hidden" name="grantname" value="' + comparee + '">' );
		$("#comparetoform").append('<div><button id="nextcompareebtn">Next Grant</button><div>');
		
		if (grantcount == grants.length-1)  //if there are only two grants total, make the button say submit
		{
			$("#nextcompareebtn").text("Submit");
		}
		
	});
	
	$(document).on('submit', '#comparetoform', function(e) {		//all subsequent comparisions
		e.preventDefault();
		
		var submittedgrantname = $(this).find('input[name="grantname"]').val();
		comparisons[submittedgrantname] = $(this).find('textarea[name="comparison"]').val(); //when its submitted, save submitted grant name and comparison

		if (grantcount == grants.length-1)		//on submit, check if we've compared every grant, if so, submit to API
		{
			$("#comparetoform").remove();
			$(".waiter").show();
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
				grant.description = comparisons[grant.name];
				grant.awardperiod1 = $(this).find(".fromdate").text();
				grant.awardperiod2 = $(this).find(".todate").text();
				grant.firstname = $(document).find("#firstname").text();
				grant.lastname = $(document).find("#lastname").text();
				grant.middlename = $(document).find("#middlename").text();
				console.log("mname" + grant.middlename);
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
						if ($(".waiter").is(":visible")) {		//make sure waiter is there in case someone gets bored and closes box before ajax callback
							$("#comparisonbox").append("<form action='download.php' method='post' id='downloadform'><input name='id' value='" + id + "' type='hidden'/><input name='filename' value='" + grants[0] + " C&P Form' type='hidden'/><button type='submit'>Download The File!</button></form>");
						} 
							$(".waiter").hide();
					}
				});
		}

		if (grantcount == grants.length-2)
		{
			$("#nextcompareebtn").text("Submit");
		}
		
		grantcount++; //once we've saved submission, go to next grant
		
		var comparee = grants[grantcount];
		$(this).find('input[name="grantname"]').val(comparee); //prepare for next submission
		
		$gtitle = $(document).find('.granttitle:contains("' + comparee + '")');
		$tr = $gtitle.closest('tr');
		var compareedescription = $tr.find('td.summary').text();
		$(this).find('textarea[name="comparison"]').val(compareedescription);

		$(this).find('label').html('Add a line that shows how <strong>' + grants[0] + '</strong> compares to <strong>' + comparee + '</strong>');
	});

	$(document).on('submit', '#downloadform', function(){ 
    	$("#downloadpopup").hide();
    	$("#downloadform").remove();
    	$("#comparisonbox").hide();
    	$("#shield").hide();
    	$(".editbtn").show();    	
    	$("#newcpform").show();
		$('#newgrantbutton').show();
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
			$('#shield').hide();
			$(".grantpopup").hide();
			$('.editbtn').show();	
			$('#newgrantbutton').show();
			$("#newcpform").show();
			$("#comparisonbox").hide();
			$("#downloadpopup").hide();
			$(".waiter").hide();
			$("#downloadform").remove();
			$("#deleteconfirmbox").hide();
			$(".deletebtn").show();
		}
	});

	
	
	$("#newgrantbutton").click(function(evt) {
		evt.stopPropagation();
		$("#newcpform").hide();		
		$(this).hide();
		console.log('hi');
		$("#newgrantpopup").show();
		$('#shield').show();
		$('.editbtn').hide();	
	    $("#junkdiv").height(0);
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
		$("#newcpform").hide();		
		console.log("yo");
		
		var buttonnumber = $(this).attr('id').substr(7);
		console.log("btnnumber:"+buttonnumber);
				
		$("#editgrantpopup").show();
		$grantdiv = $("#grant" + buttonnumber);
		console.log($grantdiv);
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
		
		$location = $grantdiv.find(".location");
		$("#elocation").val($location.text());
		
		$('.editbtn').hide();	
		$('#shield').show();
		
		$('html, body').animate({
	        scrollTop: $("#editgrantpopup").offset().top
	    }, 1000);	
	});//end edit click
	
	$(".deletebtn").click( function (e) {
		e.stopPropagation();
		
		$("#newgrantbutton").hide();
		$("#newcpform").hide();
		$(".editbtn").hide();
		$(".deletebtn").hide();
		$("#shield").show();
		
		var buttonnumber = $(this).attr('id').substr(9);
		
		console.log(buttonnumber);
		
		$grantdiv = $("#grant" + buttonnumber);
		
		var grantname = $grantdiv.find(".granttitle").text();
		
		console.log(grantname);
		
		$("#deleteconfirmbox").show();
		
		$("#confirmmessage").html("Are you sure you want to delete <strong>" + grantname + "</strong>?");
		
		$("#confirmdeleteform").find("input[name='grantname']").val(grantname);
		
	}); //end delete
	
	$("#confirmdeleteform").submit (function () {
		var grantname = $(this).find('input[name="grantname"]').val();
		
		$.ajax ({
			type: "POST",
			url: "api.php",
			data:
			{
				type: "deletegrant",
				name: grantname,
			},
			success: function(data)
			{
				console.log(data);
				console.log("Grant successfully deleted");
				location.reload();
			}
		});
	});
	
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
