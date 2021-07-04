const fs=require("fs");
const request =require("request");
const cheerio =require("cheerio");


request("https://www.espncricinfo.com/series/south-africa-tour-of-west-indies-2021-1263140/west-indies-vs-south-africa-4th-t20i-1263154/full-scorecard",callback);

function callback(err,res,html){
    if(!err){
        var maxWickt=0;
         var maxWicBol;
         var url;
        
        fs.writeFileSync("MaxWickt.html",html);
        var $=cheerio.load(html);
        var allRows=$(".table.bowler tbody tr");
       // console.log(allRows.length);
        for(var i=0;i<allRows.length;i++){
            var col=$(allRows[i]).find("td");
            var wickCol=parseInt($(col[4]).text());
            if(wickCol>maxWickt){
               maxWickt=wickCol;
               maxWicBol=$(col[0]).text();
                url=$(col[0]).find("a").attr("href")
              // console.log(url);
             
              
            }

        }
        request("https://www.espncricinfo.com/"+url,getBirthDay);
        

        console.log(maxWickt);
        console.log(maxWicBol);
    }

}
var playerBirthDay;
function getBirthDay(err,res,html){
    if(!err){
        fs.writeFileSync("birthDay.html",html);
        var $=cheerio.load(html);
        var playerDetails=$("h5.player-card-description.gray-900");
        playerBirthDay=$(playerDetails[1]).text();
        console.log(playerBirthDay);

    }
}
