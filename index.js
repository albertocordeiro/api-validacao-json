const express = require('express');
const Joi = require('joi'); // Importa a biblioteca Joi

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisi��es
app.use(express.json());

// Rota b�sica para teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Rota para validar JSON
app.post('/validar-json', (req, res) => {
    // Define o esquema de valida��o com Joi
    const schema = Joi.object({
        nome: Joi.string().required(),         // Campo "nome" obrigat�rio e deve ser string
        idade: Joi.number().required(),       // Campo "idade" obrigat�rio e deve ser n�mero
        email: Joi.string().email().required() // Campo "email" obrigat�rio e deve ser um e-mail v�lido
    });

    // Valida o JSON recebido com base no esquema
    const { error, value } = schema.validate(req.body);

    // Retorna erro se o JSON n�o atender aos crit�rios
    if (error) {
        return res.status(400).json({
            message: 'Erro de valida��o.',
            detalhes: error.details
        });
    }

    // Retorna sucesso se o JSON for v�lido
    res.status(200).json({
        message: 'JSON v�lido!',
        recebido: value
    });
});

// Inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
