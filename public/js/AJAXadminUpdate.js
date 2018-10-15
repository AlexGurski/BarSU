window.onload = () => {

}
function updateStatus(status){
  var xhr = new XMLHttpRequest();
  var body = 'status=' + encodeURIComponent(status)+
    '&id=' + String(document.getElementById('lastOrderId').innerText).trim();;
  xhr.open("POST", '/updateStatusOrder', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  console.log(body)
  xhr.send(body);
}
function changeStatus() {
  console.log('sfsd')
    var eID = document.getElementById("comboBox");
    var colorVal = eID.options[eID.selectedIndex].value;
    var colortxt = eID.options[eID.selectedIndex].text;
  document.getElementById('orderStatus').innerText='Статус заказа ' + colortxt;
updateStatus(colortxt)
}

function CallPrint(strid) {
  var prtContent = document.getElementById(strid);
  var prtCSS = '<link rel="stylesheet" href="/templates/css/template.css" type="text/css" />';
  var WinPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
  WinPrint.document.write('<div id="print" class="contentpane">'); WinPrint.document.write(prtCSS);
  WinPrint.document.write(prtContent.innerHTML); WinPrint.document.write('</div>'); WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
  prtContent.innerHTML=strOldOne;
}
