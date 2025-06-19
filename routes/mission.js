const express = require('express');
const pool = require('../config/db');
const {code, decode} = require('../midlewares/AES');
require('dotenv').config();
const KEY = process.env.ENCRYPTION_KEY;

const router = express.Router();


router.post('/',  async (req, res)=>{
    const {title, status, location, agent_id} = req.body;
    const result = await pool.query('INSERT INTO mission (title, status, location, agent_id) VALUES ($1,  $2, $3, $4)', [title, status, location, agent_id]);
    res.status(200).send('mission add');

});

router.post( '/:missionId/file', async (req, res)=>{
    const misionId = req.params.missionId;
    const { filename, context } = req.body;
    const result = await pool.query('SELECT id FROM mission WHER id = $1', [missionId]);
    const encripted = aes.code(KEY, context);

    const data = pool.query(
            'INSERT INTO mission_files (mission_id, filename, encrypted_data) VALUES ($1, $2, $3) RETURNING id, mission_id, filename, uploaded_at',
            [missionId, filename, encrypted]
        );

    res.status(200).send('mission file upload');
});

router.get ('/:missionId/file', async (req, res) => {
    const missionId = req.params.missionId;
    const mission = pool.query('SELECT id, mission_id, filename, encrypted_data, uploaded_at FROM mission_files WHERE mission_id = $1', [missionId]);
    res.status(200).send(mission);

});

module.exports = router;