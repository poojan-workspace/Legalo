$.ajaxCall = function(url, method, data, handleData) {
    var settings = {
        "async": true,
        "crossDomain": false,
        "url": url,
        "method": method,
        "contentType": "application/json",
        "data": data,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            handleData({"status": true, "output": response});
        },
        error: function(response) {
            handleData({"status": false, "output": response});
        }
    };
    
    $.ajax(settings);
}


$.ajaxCallaf = function(url, method, data, handleData) {
    var settings = {
        "async": false,
        "crossDomain": false,
        "url": url,
        "method": method,
        "contentType": "application/json",
        "data": data,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            handleData({"status": true, "output": response});
        },
        error: function(response) {
            handleData({"status": false, "output": response});
        }
    };
    
    $.ajax(settings);
}