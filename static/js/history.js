$(document).ready(function () {
 
    $('.modal').modal();
    $('#modal-history').modal('open');
    setTimeout(function () { $('#modal-history').modal('close'); }, 2000);

    $(document).ready(function () {
        $('.collapsible').collapsible();
    });
    

    // dictionary for understanding the trasaction type
    traAbb = {
        "org.example.basic.endAStage": "Stage Ended",
        "org.example.basic.fundAStage": "Stage Funded",
        "AddAsset": "Business Contract Created",
        "AddParticipant": "New User Added",
        "ActivateCurrentIdentity": "New Identity activated",
        "IssueIdentity": "New identity issued",
        "StartBusinessNetwork": "Business Network Started"
    }

    // get all the history
    // Historian Url
    hisUrl = "http://13.52.29.9:3000/api/system/historian"

    // Ajax call
    $.ajaxCall(hisUrl, "GET", "", function (output) {
        if (output.status) {
            // Sort the historian data as per the timestamp
            output.output.sort(function (a, b) {
                var dateA = new Date(a.transactionTimestamp), dateB = new Date(b.transactionTimestamp);
                return dateA - dateB;
            })
            // modify the view 
            $.each(output.output.reverse(), function (i) {
                blockNumber = Object.keys(output.output).length - i
                current_datetime = new Date(output.output[i].transactionTimestamp)
                formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
                $('.colHistory').append('<li>\
                <div class="row card valign-wrapper white hoverable">\
                <div class="col m10 valign-wrapper">\
                    <div class="collapsible-header left valign-wrapper">\
                        <i class="material-icons left">play_arrow</i><h5>Block-'+ blockNumber + '</h5>\
                    </div>\
                </div>\
                <div class="col m2 z-depth-1" style="background:#e4e4e4;width:12%">\
                    <b class="right" style="color:#e91e63">'+ formatted_date + '</b>\
                </div>\
            </div>\
            <div class="collapsible-body white">\
                <ul class="collection">\
                    <li class="collection-item"><b>ID</b> : '+ output.output[i].transactionId + '</li>\
                    <li class="collection-item"><b>Transaction Type</b> : <div class="chip">\
                    '+ traAbb[output.output[i].transactionType.replace("org.hyperledger.composer.system.", "")] + '</div></li>\
                    <li class="collection-item"><b>Participant Invoking</b> :\
                    '+ output.output[i].participantInvoking + '</li>\
                    <li class="collection-item"><b>Identity Used</b> : '+ output.output[i].IdentityUsed + '</li>\
                    <li class="collection-item"><b>Time Stamp</b> :<div class="chip">\
                    '+ formatted_date + '</div></li>\
                </ul>\
            </div>\
        </li>')
            })
        }
        else {
            M.toast({ html: 'Error in retrieving history!!!' })
        }
    })

    // Refresh the blockchain
    $(document).on("click", ".refreshHistory", function () {
        location.reload()
    })
})