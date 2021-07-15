const fs=require("fs");
const request=require("request");
const cheerio =require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/match-results",callBack);
var iplResult=[];
function callBack(err, res,html){
    if(!err){
        //fs.writeFileSync("iplMatch.html",html);
        const $=cheerio.load(html);
        var allMatchesStatus=$(".match-info.match-info-FIXTURES");
        var allMatchesLinks=$(".match-info-link-FIXTURES");
      
        var iplResult=[];
        var county=0;
        for(let i=0;i<allMatchesStatus.length;i++){
            county++;
          
            var div=$(allMatchesStatus[i]).find("div");
            var status=$(div[0]).text();
           
            var Teams=$(allMatchesStatus[i]).find("div.teams p");

       
            var T1=$(Teams[0]).text();
            var T2=$(Teams[1]).text();
            var result=$(allMatchesStatus[i]).find("div.status-text").text();
           
           
            
            if(status=='result'){
                iplResult.push({
                   
                    "Team1":T1,
                    "Team2":T2,
                    "Result":result,
                    "ScoreCard URL":url
                });
                var url="https://www.espncricinfo.com/"+$(allMatchesLinks[i]).attr("href");
               
               
              

            }
            else{
                iplResult.push({
                    "Team1":T1,
                    "Team2":T2,
                    "Status":"Match postponed"
                });
            }
         
            
        }
        if(county==allMatchesStatus.length){
         console.log(iplResult);
        }
    }
}

