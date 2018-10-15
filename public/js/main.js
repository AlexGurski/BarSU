var items = [];
var addCart = [];

async function getElementMenu(){
    let responseMenu = await fetch('/sendMenu')
    let products = await responseMenu.json();
    await   console.log(products)
    await   new Promise((resolve, reject) => setTimeout(resolve, 0));
    await   create(products);

    var   addCart = await document.getElementsByClassName('addCart');

    for(var i=0; i < addCart.length; i++){
      addCart[i].onclick = add
    }

    items = products
    return items;
}


window.onload = () => {
  items =   getElementMenu();
    }


      document.getElementsByClassName('pizzaMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Пицца')
      };
      document.getElementsByClassName('hotMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Горячее блюдо', 'Гриль')
      };
      document.getElementsByClassName('drinkMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Напиток','Крюшон','Кофе', 'Коктейль' ,'Напитки')
      };
      document.getElementsByClassName('coldMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Закуски','Паста','Суп','Гарнир')
      };
      document.getElementsByClassName('otherMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Другое','Соус')
      };
      document.getElementsByClassName('desertMenu')[0].onclick = ()=>{
        filter(document.getElementsByClassName('ItemsCenter'),'Десерт')
      };

      function magic() {
          if (  document.getElementsByClassName('center')[0].scrollTop > 120) {
          btn.style.opacity = '0.9';
          }
            else { btn.style.opacity = '0'; }

      }

function filter(item){
    for (var i=0;i<item.length;i++){
item[i].style.display = "block";
      if ((item[i].children['pKind'].innerText!==arguments[1]) && (item[i].children['pKind'].innerText!==arguments[2])
    && (item[i].children['pKind'].innerText!==arguments[3]) && (item[i].children['pKind'].innerText!==arguments[4])
  && (item[i].children['pKind'].innerText!==arguments[5]) && (item[i].children['pKind'].innerText!==arguments[6]) )
      {
          item[i].style.display = "none";
      }
    }
  }

function add () {
    for (var i=0;i<items.length;i++){
      if (this.id === items[i]._id){
        items[i].counter = 1;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/submitMenu', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(items[i]);
     xhr.send(JSON.stringify(items[i]));
       }
    }
};

function create(items){

  for (var i=19; i<25; i++){
    var arrDisc = items[i].discription.split(',');

   const  div = document.createElement("div");
       div.className = 'ItemsCenter';
       div.id = '00'+items[i]._id+items[i].discription;
       document.getElementById('topFood').appendChild(div);

//ТУТ БУДЕТ ТРЕШАК!!!!

    const  img = document.createElement("div");
     img.className = 'imageMenu';
     img.id = i + items[i]._id;
     document.getElementById(div.id).appendChild(img);

        const conteiner = document.createElement("div");
        conteiner.className = 'container';
        conteiner.id = items[i]._id + i;
        document.getElementById(img.id).appendChild(conteiner);

          const front = document.createElement("div");
          front.className = 'front';
          front.id = '123'+ items[i]._id;
          front.style.backgroundImage = "url(public/image/menu/"+url(items[i].kind)+"/"+items[i].img+".jpg)";
          document.getElementById(conteiner.id).appendChild(front);

              const weight = document.createElement("div");
                weight.className = 'weight';
                  weight.innerHTML =  items[i].weight + ' гр.';
                document.getElementById(front.id).appendChild(weight);

          const back = document.createElement("div");
          back.className = 'back';
          back.id = i + items[i]._id + i;
          document.getElementById(conteiner.id).appendChild(back);

                     const pDisc = document.createElement("p");
                      pDisc.className = 'inner';
                      pDisc.innerHTML =  items[i].discription;
                     document.getElementById(back.id).appendChild(pDisc);

     ///////////////////////////

    const  pKind = document.createElement("p");
     pKind.className = 'pKind';
     pKind.id = 'pKind';
     pKind.innerHTML =  items[i].kind
   document.getElementById(div.id).appendChild(pKind);

   const  pName = document.createElement("p");
     pName.className = 'pName';
     pName.innerHTML =  '"'+items[i].name+'"';
   document.getElementById(div.id).appendChild(pName);

   const addCart = document.createElement("div");
   addCart.className = 'addCart';
   addCart.id = items[i]._id;
   document.getElementById(div.id).appendChild(addCart);

   const pPrice = document.createElement("p");
     pPrice.className = 'pPrice';
     pPrice.innerHTML =  items[i].price +  ' р.'
   document.getElementById(addCart.id).appendChild(pPrice);

   const imgPrice = document.createElement("IMG");
    imgPrice.className = 'imgPrice';
   document.getElementById(addCart.id).appendChild(imgPrice);

 }
  addCart = document.getElementsByClassName('addCart');
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
