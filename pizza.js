const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'pizza';
const massMenu = [];
  const rez =   require("./public/modules/menuSearch");
  var massiv = [];
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));
const mass = [0];

    app.get('/', (req, res) => {
            res.render ('index.ejs');
          } );

          app.get('/armor', (req, res) => {
                res.render ('armor.ejs');
                } );

  app.get('/about', (req, res) => {
        res.render ('about.ejs');
        } );

        app.get('/gps', (req, res) => {
              res.render ('gps.ejs');
              } );

              app.get('/we', (req, res) => {
                res.render ('we.ejs');
              } );
              app.get('/vacancy', (req, res) => {
                res.render ('vacancy.ejs');
              } );

  app.get('/reserved', (req, res) => {
    res.render ('OLDmenu.ejs');
  } );
//////////////////////заказ по ссылке
app.get('/admin/:id', (req,res) => {

  rez('order', {_id:req.params.id})
      .then((items) =>{ //console.log(items);
         res.render('editFinalOrder.ejs',{post:items});
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
      });
})

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);
const db = client.db("pizza");
const collection =db.collection('order');
  app.post("/updateStatusOrder", (req,res) => {
        const  event = req.body;

           collection.updateOne(
               {_id: String(req.body.id) },
               { $set: {status: req.body.status}},
               function(err, result){
                 console.log(err);
               }
           );
           res.send(null);
       }) ;
     })

    app.get('/menu', (req,res) => {

      rez('menu', {})
      .then((items) =>{
         res.render ('menu.ejs');
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });
      })


    app.post("/submitMenuDelete", (req,res) => {
    for (let i = 0; i<massiv.length;i++){
      if (massiv[i]._id.substr(0,14) === req.body._id.substr(0,14)){
      massiv.splice(i,1);
      }
    }
  res.send(null);
});

app.post("/submitMenu", (req,res) => {

  console.log('--POST MENU--');

for (let i = 0; i<massiv.length;i++){
  if (massiv[i]._id.substr(0,14) === req.body._id.substr(0,14)){
  massiv.splice(i,1);
  }
}
massiv.push(req.body);

res.send(null);
});


        app.get('/sendMenu', (req,res) => {
          rez('menu', {})
          .then((items) =>{ res.send(items);
           })
             .catch((errorMessage)=>{
               console.log(errorMessage);
             });
      })


app.get('/admin', (req,res) => {

  rez('order', {})
  .then((items) =>{ //console.log(items);
     res.render ('admin.ejs', {post:items});})
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
    })


    app.get('/adminOrder', (req,res) => {
      rez('order', {})
      .then((items) =>{
         res.send(items);})
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });
        })

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);
const db = client.db("pizza");
const collection =db.collection('order');
  app.post("/order", (req,res) => {

            collection.insertOne(req.body,(err,result)=>{
                      if(err){
                        console.log(err);
                        res.sendStatus(500);
                      }  massiv = [];
                      res.redirect('/order')
                  })
      })
});
    /////////////////////

app.get('/order',(req, res) => {
  res.render('order.ejs');
})

app.get('/orderItems', (req,res) => {
          res.send(massiv);
        })

////////////////ОТЗЫВЫ!!!..................

    app.get('/about/write', (req,res)=>{

      rez('event', {})
      .then((items) =>{
         res.render ('write.ejs', {mainCenter:items});
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
         });
    })

    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db("pizza");
    const collection =db.collection('event');
      app.post("/about/write", (req,res) => {
            const  event= { "date":req.body.date,
                            "name":String(req.body.name),
                            "text":String(req.body.text)
                          };

                collection.insertOne(event,(err,result)=>{
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
                          res.redirect('/about/write')
                      })
          })
    });


    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db("pizza");
    const collection =db.collection('armor');
      app.post("/armor", (req,res) => {
                collection.insertOne(req.body,(err,result)=>{
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
                          res.redirect('/armor')
                      })
          })
    });
     app.get('/armorFree', (req,res) => {
        rez('armor', {})
        .then((items) =>{
           res.send(items);})
           .catch((errorMessage)=>{
             console.log(errorMessage);
           });
          })

          app.get('/adminArmor', (req,res) => {
            rez('armor', {})
            .then((items) =>{
               res.send(items);})
               .catch((errorMessage)=>{
                 console.log(errorMessage);
               });
              })


              app.get('/admin/armor/:id', (req,res) => {

                rez('armor', {_id:req.params.id})
                    .then((item) =>{
                       res.render('armorSolo.ejs',{post:item});

                     })
                       .catch((errorMessage)=>{
                         console.log(errorMessage);
                    });
              })

              MongoClient.connect(url, (err, client) => {
              assert.equal(null, err);
              const db = client.db("pizza");
              const collection =db.collection('menu');
                app.post("/admin", (req,res) => {
                      console.log(req.body)
                         collection.update(
                             {_id: String(req.body._id) },
                             {name: req.body.name,
                              discription:req.body.discription,
                              img:req.body.img,
                              kind:req.body.kind,
                              price:req.body.price,
                              weight:req.body.weight

                             }
                             ,{ upsert: true },
                             function(err, result){
                               console.log(err);
                             }

                         );
                          res.redirect('/admin')

                     }) ;
                   })




                      app.listen(3000, () => {
                        console.log('--//API  start 3000--//')
                      })﻿;
