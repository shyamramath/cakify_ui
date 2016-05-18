function getParameterByName(name) {
    			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        		results = regex.exec(location.search);
    			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			function getQueryVariable(variable){
			    var query = window.location.search.substring(1);
			    var vars = query.split("&");
			    for (var i=0;i<vars.length;i++) {
			           var pair = vars[i].split("=");
			           if(pair[0] == variable){return pair[1];}
			    }
       			return(false);
			}

			function show(bakeryid,bakeryname){
				currentbakeryId=bakeryid;
				var localcategoryinfo=getEnpoint("bakery/"+bakeryid);
				$("#intro").hide();

				$.getJSON(localcategoryinfo, function(data){
               		var occationList = { target:data };
               		var template = _.template( $("#occation-list-section").text() );
               		$("#attach_occations_list").html(template(occationList));
               		selectedBakery=bakeryname;
					$("#bakeryNameSpan").text(selectedBakery);
					$("#bakeryNameInCustomize").text(selectedBakery);
					$("#selectaBakeryMessage").hide();
					$("#displaySelectedBakery").show();
					$("#cakeselect").show();
					$("#cakeselectsection").click();
					$("#cakeselectsection").show();
            	});
			}



			function viewCakesGalley(catId,bakeryId,bakeryUrl){
				var localendpointUrl=getEnpoint("cakes/"+catId+"/"+bakeryId);
				
				$.getJSON(localendpointUrl, function(data){
               		var srchresults = { target:data };
               		cakeinfojson=JSON.stringify(srchresults);
               		localStorage.setItem("dataCache",cakeinfojson);
               		$("#currentSelbakeryId").val(currentbakeryId);
               		var viewcakeurl=bakeryUrl+"?selectedBakery="+selectedBakery;
					$("#selectedBakeryId").val(selectedBakery);
					$("#view-cake-form").attr("action", viewcakeurl);
        			$("#viewCakeinfoGallery").click();
            	});
			}


			function getEnpoint(RESTmappingURL){
				var endpoint=domainurl+RESTmappingURL+"/";
				return  endpoint;
			}

			function isNumberKey(evt){
          		var charCode = (evt.which) ? evt.which : evt.keyCode;
          		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
             		return false;
             	}
          		return true;
       		}
			
			function validateEmail($email) {
  				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  				return emailReg.test( $email );
			}