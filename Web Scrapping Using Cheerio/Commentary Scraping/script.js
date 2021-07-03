const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/south-africa-tour-of-west-indies-2021-1263140/west-indies-vs-south-africa-4th-t20i-1263154/ball-by-ball-commentary", callback);

function callback(err, res, html) {
    if (!err) {
        fs.writeFileSync("script.html", html);
        var $ = cheerio.load(html);
        var commentary = $(".match-comment-short-text");
        for (var i = 0; i < commentary.length; i++) {
            console.log($(commentary[i]).text());
        }


    }
   
}