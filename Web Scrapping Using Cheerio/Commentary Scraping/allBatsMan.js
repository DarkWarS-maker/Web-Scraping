const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

request("https://www.espncricinfo.com/series/south-africa-tour-of-west-indies-2021-1263140/west-indies-vs-south-africa-4th-t20i-1263154/full-scorecard",callback);

function callback(err,res,html){
    var arr=[];
    if(!err){
        fs.writeFileSync("allBatsMan.html",html);
        var $=cheerio.load(html);
        var allBatsMan=$(".batsman-cell")
        for(var i=0;i<allBatsMan.length;i++){
            var name=$(allBatsMan[i]).find("a").text();
            var url=$(allBatsMan[i]).find("a").attr("href");
            arr.push({
               "name":name,
              "url": "https://www.espncricinfo.com/"+url
            });
        }
        

    }
    console.log(arr);
}