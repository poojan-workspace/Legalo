$(document).ready(function () {
    // Get all the contracts
    getContractsUrl = "http://13.52.29.9:3000/api/org.example.basic.BusinessContract/"
    $('.progress').css("display", "block");
    // ajax GET call
    $.ajaxCall(getContractsUrl, "GET", "", function (output) {
        if (output.status) {
            $.each(output.output.reverse(), function(i){
              $('.collection').append('<li class="collection-item card">\
              <div class="card-content">\
              <span class="card-title contractTitleList"><b>'+ output.output[i].contractTitle +'</b> &nbsp\
              <div class="chip right seeDetails"><a style="color:white" href="/contract/'+ output.output[i].businessContractId +'">See Details</a></div>\
              <div class="chip white right">Contract Balance:&nbsp'+ output.output[i].contractBalance +'</div>\
              </span>\
              <p style="color: black"> '+ output.output[i].additionalDescription +'<br><br><p style="color:grey; display:inline-block">Service Provider:&nbsp&nbsp&nbsp</p><p style="color:black; display:inline-block">'+ output.output[i].serviceProvider.replace('resource:org.example.basic.Person#','') +'</p> <br>\
              <p style="color:grey; display:inline-block">Buyer:&nbsp&nbsp&nbsp</p><p style="color:black; display:inline-block">'+ output.output[i].buyer.replace('resource:org.example.basic.Person#','') +'</p>\
              <br> <p style="color:grey; display:inline-block"> Start Date:&nbsp&nbsp&nbsp</p><p style="color:black; display:inline-block">'+ output.output[i].dateOfContract +'</p>\
              <br> <p style="color:grey; display:inline-block"> Expiry Date:&nbsp&nbsp&nbsp</p><p style="color:black; display:inline-block">'+ output.output[i].dateOfExpiry +'</p>\
              </p>\
              </div>\
            </li>')
            })
        }
        else {

        }
        $('.progress').css("display", "none");
    })
});