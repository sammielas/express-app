import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data';
import { runInNewContext } from 'vm';
const PORT = 3000;

const app = express();

//this is for the public folder on path /
app.use(express.static('public'));
//this is for images folder on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Method to use JSON
//app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req, res)=>
res.send(`Welcome to our Portal on Port ${PORT}`)
)

/*JSON DATA EXAMPLE 
 {"hi:"JSON is Cool"}
 URLEncoded Data EAMPLE
 hi=URLEncodedData+is+cool
*/
app.post('/v1/newItem',(req,res)=>{
  console.log(req.body);
  res.send(req.body);
});

// publish all data
app.route('/item')
.get( (req, res) => {
throw new Error();
  //res.end();
  //res.redirect('http://www.google.com');
  //res.json(data);
})
.put((req, res) => {
  res.send(`Handler for put on route /`);
});

// publish image
app.get('/images', (req, res) => {
  res.download('images/Greenshot.png');
  
});

//publish specific data
app.get('/v1/item/:admin_id', (req, res, next) => {
  //middleware that pulls data
  console.log(req.params.admin_id);
  let user = Number(req.params.admin_id);
  //middleware that uses the req object
  console.log(`Request from:${req.originalUrl}`);
  console.log(`Request Type:${req.method}`);
  //everything above is middleware
  res.send(data[user]);
  next();
},
  (res, req) => {
    console.log('Did you get the right data?');
  }
);

//Error handling function
app.use((err,req,res, next)=>{
//console.error(err.stack);
//res.status(500).send(`Red alert!!! ${err.stack}`);
});

app.listen(PORT, () => {
  console.log(` This app is listening on PORT:${PORT}`);

})