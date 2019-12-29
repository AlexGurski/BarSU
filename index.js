const collectDB = ["animals", "cinema", "geography", "history", "human", "literature", "multsComics", "music", "programming", "science", "society", "sport"];
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var path = require('path');
var fs = require('fs');
var async = require('async');

const url = 'mongodb://localhost:27017/';
const dbName = 'playGame';

var massivZaskazov = {};
const massMenu = [];
  const rez =   require("./public/modules/menuSearch");
  var massiv = [];

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )


app.get('/sendMenu', (req,res) => {
  rez('country', {})
  .then((items) =>{ res.send(items);
   })
     .catch((errorMessage)=>{
       console.log(errorMessage);
     });
})
app.get('/', (req, res) => {

  res.render ('country.ejs');
} );
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
function randomNumber(min,max){
  return Math.floor(Math.random() * (max-1 - min + 1)) + min
}

function randomCountry(coutry,count){
    return new Promise ((resolve, reject) => {
let resultCountry = [];
    rez("country", {"country":String(coutry)})
        .then((item) =>{
        //  console.log(item)
            for (let i=0;i<count;i++){
          let peremennaya = item[randomNumber(0,item.length)]
      console.log(peremennaya._id)
      let  errors = 0;
          for (j = -1; j < resultCountry.length; j++) {
              if (peremennaya == resultCountry[j]) {
                errors = 1;
                i--;
          }
         }
      if (errors != 1) {
        console.log(i);
        resultCountry.push(peremennaya);
      }
    }
    //console.log(resultCountry)
    resolve(resultCountry);
  })
})
};

let hard = 1;
let massivChisel = [];

(  ()=>{
  /*for (i=0;i<3*hard;i++){
    console.log(collectDB[randomNumber(0,collectDB.length)])
  }
*/
    randomCountry(2185366,4)
      .then((item)=>{
        console.log(item)
  })

}
)()
/*
  rez('history', {"hard":"4"})
      .then((item) =>{
         console.log(item)
       })
         .catch((errorMessage)=>{
           console.log(errorMessage);
      });
*/
    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection =db.collection('country');
      app.post("/country", (req,res) => {
      //  console.log(req.body)
        collection.insertOne(req.body,(err,result)=>{
                  console.log(req.body)
                          if(err){
                            console.log(err);
                            res.sendStatus(500);
                          }
    res.redirect('/order')
                      })
            })
    });

    app.get('/1', (req, res) => {
            res.render ('index.ejs');
    } );


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


    MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db("heroku_m3c7r3j8");
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
              const db = client.db("heroku_m3c7r3j8");
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

                    app.listen(process.env.PORT || 3000, () => {
                        console.log('--//API  start 3000--//');

                      })﻿;
