const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

request("https://www.espncricinfo.com/series/south-africa-tour-of-west-indies-2021-1263140/west-indies-vs-south-africa-4th-t20i-1263154/full-scorecard",callback);
//request("https://www.espncricinfo.com/series/pakistan-women-in-west-indies-2021-1267314/west-indies-women-vs-pakistan-women-3rd-t20i-1267324/full-scorecard",callback);

function callback(err,res,html){
    if(!err){
       // fs.writeFileSync("playerOftheMatch.html",html);
        var $=cheerio.load(html);
        var bestPlayer=$(".best-player-name").text();
       console.log(bestPlayer);

    }
}