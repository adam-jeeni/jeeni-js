
var jeeni = jeeni || {
    co: {
        uk: {}
    }        
};
/*
jeeni.FieldSet = (function(fieldSet){
	this.fieldSet = fieldSet;
	this.replaceTagsWidthDom = function(){
		var children = fieldSet.children();
	}
});
*/

jeeni.FieldSetList = (function(fieldSetListValue){
	var fieldSetList = fieldSetListValue;
	var jeeniTags = new Array();
		
	var populateChildTags = function(){
		console.log("populateChildTags");
		if(fieldSetList){
			var length = fieldSetList.length;
			for(var i = 0; i < length; i++){
				var tag = fieldSetList[i];
				var jTag = $(tag);
				var children = jTag.children();
                cacheJeeniTags(children);
                drawJeeniTags();
				console.log(i);
			}
		}
	};

    var drawJeeniTags = function(){
        var count = jeeniTags.length;
        for(var i = 0; i < count; i++){
            var jeeniTag = jeeniTags[i];
            jeeniTag.build();
        }
    };

	var cacheJeeniTags = function(childrenArray){
		if(childrenArray){
			var size = childrenArray.length;
            for(var i = 0; i < size; i++){
                var child = childrenArray[i];
                if(child.localName == "textfield"){
                    console.log("textField");
                    var textField = new jeeni.TextField(child);
                    var count = jeeniTags.length;
                    jeeniTags[count] = textField;
                    console.log(count);
                } else {
                    console.log("Other");
                }
            }
		}
	};
	
	var processTextFieldTags = function(){
	  var size = jeeniTags.length;
		for(var i = 0; i < size; i++){
		  var tag = jeeniTags[i];
			var jtag = $(tag);
			console.log(jtag);
		}
	};
	
	var processAll = function(){
		populateChildTags();
		processTextFieldTags();
		console.log("Populated child tags");
	};
	
	return {
	  processAll:processAll
	};
});


jeeni.TextField = (function(tagElement){
        var jeeniTag = tagElement;

		var privateMethod = function(){
				console.log("IN: privateMethod");
		};

		var publicMethod = function(){
				console.log("IN: publicMethod: " + tagId);
		};
		var constructTextField = function (){
            var tag = $(jeeniTag);

            var id = tag.attr("id");
            var label = tag.attr("label");
            var width = tag.attr("width");
            var type = tag.attr("type");
            if(!type) {type = "text";}

            var inputTag = $("<input class='textInput' style='width:" + width + ";'id='" + id + "' type='" + type + "'/>");
            var labelTag = $("<div class='labelText'>" + label + ":</div>");
            //labelTag.width(label.length * 6 + 10);
            var enclosingDivTag = $("<div></div>");
            enclosingDivTag.append(labelTag);
            enclosingDivTag.append(inputTag);
            enclosingDivTag.insertAfter(tag);
            tag.remove();
            console.log("done");
		};

		return {
				build:constructTextField,
					foo:function(){
								console.log("Public method") ; 
							}
		 };
});

jeeni.allTags = function(tagName){
	var fields = $(tagName);
	var tagArray = new Array();
	if(fields){
		var count = fields.length;
		for(var i = 0; i < count; i++){
			tagArray[i] = fields[i];
		}
	}
	return tagArray;
}

//http://stackoverflow.com/questions/504803/how-do-you-create-a-method-for-a-custom-object-in-javascript

var divBoxes = new Array();
$(document).ready(function() {

// Find all the FieldSets 
var fieldSets = jeeni.allTags("fieldSet");
// process contents of each field set.
var fieldSetList = new jeeni.FieldSetList(fieldSets);
fieldSetList.processAll();
//Replace tags with generated dom objects
fieldSetList.replaceTagsWithDom();

// Delete field sets
	var fields = jeeni.allTags("TEXTFIELD");
	var count = fields.length;

	for(var i = 0; i < count; i++){
		var textField = fields[i];
		textField.build();
	}
});

/*
function test(){
  var labelText = "Test Input";
	
  var inputTag = $("<input class='textInput' style='width:200px;'id='abcId' />");
	var labelTag = $("<div class='labelText'>" + labelText + ":</div>");
	var labelWidth = labelText.length;
	labelTag.width(labelWidth * 6 + 10);
	var enclosingDivTag = $("<div></div>");
	enclosingDivTag.append(labelTag);
	enclosingDivTag.append(inputTag);
	
  $("#testDiv").html(enclosingDivTag);
}

function createBoxes(boxes){
	if(boxes){
		var boxesCount = boxes.length;
		for(var i = 0; i < boxesCount; i++){
			var box = boxes[i];
			createBox(box, i);
		}
		
		for(var i = 0; i < boxesCount; i++){
			var box = $(boxes[i]);
			box.remove();
		}
	}
}
*/
/*
function resizeBoxes(boxes){
  if(boxes){
		var boxCount = boxes.length;
		for(var i = 0; i < boxCount; i++){
			var box = boxes[i];
			var childElements = box.children();
			var maxSize = getWidestChildSize(childElements);
			box.width(maxSize);
		}
	}
}

function getWidestChildSize(childElements){
	var widest = 0;
	if(childElements){
		if(childElements){
			var childCount = childElements.length;
			for(var i = 0; i < childCount; i++){
				var child = $(childElements[i]);
				var width = child.width();
				if(width > widest){
					widest = width;
				}
				console.log(child);///////////////////
			}
		}
	}
	return widest;
}
*/

/*
function createBox(inBox, i){
	var box = $(inBox);
	var innerHtml = box.html();
	var boxDiv = $("<div id='" + i + "' style='border:1px solid darkgray;padding:10px;'></div>");
	boxDiv.insertAfter(box);
	boxDiv.html(innerHtml);
	
	divBoxes[i] = boxDiv;
	console.log(boxDiv);
}

function createFields(fields){
	var fieldsCount = fields.length;
	
	if(fieldsCount){
		for (var i=0;i < fieldsCount;i++){
			var field = fields[i];
			var fieldId = field.getAttribute("id");
			
			constructTextField(fieldId);
		}
	}
}
function constructTextField(id){
	var tag = $("#"+id);
	
	var label = tag.attr("label");
	var width = tag.attr("width");
	var type = tag.attr("type");
	if(!type) {type = "text";}
	
	var newTag = $("<div><div class='labelText'>" + label + ":</div><input class='textInput' style='width:" + width + ";'id='" + id + "' type='" + type + "'/></div>");
	newTag.insertAfter(tag);
	var children = newTag.children();
	var width1 = $(children[0]).width();
	var width2 = $(children[1]).width();
//	var width1 = $()[0].width();
	newTag.width(width1 + width2 + 10);
	tag.remove();
	console.log("done");
}
*/
