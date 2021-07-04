const fs=require("fs");
const request =require("request");
const cheerio =require("cheerio");

request("https://www.espncricinfo.com/series/south-africa-tour-of-west-indies-2021-1263140/west-indies-vs-south-africa-4th-t20i-1263154/full-scorecard",callback);

function callback(err,res,html){
    if(!err){
        var maxWickt=0;
        var maxWicBol;
        fs.writeFileSync("MaxWickt.html",html);
        var $=cheerio.load(html);
        var allRows=$(".table.bowler tbody tr");
       // console.log(allRows.length);
        for(var i=0;i<allRows.length;i++){
            var col=$(allRows[i]).find("td");
            var wickCol=$(col[4]).text();
            if(wickCol>maxWickt){
               maxWickt=wickCol;
               maxWicBol=$(col[0]).text();
            }

        }
        console.log(maxWickt);
        console.log(maxWicBol);
    }
}