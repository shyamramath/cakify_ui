jQuery(document).ready(function($){

			
			var action= getParameterByName('action');
			currentbakeryId= getParameterByName('bakeryId');
			selectedCake 		= getParameterByName('cakeName');
			selectedBakery 		= getParameterByName('bakerySelected');
			selectedCakePrice 	= getParameterByName('cakePrice');
			selectedCakeImage 	= getParameterByName('cakeimage');
			eggless 			= getParameterByName('eggoption');
			totalCalculated 	= getParameterByName('totalCalculated');
			noofcakes 			= getParameterByName('noofcakes');
			kilograms 			= getParameterByName('kilos');

			console.log("action=="+action);
			

			var cakeinfojson;
			
			$("#showWelcomeSection").click();

			
			var sitehit=getEnpoint("sitehit");
			$.getJSON(sitehit, function(data){
               		console.log("site hit access loggged ");
            });
			
			var bakeryEndpoint=getEnpoint("bakery");
			$.getJSON(bakeryEndpoint, function(data){
               		var bakeryList = { target:data };
               		var template = _.template( $("#bakery-list-section").text() );
               		$("#attach-bakery-section").html(template(bakeryList));
            });


			if(action=="bakery"){
			    $("#intro").hide();
			    $("#fillBakerySection").show();
			 	$("#bakery").show();
			 	$("#fillBakerySection").click();
			}else if (action=='cake') {
				show(currentbakeryId,currentbakeryId);
			}


			$(".continueTo_bakery" ).click(function() {
			 	$("#fillBakerySection").show();
			 	$("#bakery").show();
			 	$("#fillBakerySection").click();
			});



			 $( ".bakerysel" ).click(function() {
				selectedBakery=$(this).attr("data-bakeryname");
				$("#bakeryNameSpan").text(selectedBakery);
				$("#bakeryNameInCustomize").text(selectedBakery);
				$("#selectaBakeryMessage").hide();
				$("#displaySelectedBakery").show();
				$("#cakeselectsection").click();
				$("#cakeselect").show();
			});
			
			if(selectedCake!== '' && selectedCakePrice!=='' ){
			    $("#displaySelectCakeAlert").hide();
			    $("#intro").hide();
			    $("#displaySelectedCake").show();

			    var jsonData = {cakeImage:selectedCakeImage,cakeName:selectedCake,selectedCakePrice:selectedCakePrice,selectedBakery:selectedBakery};
			    var template = _.template( $("#cake-selection-summary").text() );

			    
            	
            	$("#DetailsRightPanel").html(template(jsonData));
			    $("#cakeNameSpan").text(selectedCake);
			    $("#cakeNameInCustomize").text(selectedCake);
			    $("#cakePriceInCustomize").text(selectedCakePrice);
			    $("#bakeryNameInCustomize").text(selectedBakery);
			    $("#customize").show();
			    $("#fillDetailSecction").click();
			    $("#fillDetailSecction").show();

			}
			

			$( ".cutimizeinfo" ).click(function() {
				messageoncake=$("#messageOnCake").val();
				if(messageoncake!== ''){
					$("#cakecustomizeValError").hide();
					$("#delivery").show();
					$("#fillDeliverySection").click();

					//get future dates from
					var futureDates=getEnpoint("cakeutils/futuredates");
					$.getJSON(futureDates, function(data){
               			$(data).each(function(){
	                    	var option = $('<option />');
	                    	option.attr('value', this.date).text(this.expandedDate);
	                    	$('#deliveryDateId').append(option);
                		});
            		});

				}else{
					$("#cakecustomizeValError").show();
				}
			});

			$(".deliveryAddressinfo" ).click(function() {				
				
				name=$("#name").val();
				email=$("#email").val();
				moblephone=$("#mobile").val();
				landline=$("#landline").val();
				deliveryAddress=$("#deliveryAddress").val();
				deliveryModeSelected=$('#deliveryoptionselId').val();
				deliveryDate=$('#deliveryDateId').val();
				deliveryCharges=$('#deliveryLocationId').val();
				
				
				if( !validateEmail(email)) { 
					alert("Please enter a valid email id");
					$("#deliveryValError").show();
				}else{
					if(name!== '' && deliveryAddress!== '' && email!='' && moblephone !='' && deliveryDate!='' ){
						
						$("#finalbakeryName").text(selectedBakery);
						$("#finalCakeName").text(selectedCake);
						$("#finalCakePrice").text(selectedCakePrice);
						$("#finalMessageOnCake").text(messageoncake);
						$("#finalYourName").text(name);
						$("#finalYourEmail").text(email);
						$("#finalYourAddress").text(deliveryAddress);
						$("#finalMobile").text(moblephone);
						$("#finalLandLine").text(landline);
						$("#finalDeliveryDate").text(deliveryDate);
						$("#finalCheckOutPrice").text(totalCalculated);
						$("#deliveryValError").hide();
						$("#paymentsection").show();
						$("#filPaymentSection").click();

					}else{
						$("#deliveryValError").show();
					}
				}
			});

			

			$(".ordersave" ).click(function() {
				$("#submit-cake-order-btn").click();
					setTimeout(function() { 
						$('#savestatusid').val(saveResponseCode).trigger('input');
						if(saveResponseCode='SUCCESS'){
							$("#filPaymentSection").click();
						}}, 3000);
			});

			
			$(".viewcakesgallery" ).click(function() {
					console.log(" going to view cakes galery ");
					var viewcakeurl="index-lens.html?selectedBakery="+selectedBakery;
					$("#viewCakeGalleryId").attr("href", viewcakeurl);
					$("#selectedBakeryId").val(selectedBakery);
	        		$("#viewCakeinfoGallery").click();
			});


			$(".cancelOrdernow" ).click(function() {
					$("#bakery").hide();
					$("#cakeselect").hide();
					$("#paymentsection").hide();
					$("#intro").hide();
					$("#canceltheorderandexit").click();
					$("#canceltheorderandexit").show();
			});


			$(".makeyourpayment").click(function(){
				//Start the ajax polling for payment received from now .
				var url="http://malabarhangouts.com/online/instamojo/callback/api/ajax/1/"+currentorderId;
				setInterval(function() {
					ajaxPollingCounter++;
					console.log(ajaxPollingCounter);
					var limit=10;
					if(ajaxPollingCounter<limit){
						$.ajax({ type : "GET",url :url,success : function(obj) {
        						console.log(obj);
        						if(obj=='success'){
        							console.log(' Transaction succesful');
        							ajaxPollingCounter=10;
        							$("#completedTracsactionSection").show();
									$("#completedTracsactionSection").click();
									$("#paymentCompletedSection").show();
									$('#paymentstatusid').val('PAYMENT_DONE').trigger('input');
        						}
	    					},error : function() { 
	    						// exception here
	    						console.log("Error occured while ajax polling ");
	    					}
						});
					}else{
						console.log("Counter expired");
						$("#instamojopaymentSection").hide();
						$("#paymentTimedoutMessage").show();
					}

				},30000);

				$("#paymentsection").hide();
				$("#filpaymentProcessSection").show();
				$("#filpaymentProcessSection").click();
				$("#paymentProcessSection").show();
				
			});


			$("#mojopaymentbuttonupdate" ).click(function() {
				var template = _.template( $("#instamojo-payment-button").text() );
            	$("#attach_instamojoPaymentButton").html( template(orderDetailsJson));
            	console.log(JSON.stringify(orderDetailsJson));
			});

});