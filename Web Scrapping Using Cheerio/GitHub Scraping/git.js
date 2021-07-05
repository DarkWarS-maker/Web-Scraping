const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

request("https://github.com/topics",callback);
var arr=[];
function callback(err,res,html){
    if(!err){
       // fs.writeFileSync("git.html",html);
      var $=cheerio.load(html);
      var anchorTag=$(".no-underline.d-flex.flex-column.flex-justify-center");
      for(var i=0;i<anchorTag.length;i++){
          var url=$(anchorTag[i]).attr("href");
          arr.push(url);
         console.log("https://github.com/"+url);
         console.log("\n");
         request("https://github.com/"+url,getRepo);

      }
      if(arr.length==anchorTag.length){
          //fs.writeFileSync("finalData.json",JSON.stringify(arr));
      }


    }
}
function getRepo(err,res,html){
    if(!err){
        var $=cheerio.load(html);
        var anc=$("a.text-bold");
        for(var i=0;i<8;i++){
            console.log("https://github.com/"+$(anc[i]).attr("href"));
        }
        console.log("\n");
    }
}