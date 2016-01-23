var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
// var a = webdriverio.remote(options)
// for ( var key in a ) {
    // console.log(key + ' --- ' + a[key] )
// }

var results = { ready : null }
var areWeDoneYet = function(results){
    if ( --results.ready === 0 ){
        finish()
    }
}
var finish = function(){
    console.log(results)
}

var getCupcakeLorem = function(results){

    webdriverio
        .remote(options)
        .init()
        .url('http://cupcakeipsum.com')
        .click('#generate_button').waitForExist('#cupcake_ipsum p')
        .getText('#cupcake_ipsum p').then(function(value){
            results.cupcakeIpsum = value[0]
        })

        .end().then(function(){
            areWeDoneYet(results)
        });
}

var jobs = []
jobs.push(getCupcakeLorem)

results.ready = jobs.length

for ( var job = 0; job < jobs.length; job++ ){
    jobs[job](results)
}