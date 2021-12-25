import express from 'express';
import { getAgePredictionByName } from './agify.service.js';

const PORT = 3000;
const app = express();
app.use(express.json());

app.post('/name', async (req, res)=>{
    const name = req.body.name || "";
    const data = await getAgePredictionByName(name)
    res.json(data)
});

app.post('/names', (req, res)=>{
    const names = req.body.names || [];
    console.log('names', names)
    res.send(`You sent ${names.length} names`);
})

app.listen(PORT, ()=>{
    console.log(`app started listening on http://localhost:${PORT} ...`);
})