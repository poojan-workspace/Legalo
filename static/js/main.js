$(document).ready(function () {
    // Make all the buttons black by changing the class
    $('.progress').css("display", "none");
    $('.loader').css("display", "none");
    $(document).ready(function () {
        $('.tooltipped').tooltip({ html: true});
    });


    path = location.pathname.replace("/", "")
    // check if the location is like contract/contractId
    if (path.indexOf("contract") == -1) {
        $('.' + path + 'Path').addClass('active activePath')
    }

    // Get the current Participant
    curParUrl = "http://13.52.29.9:3000/api/system/ping"
    $.ajaxCallaf(curParUrl, "GET", "", function (output) {
        if (output.status) {
            currentIdentityFull = output.output.participant
            currentIdentity = currentIdentityFull.replace('org.example.basic.Person#', '');
            // Get the Account balance
            empurl = "http://13.52.29.9:3000/api/org.example.basic.Person"
            url = empurl + '/' + currentIdentity
            $.ajaxCallaf(url, "GET", "", function (output1) {
                if (output1.status) {

                    // Global variables accessible to any js file
                    // Current logged in user details
                    personId = output1.output.personId
                    firstName = output1.output.firstName
                    middleName = output1.output.middleName
                    lastName = output1.output.lastName
                    title = output1.output.title
                    // Contact Details
                    emailAddress = output1.output.contactDetails.emailAddress
                    mobileNumber = output1.output.contactDetails.mobileNumber
                    homeNumber = output1.output.contactDetails.homeNumber
                    // Address
                    street = output1.output.address.street
                    city = output1.output.address.city
                    country = output1.output.address.country
                    postalCode = output1.output.address.postalCode
                    // Account Balance
                    accountBalance = output1.output.accountBalance

                    $('#currentParticipant').text(output1.output.firstName + ' ' + output1.output.lastName)
                    $('#currentDesignation').remove()
                    $('#accountBalanceNav').append('<div class="chip pink-text">Account Balance: ' + output1.output.accountBalance + ' Tokens</div>')
                    $('.currentLoggedInLoader').css("display", "none")
                }
                else {

                }
            })
        }
        else {
            if (output.output.status == "500") {
                M.toast({ html: 'Upload your card.' })
                $('.loginGithub').remove()
                $('.currentLoggedInLoader').css("display", "none")
                $('#currentDesignation').append('<div class="chip uploadCard">Please Upload your card</div>')
                $('#currentDesignation').attr("href", "/uploadcard")
            }
            else {
                //$('.container').remove()
                M.toast({ html: 'Please log in and upload the card.' })
                $('#currentDesignation').append('<div class="chip loginGithub">Login with Google</div>')
                $('.currentLoggedInLoader').css("display", "none")
            }

        }
    })


    // Upload your card
    $(document).on("click", "#uploadCard", function () {

        var baseUrl = "http://13.52.29.9:3000/api/wallet/import";
        var data = new FormData();
        data.append('card', $('#formfile')[0].files[0])

        // Call the rest api endpoint for uploading a wallet
        $.ajax({
            url: baseUrl,
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (resp) {
                M.toast({ html: 'Uploaded Successfully!' })
                $(location).attr('href', "/");
            },
            error: function (resp) {
                M.toast({ html: 'Upload failed!' })
            },
        });
    })


})