
document.getElementById('_id').value = makeid();
setInterval(() => {
  OrderAdmin()
},10000);

function OrderAdminMenu(){

  fetch('/sendMenu')
                  .then(function(response) {

                    return response.json();
                   })
                   .then(menu => {

                     let rezult = [];
                          for (let i=0;i<menu.length;i++){
                                if (menu[i].name.toUpperCase().indexOf(document.getElementById("editMenu").value.toUpperCase())+ 1){
                            rezult.push(menu[i]);
                                }
                        }
                        return rezult;
                   }).then((findItem)=>{
                     document.getElementsByClassName("findestMenuItems")[0].remove();

                     var findestMenuItems = document.createElement("div");
                          findestMenuItems.className = 'findestMenuItems';
                        document.getElementsByClassName("editMenu")[0].appendChild(findestMenuItems);

                           for(let i = 0; i<findItem.length;i++){
                           var menuStatus = document.createElement("div");
                                menuStatus.className = 'menuStatus';
                                menuStatus.id = findItem[i]._id+'00';
                                menuStatus.innerText = findItem[i].name;
                              document.getElementsByClassName("findestMenuItems")[0].appendChild(menuStatus);



                                          document.getElementsByClassName("menuStatus")[i].onclick = () =>{

                                                      for (let j=0;j<findItem.length;j++){
                                                        if (findItem[j]._id===document.getElementsByClassName("menuStatus")[i].id.substr(0,14)) {
                                                          console.log(findItem[j]);

                                                            document.getElementById('_id').value = findItem[j]._id;
                                                            document.getElementById('title').value = findItem[j].name;
                                                            document.getElementById('img').value = findItem[j].img;
                                                            document.getElementById('content').value = findItem[j].discription;
                                                            document.getElementById('kind').value = findItem[j].kind;
                                                            document.getElementById('price').value = findItem[j].price;
                                                            document.getElementById('weight').value = findItem[j].weight;
                                                        }
                                                      }
                                       }

                          }
                   })

}

function OrderAdmin() {
    document.getElementsByClassName("adminDelete")[0].remove();
//console.log(document.getElementsByClassName("adminOrder"));

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'adminOrder', true);

            xhr.onreadystatechange = function() {
              if (xhr.readyState != 4) return;
              if (xhr.status != 200) {
                console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
                return;
              }
                var rez = JSON.parse(xhr.responseText);

                //ПОИСК!!!
                var j = 0;
                var rezult = [];
              for (var i=0; i<rez.length; i++){
                if (rez[i]._id.indexOf(document.getElementById("searchLive").value)+ 1){
            rezult[j] = rez[i];
            j++;}
            }
          //  console.log(rezult);

            ////////////не лезь в код, хз как работает!
          showPhones(rezult);
            }
    xhr.send(null);  }


  function showPhones(orders) {
   var div = document.createElement("div");
        div.className = 'adminDelete';
        div.id = 'adminDelete'
      document.getElementsByClassName("adminOrder")[0].appendChild(div);

              for (var i=orders.length-1; i >= 0; i--){

                var divStatus = document.createElement("div");
                     divStatus.className = 'divStatus';
                     divStatus.id = 'divStatus'
                   document.getElementsByClassName("adminDelete")[0].appendChild(divStatus);

                    var h3 = document.createElement("h3");
                h3.innerHTML = "Заказ: "
              divStatus.appendChild(h3);

                  var a = document.createElement('a');
                  var linkText = document.createTextNode(orders[i]["orderDish"]);
                  a.target = '_blank';
                  a.appendChild(linkText);
                  a.href = "/admin/"+orders[i]._id;
                  h3.appendChild(a);

                  var p2 = document.createElement('p');
                    p2.innerHTML = "Статус заказа: " + orders[i].status;
                    divStatus.appendChild(p2);

                    if (orders[i].status ==='Принят'){
                              document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'red';
                        }

                        if (orders[i].status ==='Доставлен'){
                                document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'green';
                            }

                            if (orders[i].status ==='Обработан'){
                                    document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'orange';
                                }
                                if
                                (orders[i].status ==='Доставка'){
                                        document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'yellow';
                                    }
                                    if
                                    (orders[i].status ==='Отменен'){
                                            document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'grey';
                                        }

                      var p1 = document.createElement('p');
                        p1.innerHTML = "Время заказа: " + orders[i].timeOrder
                        divStatus.appendChild(p1);

                        var p2 = document.createElement('p');
                          p2.innerHTML = "Клиент: " + orders[i].guest;
                          divStatus.appendChild(p2);

                          var p3 = document.createElement('p');
                            p2.innerHTML = "ID: " + orders[i]._id;
                            divStatus.appendChild(p3);

                          var hr = document.createElement('hr');
                          hr.color = 'red';
                        divStatus.appendChild(hr);
                    }
}

function makeid() {
  var text = "";
  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 14; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}



 OrderAdmin();
