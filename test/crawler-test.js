var expect= require('chai').expect; 
var fs= require('fs');

var crawler= require('../crawler');

describe('test cases for web-crawler', function(){

    it('should create directory "siteMap" and files "siteMap.json" and "siteMap.txt" in that directory', function(done){

        crawler.crawl(function(){
            expect(fs.existsSync('./siteMap')).to.be.true;
            expect(fs.existsSync('./siteMap/siteMap.json')).to.be.true;
            expect(fs.existsSync('./siteMap/siteMap.txt')).to.be.true;
            done();
        });
    });

    it('siteMap.json file should have keys "linksUnderTheSameDomain", "externalLinks" and "images"', function(done){
        crawler.crawl(function(){
            fs.readFile('./siteMap/siteMap.json', function(err, data){
                expect(err).to.not.exist;
                expect(JSON.parse(data)).to.be.an('object').that.has.all.keys('linksUnderTheSameDomain', 'externalLinks', 'images');
                done();
            });
        });
    });

    it('in "siteMap.json" file, "linksUnderTheSameDomain", "externalLinks" and "images" should be arrays', function(done){

        crawler.crawl(function(){
            fs.readFile('./siteMap/siteMap.json', function(err, data){
                expect(err).to.not.exist;
                expect(JSON.parse(data)).to.be.an('object').that.has.all.keys('linksUnderTheSameDomain', 'externalLinks', 'images');
                expect(JSON.parse(data).linksUnderTheSameDomain).to.be.an('array');
                expect(JSON.parse(data).externalLinks).to.be.an('array');
                expect(JSON.parse(data).externalLinks).to.be.an('array');
                done();
            });
        });
    });

    it('in "siteMap.json" file, "linksUnderTheSameDomain" array should contain "https://wiprodigital.com/who-we-are" and "https://wiprodigital.com/join-our-team"', function(done){

        crawler.crawl(function(){
            fs.readFile('./siteMap/siteMap.json', function(err, data){
                expect(err).to.not.exist;
                expect(JSON.parse(data)).to.be.an('object').that.includes.key('linksUnderTheSameDomain');
                expect(JSON.parse(data).linksUnderTheSameDomain).to.be.an('array').that.includes.members(["https://wiprodigital.com/who-we-are", "https://wiprodigital.com/join-our-team"]);
                done();
            });
        });
    });

    it('in "siteMap.json" file, "externalLinks" array should contain "https://www.linkedin.com/company/wipro-digital" and "https://www.facebook.com/WiproDigital/"', function(done){

        crawler.crawl(function(){
            fs.readFile('./siteMap/siteMap.json', function(err, data){
                expect(err).to.not.exist;
                expect(JSON.parse(data)).to.be.an('object').that.includes.key('externalLinks');
                expect(JSON.parse(data).externalLinks).to.be.an('array').that.includes.members(["https://www.linkedin.com/company/wipro-digital", "https://www.facebook.com/WiproDigital/"]);
                done();
            });
        });
    });

    it('in "siteMap.json" file, "images" array should contain "https://s17776.pcdn.co/wp-content/uploads/2016/08/Fav_icon_144x144.png" and "https://s17776.pcdn.co/wp-content/themes/wiprodigital/images/logo.png"', function(done){

        crawler.crawl(function(){
            fs.readFile('./siteMap/siteMap.json', function(err, data){
                expect(err).to.not.exist;
                expect(JSON.parse(data)).to.be.an('object').that.includes.key('images');
                expect(JSON.parse(data).images).to.be.an('array').that.includes.members(["https://s17776.pcdn.co/wp-content/uploads/2016/08/Fav_icon_144x144.png", "https://s17776.pcdn.co/wp-content/themes/wiprodigital/images/logo.png"]);
                done();
            });
        });
    }); 

    it('siteMap.txt file should contain text "Links Under The Same Domain", "External Links" and "Images"', function(done){

        crawler.crawl(function(){

            fs.readFile('./siteMap/siteMap.txt', function(err, data){
                expect(err).to.not.exist;
                expect(data.toString()).to.be.a('string').that.includes("Links Under The Same Domain");
                expect(data.toString()).to.be.a('string').that.includes("External Links");
                expect(data.toString()).to.be.a('string').that.includes("Images");
                done();
            });
        });
    });

    it('siteMap.txt file should contain text "https://wiprodigital.com/who-we-are", "https://wiprodigital.com/join-our-team", "https://www.linkedin.com/company/wipro-digital", "https://www.facebook.com/WiproDigital/", "https://s17776.pcdn.co/wp-content/uploads/2016/08/Fav_icon_144x144.png" and "https://s17776.pcdn.co/wp-content/themes/wiprodigital/images/logo.png"', function(done){
        
    crawler.crawl(function(){
        
            fs.readFile('./siteMap/siteMap.txt', function(err, data){
                expect(err).to.not.exist;
                expect(data.toString()).to.be.a('string').that.includes("https://wiprodigital.com/who-we-are");
                expect(data.toString()).to.be.a('string').that.includes("https://wiprodigital.com/join-our-team");
                expect(data.toString()).to.be.a('string').that.includes("https://www.linkedin.com/company/wipro-digital");
                expect(data.toString()).to.be.a('string').that.includes("https://www.facebook.com/WiproDigital/");
                expect(data.toString()).to.be.a('string').that.includes("https://s17776.pcdn.co/wp-content/uploads/2016/08/Fav_icon_144x144.png");
                expect(data.toString()).to.be.a('string').that.includes("https://s17776.pcdn.co/wp-content/themes/wiprodigital/images/logo.png");
                done();
            });
        });
    });
});