$(document).ready(function(){
  var url = "datos.xlsx";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url , true);
  oReq.responseType = "arraybuffer";
  
  oReq.onload =  function(e){
    var info=readData();
    console.table(info);

    function readData(){
      var arraybuffer = oReq.response;
      //convierte los datos a cadena string
      var data = new Uint8Array(arraybuffer);
      var arr  = new Array();
      for(var i = 0; i!= data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      //Llamo al XSLX
      var workbook = XLSX.read(bstr, {type:'binary'});

      // Cuando viene algo en el archivo lo paso a JSON
      var firs_sheet_name = workbook.SheetNames[0];

      //Tomando la hoja de trabajos del excel
      var worksheet = workbook.Sheets[firs_sheet_name];
      var info=XLSX.utils.sheet_to_json(worksheet,{raw:true});

      return info;
    }
  }
  oReq.send();
});
