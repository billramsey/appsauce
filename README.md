# appsauce

Javascript Selenium Library based on Promises

Installation:  
npm install  

to run demo use:  
node test.js  

##usage:  
var seleniumRequest = require('./seleniumLibrary');  

// Pass connection url and setup options to the request.
var sel = seleniumRequest('http://localhost:4444', {desiredCapabilities: {browserName: 'firefox'}});

//Each option is a Promise.  

// Creates a browser and session.  
connect()

// Navigate to the page  
navigate(url)

// Return the title  
title()

// close the browser  
close()


###Example in Use

var seleniumRequest = require('./seleniumLibrary');

var seleniumOptions = {desiredCapabilities: {browserName: 'firefox'}};  

var sel = seleniumRequest('http://localhost:4444', seleniumOptions);  

sel.connect()  
.then(() => sel.navigate('http://google.com'))  
.then(() => sel.title())  
.then((title) => {  
  // do your assertion here  
  console.log('Assert', title, 'equals GOOGLE');  
})  
.then(() => sel.find({using: 'class name', value: 'gsfi'}))  
.then((element) => console.log('ele', element))  
.then(() => sel.close())  
.then(() => console.log('done'))  
.catch((err) => console.log(err));   

### See JSONPW documents for functions these map too.  
https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
