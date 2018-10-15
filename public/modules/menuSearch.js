
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://alex:panik1993@ds127843.mlab.com:27843/heroku_m3c7r3j8';
const dbName = 'heroku_m3c7r3j8';

/*
const url = 'mongodb://localhost:27017/';
const dbName = 'pizza';

*/
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

      function menuSearch (collect, find) {
            return new Promise ((resolve, reject) => {
          MongoClient.connect(url, (err, client) => {

          const db = client.db(dbName);
          const collection =db.collection(collect);

                  collection.find(find).toArray((err, results)=>{
                      if(err) console.log(err);
                    client.close();
                    resolve(results);
                  })
                });
          })
      };

module.exports = menuSearch;
