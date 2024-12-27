const express = require('express');
const Joi = require('joi'); // Importa a biblioteca Joi

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota básica para teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Rota para validar JSON
app.post('/validar-json', (req, res) => {
    // Define o esquema de validação com Joi
    const schema = Joi.object({
        nome: Joi.string().required(),         // Campo "nome" obrigatório e deve ser string
        idade: Joi.number().required(),       // Campo "idade" obrigatório e deve ser número
        email: Joi.string().email().required() // Campo "email" obrigatório e deve ser um e-mail válido
    });

    // Valida o JSON recebido com base no esquema
    const { error, value } = schema.validate(req.body);

    // Retorna erro se o JSON não atender aos critérios
    if (error) {
        return res.status(400).json({
            message: 'Erro de validação.',
            detalhes: error.details
        });
    }

    // Retorna sucesso se o JSON for válido
    res.status(200).json({
        message: 'JSON válido!',
        recebido: value
    });
});

// Inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
