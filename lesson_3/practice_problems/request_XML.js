// 1
let request = new XMLHttpRequest();

request.open("GET", "https://api.github.com/repos/rails/rails");

request.send();

// 2.
request.responseText; // body of response
