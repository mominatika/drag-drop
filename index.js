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

	function handleDrop(event)
	{
		var data = event.dataTransfer,
		files= data.files;

		handleFiles(files);


	}

dropregion.addEventListener('drop',handleDrop,false);


function handleFiles(file)
{
	for(var i=0,length=file.length;i<length;i++)
	{

		
		if(validateImage(file[i]))
		{
			demo.innerHTML += file[i].name;
			previewAnduploadImage(file[i]);
		}

	}




}

function handleDrop(event)
{
var dt =event.dataTransfer,
	files =dt.files;
	if(files.length)
	{
		handleFiles(files);
	}
	else
	{
		  var html = dt.getData('text/html'),
            match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
            url = match && match[1];
 
 
 
        if (url) {
            uploadImageFromURL(url);
            return;
        }
	}

}

function uploadImageFromURL(url)
{
 	var img = new Image;
 	var c =document.createElement("canvas");
 	var ctx = c.getContext("2d");

 	img.onload =function(){

 			c.width = this.naturalWidth;     // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this,0,0);
            c.toBlob(function(blob){
            	handleFiles([blob]);


            },"images/png");


 	};
 	img.onerror = function(){
 		alert("error in uploading");
 	}
 	img.crossOrigin = "";
 	img.src=url;

}

function validateImage(image)
{
	// alert(image.type);
	var validtype = ['image/jpeg','image/png'];
	// var valid = validtype.indexOf(image.type);
	if(validtype.indexOf(image.type) === -1)
	{
		
		
		fakeInput.value ="";
		alert("only jpeg and png file is allowed");
		return false;
	}
	 var maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
        alert("File too large");
        return false;
    }

   return true;






}
function  previewAnduploadImage(image) 
{
	 var imgview = document.createElement("div");
	 imgview.className= "image-view";
	 imagepreviewregion.appendChild(imgview);

	var img = document.createElement("img");
    imgview.appendChild(img);
 	
 	var overlay = document.createElement("div");
    overlay.className = "overlay";
    imgview.appendChild(overlay);

	
	var reader = new FileReader(); 	

	reader.onload = function(e)
	{
		img.src = reader.result;
		// alert(e.target.result);
	}
	reader.readAsDataURL(image); 


}






