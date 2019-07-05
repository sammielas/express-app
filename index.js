import express from 'express';
import data from './data/data';
import { runInNewContext } from 'vm';
const PORT = 3000;

const app = express();

app.use(express.static('public'));
app.use('/images', express.static('images'));

// publish all data
app.route('/')
.get( (req, res) => {

  //res.end();
  //res.redirect('http://www.google.com');
  res.json(data);
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
  console.log(req.params.admin_id);
  let user = Number(req.params.admin_id);

  res.send(data[user]);
  next();
},
  (res, req) => {
    console.log('Did you get the right data?');
  }
);


app.listen(PORT, () => {
  console.log(` This app is listening on PORT:${PORT}`);

})