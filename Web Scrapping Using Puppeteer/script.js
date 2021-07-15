const puppy = require("puppeteer");

// async function main() {
//   let browser = await puppy.launch({
//     headless: false,
//     defaultViewport: false,
//   });
//   //browser.close();

//   let tabs = await browser.pages();
//   let tab = tabs[0];
//   await tab.goto("https://www.hackerrank.com/auth/login");
//   const email = "sohefod526@advew.com";
//   const pass = "yad8er0smd";
//   await tab.type("#input-1", email);
//   await tab.type("#input-2", pass);
//   await tab.click(
//     ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
//   ); //click statement not wait for loading

//   await tab.waitForSelector("#base-card-1-link", { visible: true });
//   await tab.click("#base-card-1-link");

//   await tab.waitForSelector("#base-card-1-link", { visible: true });
//   await tab.click("#base-card-1-link");
//   await tab.waitForSelector('a[data-attr2="warmup"]', { visible: true });
//   await tab.click('a[data-attr2="warmup"]');
//   await tab.waitForSelector(".js-track-click.challenge-list-item", {
//     visible: true,
//   });
//   var problems = await tab.$$(".js-track-click.challenge-list-item"); //$$ take all element related to all class return arr $only for first index

//   var problemsUrl = [];
//   for (var i = 0; i < problems.length; i++) {
//     let url = await tab.evaluate(function (ele) {
//       return ele.getAttribute("href");
//     }, problems[i]);
//     problemsUrl.push(url);
//   }
//   for (var i = 0; i < problemsUrl.length; i++) {
//     await solveChallenge("https://www.hackerrank.com" + problemsUrl[i], tab);
//   }
// }

const id = "sohefod526@advew.com";
const password = "yad8er0smd";
async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector("#base-card-1-link", {visible: true});
    await tab.click("#base-card-1-link");
    await tab.waitForSelector('a[data-attr1="warmup"]', {visible: true});
    await tab.click('a[data-attr1="warmup"]');
    await tab.waitForSelector(".js-track-click.challenge-list-item", {visible: true})
    let problems = await tab.$$(".js-track-click.challenge-list-item");
    let problemUrls = [];
    for(let i = 0; i < problems.length; i++) {
        let url = await tab.evaluate(function(ele) {
            return ele.getAttribute("href");
        }, problems[i]);
        problemUrls.push(url);
    }

    for(let i = 0; i < problemUrls.length; i++) {
        await solveChallenge("https://www.hackerrank.com/" + problemUrls[i],tab);
    }
    await browser.close();
}

async function solveChallenge(url) {
  let problemUrl = url.replace("?", "/problem?");
  let editorialUrl = url.replace("?", "/editorial?");
  console.log(editorialUrl);
  await tab.goto(editorialUrl);

  var language=tab.$$(".hackdown-content h3");
  for(var i=0;i<language.length;i++){
      var languageName=await tab.evaluate(function(ele){
          return ele.textContent;

      },language[i])
      console.log(languageName);
  }
}
main();
