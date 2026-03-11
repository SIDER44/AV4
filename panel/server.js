import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('.'));

app.get('/generate', (req, res) => {
    const number = req.query.number;
    const code = `${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}`;
    const session = `session-${number}`;
    res.json({ code, session });
});

app.listen(3000, () => console.log('Pairing panel running on http://localhost:3000'));
