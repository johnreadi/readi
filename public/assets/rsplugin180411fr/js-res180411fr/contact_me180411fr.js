/* Custom 180411fr Contact Form Script with recaptcha2 by Steve Riches - RichoSoft Squared - (C) 2018 - All Rights Reserved */
/* April 2018 - www.richosoft2.co.uk */
$(function() {
  $('input[type=text]').each(function(){
  if($(this).prop('required')==false || $(this).prop('required')=='undefined') {
  $(this).removeAttr('data-validation-required-message');
  }
  else
  {
	  $(this).css("border-color","#2c2323");
	  $(this).css("borderWidth","2px");
  }
  });
  $('select').each(function(){
  if($(this).prop('required')==false || $(this).prop('required')=='undefined') {
  $(this).removeAttr('data-validation-required-message');
  }
  else
  {
	  $(this).css("border-color","#2c2323");
	  $(this).css("borderWidth","2px");
  }
  });
  $('textarea').each(function(){
  if($(this).prop('required')==false || $(this).prop('required')=='undefined') {
  $(this).removeAttr('data-validation-required-message');
  }
  else
  {
	  $(this).css("border-color","#2c2323");
	  $(this).css("borderWidth","2px");
  }
  });
	  $('#email').css("border-color","#2c2323");
	  $('#email').css("borderWidth","2px");


    $("#contactForm input,#contactForm select,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
        },
        submitSuccess: function($form, event) {
            event.preventDefault();
			var thefiles=$("#filelist").html();
			if(thefiles=="" || thefiles===null){
			thefiles="|na|"; }
			var sendto = $("#to").html();
			if( $('#selectdate-div').length ){
			var selectdate = $("#selectdate").val();
			var selectdatename = $("#selectdate").attr('placeholder');
			}else{var selectdate="|na|";
			var selectdatename = "|na|";}
			if( $('#selectdate2-div').length ){
			var selectdate2 = $("#selectdate2").val();
			var selectdatename2 = $("#selectdate2").attr('placeholder');
			}else{var selectdate2="|na|";
			var selectdatename2 = "|na|";}
			if( $('#message-div').length ){
			var message = $("#message").val();
			var messagename = $("#message").attr('placeholder');
			}else{var message="|na|";
			var messagename = "|na|";}
			if( $('#selectpeops-div').length ){
			var selectpeops = $("#selectpeops").val();
			var selectpeopsname = $("#selectpeops").attr('placeholder');
			}else{var selectpeops="|na|";
			var selectpeopsname = "|na|";}
			if( $('#selectrtype-div').length ){
			var selectrtype = $("#selectrtype").val();
			var selectrtypename = $("#selectrtype").attr('placeholder');
			}else{var selectrtype="|na|";
			var selectrtypename = "|na|";}
			if( $('#gender-div').length ){
			var gender = $("input:radio[name ='gender']:checked").val();
			}else{var gender="|na|";}
			if( $('#subject-div').length ){
			var subject=$("#subject").val();
			}else{var subject="|na|";}
			if( $('#address1-div').length ){
			var address1=$("#address1").val();
			}else{var address1="|na|";}
			if( $('#address2-div').length ){
			var address2=$("#address2").val();
			}else{var address2="|na|";}
 			if( $('#city-div').length ){
			var city=$("#city").val();
			}else{var city="|na|";}
 			if( $('#county-div').length ){
			var county=$("#county").val();
			}else{var county="|na|";}
 			if( $('#country-div').length ){
			var country=$("#country").val();
			}else{var country="|na|";}
 			if( $('#optcheck-div').length ){
				var optcheck=$('input[name=optcheck]:checked').val();
			}else{var optcheck="|na|";}
 			if( $('#postcode-div').length ){
			var postcode=$("#postcode").val();
			}else{var postcode="|na|";}
 			if( $('#dropdwn-div').length && $('#dropdwn').prop('multiple')==true){
			var dropdwnx=$( "#dropdwn" ).val() || [];
			var dropdwn=dropdwnx.join( ", " );
			}else if( $('#dropdwn-div').length && $('#dropdwn').prop('multiple')==false){
			var dropdwn=$( "#dropdwn" ).val();
			}else{var dropdwn="|na|";}
 			if( $('#company-div').length ){
			var company=$("#company").val();
			}else{var company="|na|";}
 			if( $('#mobile-div').length ){
			var mobile=$("#mobile").val();
			}else{var mobile="|na|";}
 			if( $('#copyto').length ){
			var copyto=$("#copyto").html();
			}else{var copyto="|na|";}
 			if( $('#websiteurl').length ){
			var websiteurl=$("#websiteurl").val();
			}else{var websiteurl="|na|";}
 			if( $('#facebookurl').length ){
			var facebookurl=$("#facebookurl").val();
			}else{var facebookurl="|na|";}
 			if( $('#linkedinurl').length ){
			var linkedinurl=$("#linkedinurl").val();
			}else{var linkedinurl="|na|";}
			if( $('#phone-div').length ){
			var phone=$("#phone").val();
			}else{var phone="|na|";}
			var name = $("input#name").val();
            var email = $("input#email").val();
 			if( $('#redirectafter').length ){
			var redirectafter=$("#redirectafter").html();
			}else{var redirectafter="|na|";}
            var firstName = name;
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
			document.getElementById("submitbutton").style.visibility="hidden";
			$('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>" + firstName + ", Merci de patienter pendant l&#39;envoi du message...");
                    $('#success > .alert-danger').append('</div>');
            $.ajax({
                url: "assets/rsplugin180411fr/mail-res180411fr/contact_me180411fr.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
					messagename: messagename,
					redirectafter:redirectafter,
                    selectdate: selectdate,
					selectdatename:selectdatename,
                    selectdate2: selectdate2,
					selectdatename2:selectdatename2,
					selectpeops:selectpeops,
					selectpeopsname:selectpeopsname,
					selectrtype:selectrtype,
					selectrtypename:selectrtypename,
					sendto: sendto,
					subject: subject,
					address1: address1,
					address2: address2,
					city: city,
					county: county,
					country: country,
					postcode: postcode,
					mobile: mobile,
					company: company,
					gender: gender,
					copyto: copyto,
					thefiles: thefiles,
					websiteurl: websiteurl,
					facebookurl: facebookurl,
					linkedinurl: linkedinurl,
					dropdwn: dropdwn,
					optcheck:optcheck,
					captcha: grecaptcha.getResponse()
                },
                cache: false,
                success: function(data) {
                    var data1=JSON.parse(data);
					data2=data1.response;
					if(data2=="2"){
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Votre message a bien été envoyé. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");
					$('#cancelclose').html('Close');
					$('#contactForm').trigger("reset");
					if(redirectafter !="|na|"){
						location.href=redirectafter;
					}
					}
					else if (data2=="8"){
					$('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger')
                        .append("<strong>Error Captcha - Merci de réessayer ! </strong>");
                    $('#success > .alert-danger')
                        .append('</div>');
                    //$('#contactForm').trigger("reset");
					document.getElementById("submitbutton").style.visibility="visible";
					}
					else if (data2=="5"){
					$('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger')
                        .append("<strong>CURL non installé ! </strong>");
                    $('#success > .alert-danger')
                        .append('</div>');
                    //$('#contactForm').trigger("reset");
					document.getElementById("submitbutton").style.visibility="visible";
					}
					else if (data2=="7"){
					$('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger')
                        .append("<strong>L&#39;envoi du message a échoué ! </strong>");
                    $('#success > .alert-danger')
                        .append('</div>');
                    //$('#contactForm').trigger("reset");
					document.getElementById("submitbutton").style.visibility="visible";
					}
					else{
					$('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger')
                        .append("<strong>Il manque des champs obligatoires, merci de réessayer ! </strong>");
                    $('#success > .alert-danger')
                        .append('</div>');
                    //$('#contactForm').trigger("reset");
					document.getElementById("submitbutton").style.visibility="visible";
					}
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>" + firstName + ", Il semble que le serveur ne réponde pas, merci d ebien vouloir réessayer plus tard !");
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


$('#name').focus(function() {
    $('#success').html('');
});
