// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();



Alloy.Globals.isAndroid = (Ti.Platform.osname=='android') ? true : false;
Alloy.Globals.isIOS = (Ti.Platform.osname=='iphone') ? true : false;
Alloy.Globals.header = {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzNjY4YzE4OWJhZTQ0ODkxYTVkMmY1ODNkMmZhOTljMjNhMDNjYTA5ODE0YWFlNzE4YTI5MjQ0YTFmYTYxODJjOThmNDljZTc2ZmM4MzI4In0.eyJhdWQiOiIxIiwianRpIjoiOTM2NjhjMTg5YmFlNDQ4OTFhNWQyZjU4M2QyZmE5OWMyM2EwM2NhMDk4MTRhYWU3MThhMjkyNDRhMWZhNjE4MmM5OGY0OWNlNzZmYzgzMjgiLCJpYXQiOjE1NjU4NjY3OTMsIm5iZiI6MTU2NTg2Njc5MywiZXhwIjoxNTk3NDg5MTkzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.EQHicGsNt7UeVemiKkC7XmrFS6cg8iwRQ7p-RKrgv1pncQ9FV5gxECipOWgJUE-2iz1px1QsWe75lVDxlpiWb5gocKoEfBOrz1mR46EgOm5u3lkhmTjQM_HZVohH9MJkCd5ujKy8-qowiskr5z4L5E7vIcDEvGJuXUBgWkCY0MMdF4g6Tk2YHHVxBSOUOnBtmYI0yb5sdYC-ekAgi4-fHUZhmEOdhR51dbl7BZQKSmwzuLvAtgp79pvgGNidEQzGZ2bQHbJsbwAMCLLIW4l9HyzLTHEZw8awuoX9SMoT1VGaYfte0ErsWwrMUlSXcG2VF20XPL_aI1zXKupKcWNuUSOfX61Fl-4651gR53JqhGrfFF3txJkrlKRjC2K9LYHEnsN1dOAbd23a9VP-VYoqb3YdMQ8gWQ4kKL7PVWVwr8YSnUwe0bFKiDX4AnQtkBWOU-mG4Don0gDUXkWO1rLrCdOgi1_1_s6P4vdaPL21QI4tFnN5NHbNT85zWZDK0neIGPdCROsDIw8mAa7BL_RkxWymhGpyv0YAuqcNZsKbbM40g8ouqwXdZQOxsBryDp5Hf8TfhdZVG0dKw4YiooU39Qo9_0Bf8Z5FbW1PfVF3R0LXQcKK-S_kDMsuGpRbFYt7jaDgn9-29F8HR4mCeQTx7Jxw0x8FO6p5LgOWHY0jC9A"
}
