$(document).ready(function() {
	$("#fileuploader").uploadFile({
		url:"assets/rsplugin180411fr/php/upload.php",
		maxFileSize:(parseInt($("#mFS").html()) * 1048576),
		maxFileCount:parseInt($("#nFS").html()),
		showPreview:true,
		showDelete:true,
		acceptFiles: ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx",
		fileName:"myfile",
		returnType: "json",
		allowedTypes: "jpg,jpeg,gif,png,doc,docx,pdf,xls,xlsx",
		deleteCallback: function(data,pd){
		for(var i=0;i<data.length;i++)
		{
         $.post("assets/rsplugin180411fr/php/delete.php",{op:"delete",name:data[i]},
        function(resp, textStatus, jqXHR)
        {
            alert("File Deleted"); 
			var tfile=resp +"|";
			document.getElementById("filelist").innerHTML=(document.getElementById("filelist").innerHTML).replace(tfile, "");
        });
		}        
		pd.statusbar.hide(); //You choice to hide/not.
		},
		onSuccess:function(files,data,xhr){
		document.getElementById("filelist").innerHTML=document.getElementById("filelist").innerHTML + files + "|";
		}
		
	});
});