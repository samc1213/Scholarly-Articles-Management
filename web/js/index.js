$.expr[':'].textEquals = function(a, i, m) {
	return $(a).text().match("^" + m[3] + "$");
};

$(window).load( function () {
	window.scrollTo(0,0);
});

$.fn.iWouldLikeToAbsolutelyPositionThingsInsideOfFrickingTableCellsPlease = function() {
    var $el;
    return this.each(function() {
    	$el = $(this);
    	var newDiv = $("<div />", {
    		"class": "innerWrapper",
    		"css"  : {
    			"height"  : "100%",
    			"width"   : "100%",
    			"position": "relative"
    		}
    	});
    	$el.wrapInner(newDiv);    
    });
};

$(".granttitle").hover(
	function () {
		var grantnum = $(this).closest('tr').attr('id').substr(5);
		descstr = "#descdiv" + grantnum;
		$(descstr).show();
	},
	function () {
		$(descstr).hide();
	}
);

$.tablesorter.addParser({ 
    // set a unique id 
    id: 'customData',
    is: function(s) { 
        // return false so this parser is not auto detected 
        return false; 
    }, 
    format: function(s) {
        // format your data for normalization 
        return s.replace('$','').replace(',','');
    }, 
    // set type, either numeric or text 
    type: 'numeric' 
}); 


$(document).ready( function () {
	var originalname;
	var originalperiod1;
	var comparecount;
	var grantnum;
	
	function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
	    }
	}
	
	$(".fa-times").click( function () {
		$("#shield").trigger('click');
	});
	
	$(document).on('click', '.fa-times', function() {
		$("#shield").trigger('click');
	});
	
	function listfiles(data) {
		$('#filelist').html(''); //clear out the old filelist first
		$('#fileerror').html(''); //clear error too
		var filenames = [];
		var files = JSON.parse(data);
		for (i=0; i<files.length; i++)
		{
			var split = files[i].split('/');
			var filename = split[split.length - 1];
			filenames.push(filename);
		}
		console.log(filenames);
		
		var therearefiles = false;
	
		for (i=0; i<filenames.length; i++)
		{
			var name = filenames[i];
			if (name != "")
			{
				$('#filelist').append('<tr class="filestoretr" id="' + name + '"><td class="filename">' + name + '</td><td><div class="deletefile teamSelector" id="deletefile' + i + '"><i class="fa fa-trash-o"></div></td><td><form class="downloadfile teamSelector" id="downloadfile' + i +'" action="downloadfile.php" method="post"><i class="fa fa-cloud-download"></form></td></tr>');
				therearefiles = true;					
			}
		}
		if (!therearefiles)
		{
			$("#fileerror").text("There are no files associated with this grant");
		}
	}
	
	$("#showcompletedgrants").click ( function () {
		$("#completedgrantsbody").toggle();
	});
	
	$("#shownotfundedgrants").click ( function () {
		$("#notfundedgrantsbody").toggle();
	});
	
	$('.filestorebtn').click ( function (e) {
		e.stopPropagation();
		$(".filewaiter").show();
		$('#filestorebox').show();
		$('#shield').show();
		$('#newgrantbutton').hide();
		$('#newcpform').hide();
		var buttonnumber = $(this).attr('id').substr(12);
		console.log("btnnum: " + buttonnumber);
		var trstr = "#grant" + buttonnumber;
		$tr = $(trstr);
		var grantname = $tr.find('td.granttitle').text();
		$("#grantfilesname").text(grantname);
		console.log("gname: " + grantname);
		// $('html, body').animate({
	        // scrollTop: $("#filestorebox").offset().top
	    // }, 1000);
	    $.ajax({
	    	type: "POST",
			url: "api.php",
			data:
			{
				type: "getfiles",
				grantname: grantname,
			},
			success: function(data)
			{
				$(".filewaiter").hide();
				listfiles(data);
			}
	    });	    
	});
	
	$("#getcsvform").submit ( function (e) {
		setTimeout(function(){
		   window.location.reload(1);
		}, 5000);
		$('td.emptycol').hide();
		$('td.actionscol').hide();
		$('td.editd').hide();
		$('td.deletetd').hide();
		$('td.filestoretd').hide();
		$('.descdiv').remove();
		$('td.pmonths').each( function () {
			//get rid of the no break spaces
			var re = new RegExp(String.fromCharCode(160), "g");
			var newtext = $(this).text().replace(re, " ");
			$(this).text(newtext);
		});
		var csv_value=$('#maintable').table2CSV({delivery:'value'});
		$("#csv_text").val(csv_value);
	});
	
	$(document).on('click', '.deletefile', function (e) {
		console.log("delete!");
		$('#filelist').html(''); //clear out the old filelist first
		$('#fileerror').html(''); //clear error too
		$(".filewaiter").show();
		$tr = $(this).closest('tr');
		console.log($tr);
		var filename = $tr.find('td.filename').text();
		console.log(filename);
		var grantname = $("#grantfilesname").text();
		$.ajax({
	    	type: "POST",
			url: "api.php",
			data:
			{
				type: "deletefile",
				grantname: grantname,
				filename: filename,
			},
			success: function(data)
			{
				$.ajax({
			    	type: "POST",
					url: "api.php",
					data:
					{
						type: "getfiles",
						grantname: grantname,
					},
					success: function(data)
					{
						$(".filewaiter").hide();
						listfiles(data);
					}
		    	});	    
			},
		});
	});
	
	$(document).on('click', '.downloadfile', function (e) {
		console.log("download!");
		$tr = $(this).closest('tr');
		console.log($tr);
		var filename = $tr.find('td.filename').text();
		console.log(filename);
		var grantname = $("#grantfilesname").text();
		$(this).append('<input type="hidden" name="grantname" value="' + grantname + '"/>');
		$(this).append('<input type="hidden" name="filename" value="' + filename + '"/>');
		$(this).trigger('submit');
	});
	
	$('#filesubmit').submit( function(e) {
		e.preventDefault();
		$("#filelist").html('');
		$("#fileerror").html('');
		$('.filewaiter').show();
		var sizeOk = true;
		var problemfile = '';
		var inp = document.getElementById('fileinput');
		for (i = 0; i < inp.files.length; i++)
		  {
		  	if(inp.files[i].size >= 2000000)
		  	{
				problemfile = inp.files[i].name;
				sizeOk = false;
		  	}
		  }
		if (sizeOk != true)
		{
			alert(problemfile + " is too big. Max size is 2MB");
			return false;
		}

		var form = document.getElementById('filesubmit');
		var form_data = new FormData(form);
		var gfilename =  $("#grantfilesname").text();
		console.log("gfilename" + gfilename);
		form_data.append('grantname', gfilename);
		console.log(form_data);
	    $.ajax({
	                url: 'upload.php', // point to server-side PHP script 
	                dataType: 'text',  // what to expect back from the PHP script, if anything
	                cache: false,
	                contentType: false,
	                processData: false,
	                data: form_data,                         
	                type: 'POST',
	                success: function(php_script_response){
	                    console.log(php_script_response); // display response from the PHP script, if any
	                    $("#fileinput").val('');
	                    $.ajax({
					    	type: "POST",
							url: "api.php",
							data:
							{
								type: "getfiles",
								grantname: gfilename,
							},
							success: function(data)
							{
								$(".filewaiter").hide();
								listfiles(data);
							}
				    	});	    
	                    
	                },
	                error: function (e) {
	                	console.log(e);
	                }
	     });
	});

	$('#fileinput').bind('change', function() {
	  for (i = 0; i < this.files.length; i++)
	  {
	  	if(this.files[i].size >= 2000000)
	  	{
	  		alert(this.files[i].name + " is too big. Max size is 2MB");
	  	}
	  }
	});


	
	
	$("#maintable").tablesorter({
		cssInfoBlock : "avoid-sort", 
		widgets: [ 'zebra' ],
		textExtraction: {
		2: function(node, table, cellIndex){ return $(node).find(".grantagencyval").text(); },
		}
	});
	
	$("#completedtable").tablesorter();
	
	$(".datepicker").datepicker();
	
	$("#comparisonbox").click( function (e) {
		e.stopPropagation();
	});

	$("#newcpform").click (function (e) {
		e.stopPropagation();
		$("#newcpform").hide();		
		$("#comparisonbox").show();
		var h = $(window).height();
		$('#shield').show();
		$("#newgrantbutton").hide();
		$("#choosecomparerform").remove();
		$("#customtemplateform").remove();
		$("#comparetoform").remove();
		$("#templateuploadmsg").remove();
		$("#choosesourceform").remove();
		$("#comparisonbox").find('p').remove();
		$("#comparisonbox").append('<form id="choosesourceform">');
		$("#choosesourceform").append('<select id="sourceselect">');
    	var templates = [];
    	$.ajax({
    		url: 'api.php', // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything                        
            type: 'POST',
            data: {
            	type: 'gettemplates',
            },
            success: function(data){
            	templatearray = JSON.parse(data);
            },
            async: false,
         });
        templatearray = templatearray.sort();
        for (i = 0; i < templatearray.length; i++)
       	{
       		var n = templatearray[i].lastIndexOf('/');
       		templatearray[i] = templatearray[i].substring(n + 1);
       	}
        templatearray.push('DOE');
        templatearray.push('New Custom Form');
    	$.each(templatearray, function (i, v) {
    		$("#sourceselect").append('<option value ="' + v + '">' + v + '</option>');
    	});
    	$("#choosesourceform").append('<div><button id="choosesourcebtn" class="btn btn-default">Next</button></div>');
	});

	$(document).on('submit', '#choosesourceform', function (e) {
		e.preventDefault();
		templatesource = $("#sourceselect").val();
		if(templatesource != 'New Custom Form')
		{
			$("#comparisonbox").append('<form id="choosecomparerform">');
		    $("#choosecomparerform").append('<label for="comparergrantselect">Which grant are you generating the C&P form for?</label>');
		    $("#choosecomparerform").append('<select id="comparergrantselect" style="margin-bottom: 2em;">');
		    $comparer = $("#comparergrantselect");
		    $theresanoncomplete = false;
		    $(".grant").each( function () {
		    	if ($(this).find(".status").text() != "Completed" && $(this).find(".status").text() != "Not Funded")
		    	{
			    	var str = '<option value="' + $(this).find(".granttitle").text() + '">' + $(this).find(".granttitle").text() + '</option>';
			    	$comparer.append(str);
			    	$theresanoncomplete=true;	    		
		    	}
		    });
			if ($theresanoncomplete == false)
			{
				$("#comparergrantselect").remove();
				$("#choosecomparerform").find('label').html("<a href='https://en.wikipedia.org/wiki/Double_negative' target='_blank'>There are no grants that aren't Completed or Not Funded</a>");
			}
		    
		    else 
		    {
		   		$("#choosecomparerform").append('<div><button id="choosecomparerbtn" class="btn btn-default">Next</button></div>');
		    }
	   }
	   else
	   {
	   		$("#comparisonbox").append('<form id="customtemplateform" enctype="multipart/form-data" method="post" name="customtemplate">');
	   		$("#customtemplateform").append('<label for="templatefileinput">Upload a Custom Template</label>');
	   		$("#customtemplateform").append('<span id="templatefilespan">');
	   		$("#templatefilespan").append('<span class="btn btn-default" id="templateinputbtn">');
	   		$("#templateinputbtn").append('<input id="templatefileinput" type="file" name="templatefileinput[]" required/>');
			$("#templatefilespan").append('<input type="submit" value="Upload" class="btn btn-default">');
			$("#comparisonbox").append('<p><a href="Template Instructions.zip">Template Instructions</a></p>');
	   }
	   $(this).remove();		
	});
	
	$(document).on('submit', '#customtemplateform', function (e) {
		e.preventDefault();
		var sizeOk = true;
		var typeOk = true;
		var problemfile = '';
		var inp = document.getElementById('templatefileinput');
	  	if(inp.files[0].size >= 2000000)
	  	{
			problemfile = inp.files[0].name;
			sizeOk = false;
	  	}
		if (sizeOk != true)
		{
			alert(problemfile + " is too big. Max size is 2MB");
			return false;
		}
		if(inp.files[0].type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
		{
			typeOk = false;
			problemfile = inp.files[0].name;
		}
		if (typeOk != true)
		{
			alert(problemfile + " is the wrong type. Must be .docx");
			return false;
		}
		
		var form = document.getElementById('customtemplateform');
		var form_data = new FormData(form);
		console.log(form_data);
	    $.ajax({
            url: 'templateupload.php', // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'POST',
            success: function(php_script_response){
            	console.log(php_script_response);
            	$("#customtemplateform").remove();
            	$("#comparisonbox").find('p').remove();
            	$("#comparisonbox").append('<p id="templateuplodmsg">The new template has been uploaded!</p>');
            }
		});
	});

	$(document).on('submit', '#choosecomparerform', function (e) {
		e.preventDefault();
		comparisons = {};
		grants = [];
		grantcount = 0;
		
		var comparergrant = $("#comparergrantselect").val();
		comparisons[comparergrant] = 'This is the current proposal.';
		grants[grantcount] = comparergrant;		//save the grant we're comparing in the object and increment counter
		grantcount++;
		
		$('.granttitle').each (function () {
			var compareegrant = $(this).text();
			
			$gtitle = $('.granttitle').filter( function (i) { return $(this).text() == compareegrant;});
			$tr = $gtitle.closest('tr');
			console.log("TR:" + $tr);
			var compareestatus = $tr.find('td.status').text();
			console.log(compareestatus);
			
			if (compareegrant != comparergrant && compareestatus != 'Completed' && compareestatus != 'Not Funded')
			{
				grants.push(compareegrant);		//store all of the other grants in the grants array (the comparer is in position 0)
			}
			console.log("grants array: " + grants);
		});	
		
		if(grants.length == 1)
		{
			$("#comparetoform").remove();
			$("#choosecomparerform").remove();
			$(".waiter").show();
			var data = [];
			for (i= 0; i<grants.length; i++) {
				$gtitle = $('.granttitle').filter( function (i) { return $(this).text() == grants[i];});
				console.log("gtit:");
				console.log($gtitle);
				$tr = $gtitle.closest('tr');
				console.log("tr:");
				console.log($tr);
				console.log($tr.find("td.granttitle").text());
				console.log($tr.find("span.grantagencyval").text());
				var grant = {};
				grant.name = $tr.find("td.granttitle").text();
				grant.status = $tr.find("td.status").text();
				grant.source = $tr.find("span.grantagencyval").text();
				grant.amount = $tr.find("span.amountnum").text();
				grant.piamount = $tr.find("span.piamountnum").text();
				grant.totamount = $tr.find("span.totamountnum").text();
				grant.totpiamount = $tr.find("span.totpiamountnum").text();
				grant.apersonmonths = $tr.find("span.apmonthnum").text();
				grant.cpersonmonths = $tr.find("span.cpmonthnum").text();
				grant.spersonmonths = $tr.find("span.spmonthnum").text();
				grant.awardnumber = $tr.find("td.awardnumber").text();
				grant.description = comparisons[grants[i]];
				grant.awardperiod1 = $tr.find("span.fromdate").text();
				grant.awardperiod2 = $tr.find("span.todate").text();
				grant.firstname = $(document).find("#firstname").text();
				grant.lastname = $(document).find("#lastname").text();
				grant.middlename = $(document).find("#middlename").text();
				grant.location = $tr.find("span.locationval").text();
				data.push(grant);			
			}
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
						template: templatesource,
					},
					success: function(data)
					{
						console.log("data: " + data);
						console.log("id: " + id);
						if ($(".waiter").is(":visible")) {		//make sure waiter is there in case someone gets bored and closes box before ajax callback
							$("#comparisonbox").append("<form action='download.php' method='post' id='downloadform'><input name='id' value='" + id + "' type='hidden'/><input name='filename' value='"+ comparergrant + " C&P Form' type='hidden'/><button type='submit' class='btn btn-default'>Download The File!</button></form>");
						} 
						$(".waiter").hide();
					}
				});
				return;
		}
		
		$(this).remove();
		
		$("#comparisonbox").append('<form id="comparetoform">');		
		
		var comparee = grants[grantcount];
		$gtitle = $('.granttitle').filter( function (i) { return $(this).text() == comparee;});
		$tr = $gtitle.closest('tr');
		var compareedescription = $tr.find('td.summary').text();			//do first comparison in this function
		
		$("#comparetoform").append('<textarea type="text" rows="2" style="width: 80%;" name="comparison">' + compareedescription + '</textarea>');
		$("#comparetoform").append('<label for="comparison">' + 'Add a line that shows how <strong>"' + grants[0] + '"</strong> compares to <strong>"' + comparee + '</strong>"</label>');
		$("#comparetoform").append('<input type="hidden" name="grantname" value="' + comparee + '">' );
		$("#comparetoform").append('<div><button id="nextcompareebtn" class="btn btn-default">Next Grant</button><div>');
		
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
			for (i= 0; i<grants.length; i++) {
				$gtitle = $('.granttitle').filter( function (i) { return $(this).text() == grants[i];});
				console.log("gtit:");
				console.log($gtitle);
				$tr = $gtitle.closest('tr');
				console.log("tr:");
				console.log($tr);
				console.log($tr.find("td.granttitle").text());
				console.log($tr.find("span.grantagencyval").text());
				var grant = {};
				grant.name = $tr.find("td.granttitle").text();
				grant.status = $tr.find("td.status").text();
				grant.source = $tr.find("span.grantagencyval").text();
				grant.amount = $tr.find("span.amountnum").text();
				grant.piamount = $tr.find("span.piamountnum").text();
				grant.totamount = $tr.find("span.totamountnum").text();
				grant.totpiamount = $tr.find("span.totpiamountnum").text();
				grant.apersonmonths = $tr.find("span.apmonthnum").text();
				grant.cpersonmonths = $tr.find("span.cpmonthnum").text();
				grant.spersonmonths = $tr.find("span.spmonthnum").text();
				grant.awardnumber = $tr.find("td.awardnumber").text();
				grant.description = comparisons[grants[i]];
				grant.awardperiod1 = $tr.find("span.fromdate").text();
				grant.awardperiod2 = $tr.find("span.todate").text();
				grant.firstname = $(document).find("#firstname").text();
				grant.lastname = $(document).find("#lastname").text();
				grant.middlename = $(document).find("#middlename").text();
				grant.location = $tr.find("span.locationval").text();
				data.push(grant);			
			}
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
						template: templatesource,
					},
					success: function(data)
					{
						console.log("data: " + data);
						console.log("id: " + id);
						if ($(".waiter").is(":visible")) {		//make sure waiter is there in case someone gets bored and closes box before ajax callback
							$("#comparisonbox").append("<form action='download.php' method='post' id='downloadform'><input name='id' value='" + id + "' type='hidden'/><input name='filename' value='" + grants[0] + " C&P Form' type='hidden'/><button type='submit' class='btn btn-default'>Download The File!</button></form>");
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
		
		$gtitle = $('.granttitle').filter( function (i) { return $(this).text() == comparee;});
		$tr = $gtitle.closest('tr');
		var compareedescription = $tr.find('td.summary').text();
		$(this).find('textarea[name="comparison"]').val(compareedescription);

		$(this).find('label').html('Add a line that shows how <strong>"' + grants[0] + '"</strong> compares to <strong>"' + comparee + '"</strong>');
	});

	$(document).on('submit', '#downloadform', function(){ 
    	$("#downloadpopup").hide();
    	$("#downloadform").remove();
    	$("#comparisonbox").hide();
    	$("#shield").hide();
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
			
		var okSubmit = true;		
				
		if ($("#grantname").val() == '')
		{
			$("#newgranterror").html('<p style="color: red;">You must include a name for the grant.</p><br><br>');
			okSubmit = false;
		}
		
		
		$('.granttitle').each( function () {
			if ($(this).text() == ($("#grantname").val())) {
				$("#newgranterror").html('<p style="color: red;">You may not have multiple grants with the same name.</p><br><br>');
				okSubmit = false;
			}
		});
		
		if (okSubmit == false)
		{
			return;
		}
					
		var data = {};
		
		data['awardnumber'] = $("#awardnumber").val();
		data['source'] = $('#source').val();
		data['name'] = $('#grantname').val();
		data['awardperiod1'] = $('#awardperiod1').val();
		data['awardperiod2'] = $('#awardperiod2').val();
		data['status'] = $('#status').val();
		data['apersonmonths'] = $('#apersonmonths').val();
		data['cpersonmonths'] = $('#cpersonmonths').val();
		data['spersonmonths'] = $('#spersonmonths').val();
		data['amount'] = $('#amount').val();
		data['piamount'] = $('#piamount').val();
		data['totamount'] = $("#totamount").val();
		data['totpiamount'] = $("#totpiamount").val();
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
		
		var okSubmit = true;
		
		if ($("#egrantname").val() == '')
		{
			$("#editgranterror").html('<p style="color: red;">You must include a name for the grant.</p><br><br>');
			okSubmit = false;
		}
		
		var grantstr = "grant" + $("#editgrantform").find("input[name='buttonnumber']").val();
		console.log("grantstr: " + grantstr);
		
		$('.granttitle').each( function () {
			console.log("trid: " + $(this).closest('tr').attr('id'));
			if (($(this).text() == $("#egrantname").val()) && ($(this).closest('tr').attr('id') != grantstr)) {
				$("#editgranterror").html('<p style="color: red;">You may not have multiple grants with the same name.</p><br><br>');
				okSubmit = false;
			}
		});
		
		if (okSubmit == false)
		{
			return;
		}
			
		var data = {};
		
		
		data['originalname'] = originalname;
		data['originalperiod1'] = originalperiod1;
		
		data['name'] = $('#egrantname').val();

		data['awardnumber'] = $("#eawardnumber").val();
		data['source'] = $('#esource').val();
		data['awardperiod1'] = $('#eawardperiod1').val();
		data['awardperiod2'] = $('#eawardperiod2').val();
		data['status'] = $('#estatus').val();
		data['apersonmonths'] = $('#eapersonmonths').val();
		data['cpersonmonths'] = $('#ecpersonmonths').val();
		data['spersonmonths'] = $('#espersonmonths').val();
		data['amount'] = $('#eamount').val();
		data['piamount'] = $('#epiamount').val();
		data['totamount'] = $('#etotamount').val();
		data['totpiamount'] = $('#etotpiamount').val();
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
			$('#newgrantbutton').show();
			$("#newcpform").show();
			$("#comparisonbox").hide();
			$("#filestorebox").hide();
			$("#downloadpopup").hide();
			$(".waiter").hide();
			$("#downloadform").remove();
			$("#deleteconfirmbox").hide();
			$(".deletebtn").show();
			$("#fileerror").html('');
			$("#filelist").html('');
			$("#fileinput").val('');
			$(".filewaiter").hide();
		}
	});

	
	
	$("#newgrantbutton").click(function(evt) {
		evt.stopPropagation();
		$("#newcpform").hide();		
		$(this).hide();
		console.log('hi');
		$("#newgrantpopup").show();
		$('#newgrantform').trigger("reset");
		$('#newgranterror').html('');
		$('#shield').show();
	    $("#junkdiv").height(0);
	    // $('html, body').animate({
	        // scrollTop: $("#newgrantpopup").offset().top
	    // }, 1000);
				
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
		
		$("#editgrantform").append('<input type="hidden" name="buttonnumber" value="' + buttonnumber + '"/>');
				
		$("#editgrantpopup").show();
		$('#editgranterror').html('');
		$grantdiv = $("#grant" + buttonnumber);
		console.log($grantdiv);
		$grantname = $grantdiv.find(".granttitle");
		originalname = $grantname.text();
		$("#egrantname").val($grantname.text());
		
		$awardnumber = $grantdiv.find(".awardnumber");
		$("#eawardnumber").val($awardnumber.text());
		
		$grantagency = $grantdiv.find(".grantagencyval");
		$("#esource").val($grantagency.text());


		$fromdate = $grantdiv.find(".fromdate");
		originalperiod1 = $fromdate.text();
		$("#eawardperiod1").val($fromdate.text());
		
		$todate = $grantdiv.find(".todate");
		$("#eawardperiod2").val($todate.text());
		
		$status = $grantdiv.find(".status");
		$("#estatus").val($status.text());
		
		$apmonths = $grantdiv.find(".apmonthnum");
		$("#eapersonmonths").val($apmonths.text());
		
		$cpmonths = $grantdiv.find(".cpmonthnum");
		$("#ecpersonmonths").val($cpmonths.text());
		
		$spmonths = $grantdiv.find(".spmonthnum");
		$("#espersonmonths").val($spmonths.text());
		
		$amount = $grantdiv.find(".amountnum");
		$("#eamount").val($amount.text());
		
		$piamount = $grantdiv.find(".piamountnum");
		$("#epiamount").val($piamount.text());
		
		$totamount = $grantdiv.find(".totamountnum");
		$("#etotamount").val($totamount.text());
		
		$totpiamount = $grantdiv.find(".totpiamountnum");
		$("#etotpiamount").val($totpiamount.text());
		
		$description = $grantdiv.find(".summary");
		$("#edescription").val($description.text());
		
		$location = $grantdiv.find(".location");
		$("#elocation").val($location.text());
		
		$('#shield').show();
		
		// $('html, body').animate({
	        // scrollTop: $("#editgrantpopup").offset().top
	    // }, 1000);	
	});//end edit click
	
	$(".deletebtn").click( function (e) {
		e.stopPropagation();
		
		$("#newgrantbutton").hide();
		$("#newcpform").hide();
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
				location.reload(true);
			}
		});
	});
	
	
});//end doc ready