$("#generate_certificate").click(function(){
  var name = $("#certificate_firstname").val()
  var lastName = $("#certificate_lastname").val()
  console.log(name + " " + lastName)
  if(name!="" && name!= null && lastName !="" && lastName != null){
  $.post( "pdfgenerator.php", { name: name, lastName: lastName })
  .done(function( data ) {
    //alert( "Data Loaded: " + data );
    console.log("data: " + data.data.url)
    //e.preventDefault();  //stop the browser from following
    download(data.data.url,'certificado');

  }).fail(function(data)  {
    console.log(data)
    if(data.code!=200){
    alert("Sorry. Server unavailable. " + data.url);
  }else{
    alert("PPPP " + data.url);
  }
});
}else{
  alert("Fill it")
}
});

function download(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total)*100;
            //yourShowProgressFunction(percentComplete);
        }
    };

    xhr.onload = function(event) {
        if (this.status == 200) {
            _saveBlob(this.response, fileName);
            $('#generate_certificate').prop('disabled',true);
        }
        else {
            //yourErrorFunction()
        }
    };

    xhr.onerror = function(event){
        //yourErrorFunction()
    };

    xhr.send();
}


function _saveBlob(response, fileName) {
    if(navigator.msSaveBlob){
        //OK for IE10+
        navigator.msSaveBlob(response, fileName);
    }
    else{
        _html5Saver(response, fileName);
    }
}

function _html5Saver(blob , fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    document.body.removeChild(a);
}
