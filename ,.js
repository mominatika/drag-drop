var dropregion = document.getElementById("drop-region") ,
	 imagepreviewregion =document.getElementById("image-preview");
var demo =	document.getElementById("demo");


var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept ="images/*";
fakeInput.name ="file";
fakeInput.multiple =true;

dropregion.addEventListener("click",function(){
	fakeInput.click();
});

fakeInput.addEventListener("change",function(){
			var file = fakeInput.files;
			handleFiles(file);

});
function preventdefault(event)
{
	event.preventDefault();
		 event.stopPropagation();

}
dropregion.addEventListener('dragenter',preventdefault,false);
dropregion.addEventListener('dragleave',preventdefault,false);
dropregion.addEventListener('dragover',preventdefault,false);
dropregion.addEventListener('drop',preventdefault,false);

function handleFiles(file)
{
	var i;
	var length = file.length;
	// var name = file[0].name;
	// demo.innerHTML = name;
	for(i=0;i<length;i++)
	{
	
		var name = file[i].name;
		demo.innerHTML +=name;		
		
			
	}

}




