var request= require("request");
var cheerio= require("cheerio");
var fs= require("fs");
var readline= require('readline');

const url= "https://wiprodigital.com";

exports.crawl= function(callback){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
    
            var siteMap= {
                linksUnderTheSameDomain: [],
                externalLinks: [],
                images: []
            };
    
            $("*[href]").each(function(){
                var link= $(this).attr('href');
    
                if( link.startsWith(url) ){
                    if(siteMap.linksUnderTheSameDomain.indexOf(link)== -1)
                        siteMap.linksUnderTheSameDomain.push(link);
                }
                else if( !link.startsWith('/') && !link.startsWith('#') ){
                    if(siteMap.externalLinks.indexOf(link)== -1)
                        siteMap.externalLinks.push(link);
                }
    
                if(link.endsWith('.jpeg') || link.endsWith('.jpg') || link.endsWith('.png') || link.endsWith('.gif') || link.endsWith('.tiff')){
                    if(siteMap.images.indexOf(link)== -1)
                        siteMap.images.push(link);
                }
    
            });
    
            $("*[src]").each(function(){
                var link= $(this).attr('src');
    
                if( link.startsWith(url) ){
                    if(siteMap.linksUnderTheSameDomain.indexOf(link)== -1)
                        siteMap.linksUnderTheSameDomain.push(link);
                }
                else if( !link.startsWith('/') && !link.startsWith('#') ){
                    if(siteMap.externalLinks.indexOf(link)== -1)
                    siteMap.externalLinks.push(link);
                }
    
                if(link.endsWith('.jpeg') || link.endsWith('.jpg') || link.endsWith('.png') || link.endsWith('.gif') || link.endsWith('.tiff')){
                    if(siteMap.images.indexOf(link)== -1)
                        siteMap.images.push(link);
                }
            });

            //logic to write to files
            if (!fs.existsSync('./siteMap')){
                fs.mkdirSync('./siteMap');
            }

            fs.writeFileSync('./siteMap/siteMap.txt', '');
    
            fs.appendFileSync('./siteMap/siteMap.txt', 'Links Under The Same Domain\n\n');
    
            siteMap.linksUnderTheSameDomain.forEach(function(link){
                fs.appendFileSync('./siteMap/siteMap.txt', link+'\n');
            });
    
            fs.appendFileSync('./siteMap/siteMap.txt', '\n\n\n');
    
    
            fs.appendFileSync('./siteMap/siteMap.txt', 'External Links\n\n');
    
            siteMap.externalLinks.forEach(function(link){
                fs.appendFileSync('./siteMap/siteMap.txt', link+'\n');
            });
    
            fs.appendFileSync('./siteMap/siteMap.txt', '\n\n\n');
    
    
            fs.appendFileSync('./siteMap/siteMap.txt', 'Images\n\n');
    
            siteMap.images.forEach(function(link){
                fs.appendFileSync('./siteMap/siteMap.txt', link+'\n');
            });
    
            fs.writeFileSync('./siteMap/siteMap.json', JSON.stringify(siteMap, null, 2));

            if(callback) callback("SUCCESS");
        }
        else{
            if(callback) callback("ERROR");
        }
    });
};