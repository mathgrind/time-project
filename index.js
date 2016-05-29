var http = require("http");
var url = require("url");

var server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    var pathname = url.parse(request.url).pathname;
    pathname = pathname.replace(/%20/g, " ");
    var date = getDate(pathname);
    response.end(jsonifyDate(date));
});

function getDate(dateString) {
    var isNumeric = !new RegExp("[^0-9]").test(dateString);
    if (isNumeric) {
        date = new Date(parseInt(dateString));
    } else {
        date = new Date(dateString);
    }
    return date;
}

function jsonifyDate(date) {
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];
    if (date.toString()==='Invalid Date') {
        return JSON.stringify({unix:null, natural:null});
    } else {
        var dateObj = {unix: date.getTime(), natural: months[date.getMonth()]
                                                      + " " + date.getDate()
                                                   + ", " + date.getFullYear()};
        return JSON.stringify(dateObj);
    }
}

server.listen(80);
