//
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