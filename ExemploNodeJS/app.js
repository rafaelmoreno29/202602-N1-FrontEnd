const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(express.json());

//Configuração das rotas
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Olá, mundo!' });
});

app.get('/hello', (req, res) => {
    const nome = req.query.nome || '-';
    const sobrenome = req.query.sobrenome || '-';
    res.json({ message: `Olá, ${nome} ${sobrenome}!` });
});

app.get('/cliente/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `Cliente com ID: ${id}` });
});

app.post('/somar', (req, res) => {
    const { num1, num2 } = req.body;
    //const num1 = req.body.num1;
    //const num2 = req.body.num2;
    const resultado = num1 + num2;
    res.json({ resultado });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});