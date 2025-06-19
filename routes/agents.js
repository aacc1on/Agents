const express = require('express');
const {code, decode} = require('../midlewares/AES');
const pool = require('../config/db');

const routes = express.Router();

routes.post('/', async (req, res)=>{
    const {codename, real_name, clearance_level} = req.body;
    const ereal_name = code(real_name);
    const result = await pool.query(
  'INSERT INTO agents (codename, real_name, clearance_level) VALUES ($1, $2, $3)',
  [codename, ereal_name, clearance_level]
);

if (result === 0){
    res.status(400).send('Error');

}

res.status(200).send('user add');
});

routes.get('/', async (req, res)=>{
   const result = await pool.query('SELECT * FROM agents');

    const decresult = result.rows.map((u) => ({
      ...u,
      real_name: decode(u.real_name),
    }));

    res.status(200).json(decresult);

});

module.exports = routes;
