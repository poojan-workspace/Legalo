$(document).ready(function () {
    // Get the contractId from the location
    contractId = location.pathname.replace("/contract/", "")

    // Get the contract details
    getContractUrl = "http://13.52.29.9:3000/api/org.example.basic.BusinessContract/" + contractId
    //start the loader
    $('.loader').css("display", "block");

    // ajax GET call
    $.ajaxCall(getContractUrl, "GET", "", function (output) {
        if (output.status) {
            out = output.output
            // Heading of the page with a contract name and balance
            $('.headingViewContract').text(out.contractTitle)
            $('.headingBalanceContract').text("Contract Balance: "+out.contractBalance)
            // Get the service provider information
            serviceProviderId = out.serviceProvider.replace('resource:org.example.basic.Person#', '')
            personGetUrl = "http://13.52.29.9:3001/api/org.example.basic.Person/" + serviceProviderId;
            $.ajaxCall(personGetUrl, "GET", "", function (output) {
                if (output.status) {
                    // Feed the output into the corresponing input fields
                    $('#sfirst_name').val(output.output.firstName)
                    $('#smiddle_name').val(output.output.middleName)
                    $('#slast_name').val(output.output.lastName)
                    $('#sstreetAddress').val(output.output.address.street)
                    $('#scity').val(output.output.address.city)
                    // $('#sstate').val(output.output.address.state)
                    $('#szipCode').val(output.output.address.postalCode)
                    $('#scountry').val(output.output.address.country)
                    $('#smobileNumber').val(output.output.contactDetails.mobileNumber)
                    $('#semail').val(output.output.contactDetails.emailAddress)
                }
                else {
                }
            })
            // Get the buyer information
            buyerId = out.buyer.replace('resource:org.example.basic.Person#', '')
            personGetUrl = "http://13.52.29.9:3001/api/org.example.basic.Person/" + buyerId;
            $.ajaxCall(personGetUrl, "GET", "", function (output) {
                if (output.status) {
                    // Feed the output into the corresponing input fields
                    $('#bfirst_name').val(output.output.firstName)
                    $('#bmiddle_name').val(output.output.middleName)
                    $('#blast_name').val(output.output.lastName)
                    $('#bstreetAddress').val(output.output.address.street)
                    $('#bcity').val(output.output.address.city)
                    // $('#sstate').val(output.output.address.state)
                    $('#bzipCode').val(output.output.address.postalCode)
                    $('#bcountry').val(output.output.address.country)
                    $('#bmobileNumber').val(output.output.contactDetails.mobileNumber)
                    $('#bemail').val(output.output.contactDetails.emailAddress)

                }
                else {
                }
            })
            // Stages of contract
            $.each(out.stages, function (i) {
                if( out.stages[i].finished == false ){
                    finVar = "Stage incomplete"
                }
                else {
                    finVar = "Stage Completed"
                }
                if( out.stages[i].paid == false ){
                    paidVar = "Stage not funded"
                }
                else {
                    paidVar = "Stage funded"
                }
                $(".stagesInViewForm").append('<li class="collection-item card" id="'+ out.stages[i].stageId +'">\
                <div class="card-content">\
                <span class="card-title" style="color:#e91e63"><b>'+ out.stages[i].stageName + '</b> &nbsp\
                <a href=""><div class="chip  right fundEnd" id="'+ out.stages[i].stageId +'-fund">Fund Stage</div></a>\
                <a href=""><div class="chip white right endStage" id="'+ out.stages[i].stageId +'-end">End Stage</div></a>\
                <div class="chip white right">Amount:&nbsp'+ out.stages[i].stageAmount + '</div></span><br><br>\
                <p style="color: black">'+ out.stages[i].stageDescription + '<br><br><br>\
                <div style="color:grey; display:inline-block">Start Date:&nbsp</div><div style="display:inline-block">'+ out.stages[i].dateOfStart+'</div><br>\
                <div style="color:grey; display:inline-block">End Date:&nbsp</div><div style="display:inline-block">'+ out.stages[i].dateOfCompletion+'</div>\
                </p></div>\
                <div class="card-action">\
                <div class="chip"> '+ finVar +'</div>\
                <div class="chip"> '+ paidVar +'</div>\
                </div>\
                </li>')
            })
            // Right to cancel and additional provisions
            $("#RTC" + out.rightToCancel).prop("checked", true);
            //$("#AP"+out.additionalProvisions.includeState).prop("checked", true);
            $("#additionalProvisions").val(out.additionalProvisions.description);
            // Disputes and Assignement
            $("#Disp" + out.disputes).prop("checked", true);
            $("#As" + out.assignment).prop("checked", true);
            // Dates of Contract
            $("#dateOfContract").val(out.dateOfContract);
            $("#dateOfExpiry").val(out.dateOfExpiry);
            // Contract Title and description
            $("#contractTitle").val(out.contractTitle);
            $("#additionalDescription").val(out.additionalDescription);


        }
        else {
            M.toast({ html: 'Not able to retrieve the contract details' })
        }
        $('.loader').css("display", "none");
    })


    // Fund a stage
    $(document).on("click", ".fundEnd", function () {
        stageId = parseInt($(this).attr("id").replace("-fund",""))
        fundStageUrl = "http://13.52.29.9:3000/api/org.example.basic.fundAStage"
        postDataFundStage = {
            "businessContract": "resource:org.example.basic.BusinessContract#"+out.businessContractId,
            "stageId": stageId
        }
        // start the loader
        $('.loader').css("display", "block");

        // ajax POST call
        $.ajaxCallaf(fundStageUrl, "POST", JSON.stringify(postDataFundStage), function (output) {
            if(output.status){
                M.toast({ html: 'Stage Funded' })
                location.reload()
            }
            else {
                M.toast({ html: 'Not able to fund the stage' })
            }
            // end the loader
            $('.loader').css("display", "none");
            
        }) 
        
    })

    // end a stage
     // Fund a stage
     $(document).on("click", ".endStage", function () {
        stageId = parseInt($(this).attr("id").replace("-end",""))
        endStageUrl = "http://13.52.29.9:3000/api/org.example.basic.endAStage"
        postDataEndStage = {
            "businessContract": "resource:org.example.basic.BusinessContract#"+out.businessContractId,
            "stageId": stageId,
            "dateOfCompletion": "End Date"
        }
        // start the loader
        $('.loader').css("display", "block");

        // ajax POST call
        $.ajaxCallaf(endStageUrl, "POST", JSON.stringify(postDataEndStage), function (output) {
            if(output.status){
                M.toast({ html: 'Stage Ended' })
                location.reload()
            }
            else {
                M.toast({ html: 'Not able to end the stage' })
            }
            // end the loader
            $('.loader').css("display", "none");
            
        }) 
        
    })

});