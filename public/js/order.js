const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноявбрь", "Декабрь"
];
var post = [];
var itemOrder = [];
let finalPrice = 0;
let dostavkaPrice = 0;
let postPrice = 0;
let postOrder = {};
var plusCounter =  document.getElementsByClassName('plusCounter');
var minusCounter =  document.getElementsByClassName('minusCounter');
var colCounter = document.getElementsByClassName('colCounter');
var deleteItem = document.getElementsByClassName('deleteCart');

async function getElementMenu(){

    let responseMenu = await fetch('/orderItems')
    let products = await responseMenu.json();
      await  console.log(products)
    await new Promise((resolve, reject) => setTimeout(resolve, 0));
    products = products[document.getElementById('ip').innerHTML];
    await  console.log(products)
    await renderOrder(products);
    var itemOrder = products;

    var deleteItem = await document.getElementsByClassName('deleteCart');
    var orderCost = document.getElementById('orderCost');
    for (let i=0; i<deleteItem.length;i++){

                         deleteItem[i].onclick = function(){
                           console.log(this)
                           if (this.id.substr(0,14)=== itemOrder[i]._id){
                               var xhr = new XMLHttpRequest();
                               xhr.open("POST", '/submitMenuDelete', true);
                               xhr.setRequestHeader('Content-Type', 'application/json');
                               xhr.send(JSON.stringify(itemOrder[i]));
                               window.location.reload();
                            }
                         }
      }

      for (let i=0; i<plusCounter.length;i++){
          plusCounter[i].onclick = function add(){
              for (var i=0;i<itemOrder.length;i++){
                  if (this.id.substr(0,14)=== itemOrder[i]._id){
                  itemOrder[i].counter++;
                  finalPrice +=  Number(itemOrder[i].price);
                  orderCost.innerHTML = 'Стоимость заказа: ' + finalPrice.toFixed(2) + ' р.';
                  colCounter[i].innerHTML = itemOrder[i].counter;

                                  if ( ( finalPrice > 10 ) || (document.getElementById('adressOrder').value === 'la Villa') ) {

                                    dostavkaPrice = 0;
                                    postPrice = dostavkaPrice + finalPrice;
                                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                                    document.getElementById('deliveryCost').style.color = 'yellow';
                                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

                                  } else {

                                    dostavkaPrice = 5;
                                    postPrice = dostavkaPrice + finalPrice;
                                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                                    document.getElementById('deliveryCost').style.color = 'red';
                                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                                  }

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", '/submitMenu', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                   xhr.send(JSON.stringify(itemOrder[i]));

                  }
             }
        }
          minusCounter[i].onclick = function(){
                for (var i=0;i<itemOrder.length;i++){
                    if ((this.id.substr(0,14) === itemOrder[i]._id) && (itemOrder[i].counter>1)){
                      itemOrder[i].counter--;
                      finalPrice -=  itemOrder[i].price;
                      orderCost.innerHTML = 'Стоимость заказа: ' + finalPrice.toFixed(2) + ' р.';
                        colCounter[i].innerHTML = itemOrder[i].counter;

                        if ( ( finalPrice > 10 ) || (document.getElementById('adressOrder').value === 'la Villa') ) {

                          dostavkaPrice = 0;
                          postPrice = dostavkaPrice + finalPrice;
                          document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                          document.getElementById('deliveryCost').style.color = 'yellow';
                          document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

                        } else {

                          dostavkaPrice = 5;
                          postPrice = dostavkaPrice + finalPrice;
                          document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                          document.getElementById('deliveryCost').style.color = 'red';
                          document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                        }


                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", '/submitMenu', true);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                       xhr.send(JSON.stringify(itemOrder[i]));
                    }
               }
          }
      }

      document.getElementById('buttonOrder').onclick = () =>{
      let Data = new Date();
      let buffOrder = [];
            postOrder._id = makeid();
            postOrder.guest = document.getElementById('nameOrder').value;
            postOrder.guestNumber = document.getElementById('telephoneOrder').value;
            postOrder.guestAdress = document.getElementById('adressOrder').value;
            postOrder.comment = document.getElementById('commentOrder').value;
            postOrder.price = postPrice.toFixed(2);
            postOrder.timeOrder = new Date();
            postOrder.ip = document.getElementById('ip').innerHTML;

            for (let i = 0; i<itemOrder.length; i++){
                 buffOrder[i] = {
                  name:itemOrder[i].name,
                  price:itemOrder[i].price,
                  count:itemOrder[i].counter
                }
            }
            postOrder.orderDish=JSON.stringify(buffOrder);
            postOrder.status = 'Принят';
            postOrder.timeOrder = Data.getHours() + ':' + Data.getMinutes() + ':' + Data.getSeconds() + '. ' + Data.getDate() + ' '
            + monthNames[Data.getMonth()] +' '+ Data.getFullYear();

                var xhr = new XMLHttpRequest();
                xhr.open("POST", '/order', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(postOrder));
                alert('ЗАКАЗ ПРИНЯТ!')
                window.location.reload();
          }

    return   products;
}
         window.onload = () => {
                var  itemOrder = getElementMenu()
                  // renderOrder(itemOrder)

         }

        function fun1() {
        var chbox;
        chbox=document.getElementById('one');
            if (chbox.checked) {
              //  alert('Выбран');
              document.getElementById('adressOrder').value = 'la Villa'
                  dostavkaPrice = 0;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'yellow';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';


            }
            else {
              document.getElementById('adressOrder').value='';
                      if (  finalPrice < 10 ) {
                    dostavkaPrice = 5;
                    postPrice = dostavkaPrice + finalPrice;
                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                    document.getElementById('deliveryCost').style.color = 'red';
                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                  }
            }
        }

        function renderOrder(items){
        finalPrice = 0;
          if (items.length>0) {
            document.querySelector('#centerPostOrderBot').style.opacity='1'}
            else{
              document.querySelector('#centerPostOrderBot').style.opacity='0'}

            for (var i = 0; i < items.length; i++){

              finalPrice += items[i].price * items[i].counter;
              orderCost.innerHTML ='Стоимость заказа: '+ finalPrice.toFixed(2) + ' р.';

              if ( ( finalPrice > 10 ) || (document.getElementById('adressOrder').value === 'la Villa') ) {

                dostavkaPrice = 0;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'yellow';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

              } else {
                dostavkaPrice = 5;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'red';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
              }


              const  orderCenter = document.createElement("div");
                  orderCenter.className = 'orderCenter';
                  orderCenter.id = items[i]._id+items[i].kind;
                  document.getElementsByClassName('centerPostOrder')[0].appendChild(orderCenter);

              const frontImage = document.createElement("div");
                  frontImage.className = 'frontImage';
                  frontImage.style.backgroundImage = "url(public/image/menu/"+url(items[i].kind)+"/"+items[i].img+".jpg)";
                  document.getElementById(orderCenter.id).appendChild(frontImage);

          const textCenter = document.createElement("div");
                textCenter.className = 'textCenter';
                textCenter.id = items[i]._id+items[i].name;
                document.getElementById(orderCenter.id).appendChild(textCenter);

                const textCenter1 = document.createElement("div");
                      textCenter1.className = 'textCenter1';
                      textCenter1.id = items[i]._id+items[i].name+'qwe';
                      document.getElementById(textCenter.id).appendChild(textCenter1);

                      const textCenter2 = document.createElement("div");
                            textCenter2.className = 'textCenter2';
                            textCenter2.id = items[i]._id+items[i]+'qwe';
                            document.getElementById(textCenter.id).appendChild(textCenter2);

            const  nameMenuOrder = document.createElement("div");
                   nameMenuOrder.className = 'nameMenuOrder';
                   nameMenuOrder.id = i + items[i]._id;
                   nameMenuOrder.innerHTML = items[i].name;
                   document.getElementById(textCenter1.id).appendChild(nameMenuOrder);

                   const  kindOrder = document.createElement("div");
                          kindOrder.className = 'kindOrder';
                          kindOrder.innerHTML =items[i].discription;
                          document.getElementById(textCenter1.id).appendChild(kindOrder);

              const priceOrder = document.createElement("div");
                   priceOrder.className = 'priceOrder';
                   priceOrder.innerHTML = items[i].price + ' р.';
                   document.getElementById(textCenter2.id).appendChild(priceOrder);


                   const weightOrder = document.createElement("div");
                        weightOrder.className = 'weightOrder';
                        weightOrder.innerHTML = items[i].weight + ' гр.';
                        document.getElementById(textCenter1.id).appendChild(weightOrder);

                        const addCounter= document.createElement("div");
                        addCounter.className = 'addCounter';
                        addCounter.id = items[i]._id+'addcounter';
                        document.getElementById(textCenter2.id).appendChild(addCounter);

                        const minusCounter= document.createElement("div");
                              minusCounter.className = 'minusCounter';
                                minusCounter.innerHTML =  '-'
                                minusCounter.id = items[i]._id + 'minus';
                              document.getElementById(addCounter.id).appendChild(minusCounter);

                              const colCounter= document.createElement("div");
                                    colCounter.className = 'colCounter';
                                    colCounter.innerHTML =  items[i].counter;
                                    document.getElementById(addCounter.id).appendChild(colCounter);

                        const plusCounter = document.createElement("div");
                          plusCounter.className = 'plusCounter';
                          plusCounter.innerHTML =  '+'
                          plusCounter.id = items[i]._id + 'plus';
                          document.getElementById(addCounter.id).appendChild(plusCounter);


                        const deleteCart = document.createElement("div");
                      deleteCart.className = 'deleteCart';
                        deleteCart.id = items[i]._id+'delete';
                        document.getElementById(textCenter2.id).appendChild(deleteCart);

                        const deleteOrder = document.createElement("p");
                          deleteOrder.className = 'deleteOrder';
                          deleteOrder.innerHTML =  'Удалить заказ'
                        document.getElementById(deleteCart.id).appendChild(deleteOrder);

                        const imgPrice = document.createElement("IMG");
                         imgPrice.className = 'imgPrice';
                        document.getElementById(deleteCart.id).appendChild(imgPrice);
            }
        }

        function url(item){
          var ret = '';
                       if (item ==='Паста') ret = 'cold'
                       if (item ==='Пицца') ret = 'pizza'
                       if (item ==='Десерт') ret = 'desert'
                       if (item ==='Салат') ret = 'cold'
                       if (item ==='Гарнир') ret = 'cold'
                       if (item ==='Закуски') ret = 'cold'
                       if (item ==='Напитки') ret = 'drink'
                       if (item ==='Напиток') ret = 'drink'
                       if (item ==='Кофе') ret = 'drink'
                       if (item ==='Крюшон') ret = 'drink'
                       if (item ==='Коктейль') ret = 'drink'
                       if (item ==='Горячее блюдо') ret = 'hot'
                       if (item ==='Гриль') ret = 'hot'
                       if (item ==='Суп') ret = 'cold'
                       if (item ==='Соус') ret = 'other'
                       if (item ==='Десерт') ret = 'desert'
                       if (item ==='Другое') ret = 'other'
                       return ret;
            }

            function makeid() {
              var text = "";
              var possible = "0123456789";
              for (var i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 5; i++)
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
              return text;
            }
