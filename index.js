import express from 'express';
import data from './data/data';
import { runInNewContext } from 'vm';
const PORT = 3000;

const app = express();

app.use(express.static('public'));
app.use('/images', express.static('images'));
// publish all data
app.get('/', (req, res) => {
  res.json(data);
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
app.post('/newItem', (req, res) => {
  res.send(`Handler for post on route /newItem`);
});

app.listen(PORT, () => {
  console.log(` This app is listening on PORT:${PORT}`);

})