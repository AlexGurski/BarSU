


let arrayArmor = [];

let mydate=window.document.getElementById("mydate");
let olddate=mydate.value;

let isChanged = function(){
  if(mydate.value!== olddate){
    olddate=mydate.value;
    return true;
  };
  return false;
};
mydate.addEventListener("blur", function(){
    if(isChanged()) {
    console.log(arrayArmor)
    let filterArmor = [];
          for (let i=0;i<arrayArmor.length;i++){
              if (arrayArmor[i].date===mydate.value){
                filterArmor.push(arrayArmor[i]);
              }
          }
    createArmor(filterArmor);
      }
});


  function applyArmor(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'adminArmor', true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        return;
      }
        var rez = JSON.parse(xhr.responseText);
        arrayArmor = rez;
    createArmor(rez);
    }
    xhr.send(null);
  }

        function createArmor(rez){
document.getElementsByClassName("armorDelete")[0].remove();

let armorDelete = document.createElement("div");
     armorDelete.className = 'armorDelete';
     armorDelete.id = 'fullArmor'
   document.getElementsByClassName("adminArmor")[0].appendChild(armorDelete);

          for (var i=rez.length-1; i >=0 ; i--){

          let fullArmor = document.createElement("div");
               fullArmor.className = 'fullArmor';
               fullArmor.id = 'fullArmor'
             document.getElementsByClassName("armorDelete")[0].appendChild(fullArmor);

             var a = document.createElement('a');
             a.target = '_blank';
                var linkText = document.createTextNode(rez[i]["_id"]);
                             a.appendChild(linkText);
             a.href = "/admin/armor/"+rez[i]._id;

             fullArmor.appendChild(a);

             var p1 = document.createElement('p');
               p1.innerHTML = "Дата бронирования: " + rez[i].date +' '+ rez[i].time
               fullArmor.appendChild(p1);

               var p2 = document.createElement('p');
                 p2.innerHTML = "Имя клиента: " + rez[i].name
                 fullArmor.appendChild(p2);

                 var p3 = document.createElement('p');
                   p3.innerHTML = "Номер телефона: " + rez[i].telephone
                   fullArmor.appendChild(p3);

                   var p4 = document.createElement('p');
                      p4.innerHTML = "Количество столиков: " + rez[i].table
                     fullArmor.appendChild(p4);

                     var p5 = document.createElement('p');
                       p5.innerHTML = "Комментарий: " + rez[i].text
                       fullArmor.appendChild(p5);
          }
        }

  applyArmor();
