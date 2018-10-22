var crawler= require('./crawler');
var fs= require('fs');

crawler.crawl(function(status){
    if(status== "SUCCESS")
        console.log("Sitemap successfully written to files siteMap/siteMap.txt and siteMap/siteMap.json");
    else
        console.log("Error in populating siteMap. Please check your network connection");
});