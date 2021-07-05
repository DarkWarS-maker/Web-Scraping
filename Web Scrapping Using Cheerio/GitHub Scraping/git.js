const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");
const { count } = require("console");


request("https://github.com/topics",callback);
var arr=[];

function callback(err,res,html){
    
    if(!err){
       // fs.writeFileSync("git.html",html);
      var $=cheerio.load(html);
      var anchorTag=$(".no-underline.d-flex.flex-column.flex-justify-center");
      var names=$(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
      for(var i=0;i<anchorTag.length;i++){
         
          var projectName=$(names[i]).text();
          let Namearr=projectName.split("\n").join("").split(" "); //we can also get name using substring
          projectName=Namearr[8];
          //console.log(Namearr);
          var url="https://github.com/"+$(anchorTag[i]).attr("href");
          //console.log(projectName);
          
          arr.push({
              "projectName":projectName,
              "projectUrl":url,
              "gitRepos":[]
          });
        // console.log("https://github.com/"+url);
        // console.log("\n");
         request(url,getRepo.bind(this,i));
        

      }
    
      
    //   if(arr.length==anchorTag.length){
    //       //fs.writeFileSync("finalData.json",JSON.stringify(arr));
    //   }


    }
}

function getRepo(idx,err,res,html){
    
    if(!err){
        var $=cheerio.load(html);
        var anc=$("a.text-bold");
        for(var i=0;i<8;i++){
            
           // console.log("https://github.com/"+$(anc[i]).attr("href"));
           var repoName=$(anc[i]).text();
            var repoUrl="https://github.com/"+$(anc[i]).attr("href");
            
            arr[idx]["gitRepos"].push({
                "RepoName":repoName,
                "RepoUrl":repoUrl,
                "issues":[]
                

            });
            
            var IssueUrl="https://github.com/"+$(anc[i]).attr("href")+"/issues";
           
            
           
           request(IssueUrl,getAllIssues.bind(this,idx,i));
        }
        
         
       
    }
}
var county=1;
function getAllIssues(idx,j,err,res,html){
    county++;
    if(!err){
        var $=cheerio.load(html);
       // fs.writeFileSync("issue.html",html)
        var headings=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log("\n");
        var TotalIssues=headings.length;
        //console.log("Total Issue "+TotalIssues);
        for(var i=0;i<8;i++){
            var issueName=$(headings[i]).text();
            var IssueUrl=$(headings[i]).attr("href");
            arr[idx]["gitRepos"][j]["issues"].push({
                "IssueName":issueName,
                "IssueUrl":IssueUrl
            })
            //console.log("Issue No. "+(i+1)+" "+ans);
        }
       // console.log("\n");
        
   
    }
    console.log(county);
    
    if(county==24){
        console.log(arr);
        fs.writeFileSync("gitFinalData.json",JSON.stringify(arr));
    }
}