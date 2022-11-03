$(document).ready(function () {

    // Initializations of various objects
    $(document).ready(function () {
        $('.tabs').tabs();
    });

    $(document).ready(function () {
        $('.datepicker').datepicker();
    });

    $(document).on("click", ".buttonToNextTab", function () {
        var nextTab = $(this).attr("id").replace("-next", "")
        $('.tabs').tabs('select', nextTab);
    })

    $(document).on("click", ".buttonToPrevTab", function () {
        var prevTab = $(this).attr("id").replace("-prev", "")
        $('.tabs').tabs('select', prevTab);
    })

    allServices = []

    // Insert all the buyer fields from the global variables
    $('#bfirst_name').val(firstName)
    $('#bmiddle_name').val(middleName)
    $('#blast_name').val(lastName)
    $('#bstreetAddress').val(street)
    $('#bcity').val(city)
    // $('#sstate').val(output.output.address.state)
    $('#bzipCode').val(postalCode)
    $('#bcountry').val(country)
    $('#bmobileNumber').val(mobileNumber)
    $('#bemail').val(emailAddress)

    counterStageId = 0;

    // Add a stage
    $(document).on("click", ".addStage", function () {
        // Get all the values from the form first
        stageId = counterStageId
        stageName = $('#stageName').val()
        stageAmount = $('#stageAmount').val()
        stageDesp = $('#stageDesp').val()
        dateOfStart = $('#dateOfStart').val()
        dateOfCompletion = $('#dateOfCompletion').val()
        // Add it to the global json object
        serviceJsonObject = {
            "$class": "org.example.basic.Stages",
            "stageId": stageId,
            "stageName": stageName,
            "stageDescription": stageDesp,
            "stageAmount": parseInt(stageAmount, 10),
            "finished": false,
            "paid": false,
            "dateOfStart": dateOfStart,
            "dateOfCompletion": dateOfCompletion
        };
        allServices.push(serviceJsonObject);
        // Add a collection card of each stage
        $(".stagesInCreateForm").append('<li class="collection-item">\
        <span class="title" style="color:#e91e63"><b>'+ stageName + '</b></span> &nbsp\
        <div class="chip right">'+ stageAmount + '</div>\
        <div class="chip right">'+ dateOfStart + '</div>\
        <div class="chip right">'+ dateOfCompletion + '</div>\
        <p style="color: grey">'+ stageDesp + '<br>\
        </p>\
        </li>')
        counterStageId ++; 
    })

    // Fetch the details of the service provider
    $(document).on("click", "#fetchServicePro", function () {
        first_name = $('#sfirst_name').val();
        // url for the call
        personGetUrl = "http://13.52.29.9:3001/api/org.example.basic.Person/" + first_name;
        $('.progress').css("display", "block");
        // ajax GET call
        $.ajaxCall(personGetUrl, "GET", "", function (output) {
            if (output.status) {
                // Feed the output into the corresponing input fields
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
                M.toast({ html: 'Not Able to fetch details' })
            }
            $('.progress').css("display", "none");
        })

    })


    $(document).on("click", ".submitContract", function () {
        // Service Provider Information
        serviceProviderId = $('#sfirst_name').val()
        // Buyer Information
        buyerId = firstName
        // Services and Payment
        servicesObjList = allServices
        // Special Provisions
        rightToCancel = $("input[name='group3']:checked").val();
        additionprovisionsIS = $("input[name='group1']:checked").val();
        additionalProvisionsDesp = $("#additionalProvisions").val()
        // Final Details
        disputes = $("input[name='disputesRadio']:checked").val();
        assignment = $("input[name='assignmentRadio']:checked").val();
        dateOfContract = $("#dateOfContract").val()
        dateOfExpiry = $("#dateOfExpiry").val()
        contractTitle = $("#contractTitle").val()
        contractDesp = $("#contractDesp").val()
        var d = new Date();
        var n = d.getTime();

        // Url for posting
        postCreatContractUrl = "http://13.52.29.9:3000/api/org.example.basic.BusinessContract"
        // Post body
        postBodyCreateContract =  {
            "$class": "org.example.basic.BusinessContract",
            "businessContractId": n,
            "contractTitle": contractTitle,
            "additionalDescription":contractDesp,
            "buyer": "resource:org.example.basic.Person#"+buyerId,
            "serviceProvider": "resource:org.example.basic.Person#"+serviceProviderId,
            "rightToCancel": rightToCancel,
            "additionalProvisions": {
                "$class": "org.example.basic.AdditionalProvisions",
                "includeState": additionprovisionsIS,
                "description": additionalProvisionsDesp
            },
            "disputes": disputes,
            "assignment": assignment,
            "dateOfContract": dateOfContract,
            "dateOfExpiry": dateOfExpiry,
            "stages": allServices,
            "totalAmount": 0,
            "rightToInspection": {
                "$class": "org.example.basic.RightToInspection",
                "rightToinspect": rightToCancel,
                "daysBefore": "string",
                "buyerOptions": "string"
            },
            "contractBalance": 0
        } 

        // Start the loader
        $('.loader').css("display", "block");
        
        // ajax POST call
        $.ajaxCallaf(postCreatContractUrl, "POST", JSON.stringify(postBodyCreateContract), function (output) {
            if(output.status) {
                $(location).attr('href', "/");
            }
            else {
                M.toast({ html: 'Not Able to create contract' })
            }

            // close the loader
            $('.loader').css("display", "none");
        })

    })


})