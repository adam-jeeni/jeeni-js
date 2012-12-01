var jeeni = jeeni || {
    co: {
        uk: {}
    }        
};

jeeni.ClassName = function(value){
	var privateProperty = value;
	
	var method1 = function (){
		console.log("method1 "  + privateProperty);
		method2();
	};
	
	var method2 = function (){
		console.log("method2: " + privateProperty);
	};
	
	return {
		foo1 : method1
	};
};


$(document).ready(function() {
	var newObject = new jeeni.ClassName("Test");
	var newObject2 = new jeeni.ClassName("Test2");
	newObject.foo1();
	newObject2.foo1();
	console.log("Done");
});