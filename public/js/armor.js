window.onload = () => {


document.getElementById('newId').value = makeId();
  let mydate=window.document.getElementById("mydate");
  let free=window.document.getElementById("free");
  let olddate=mydate.value;
  var y = new Date().getFullYear()
var m = new Date().getMonth() + 1;
var d = new Date().getDate();
m=m<10?'0'+m:m;
d=d<10?'0'+d:d;
let a = y+'-'+m+'-'+d;
    mydate.value = a;

   d++;
   d=d<10?'0'+d:d;
   a = y+'-'+m+'-'+d;

   mydate.min = a;
   m++;
   m=m<10?'0'+m:m;
   m=m>12?'01':m;
   a = y+'-'+m+'-'+d;

  mydate.max = a;

  let isChanged = function(){
    if(mydate.value!== olddate){
      olddate=mydate.value;
      return true;
    };
    return false;
  };
        mydate.addEventListener("blur", function(){
          if(isChanged())

          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/armorFree', true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
              console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
              return;
            }
              var rez = JSON.parse(xhr.responseText);
                console.log(rez);
                let rezultCount = 0;
                        for (let i=0;i<rez.length;i++){
                          if (rez[i].date === mydate.value )
                          rezultCount+=parseInt(rez[i].table);
                        }
                      free.innerHTML = "Свободно " + (15 - rezultCount )+' столиков';
                          if ((15 - rezultCount )<1){
                              console.log(15 - rezultCount);
                            document.getElementById('button').disabled='true';

                          } else {
                            document.getElementById('button').disabled=0;
                          }
            }
        xhr.send(null);
        });
}

function makeId() {
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 2; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
  }
