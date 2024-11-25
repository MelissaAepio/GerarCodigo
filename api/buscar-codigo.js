const fs = require('fs');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método não permitido.' });
        return;
    }

    const { frase } = req.body;

    console.log("Frase recebida no servidor:", frase);

    try {
        const data = fs.readFileSync('./dados.json', 'utf8');
        const jsonData = JSON.parse(data);

        console.log("Dados carregados do arquivo:", jsonData);

        const itemEncontrado = jsonData.find((item) => item.frase === frase);

        if (itemEncontrado) {
            console.log("Código encontrado:", itemEncontrado.codigo);
            res.status(200).json({ codigo: itemEncontrado.codigo });
        } else {
            console.log("Código não encontrado para a frase:", frase);
            res.status(404).json({ error: 'Código não encontrado.' });
        }
    } catch (err) {
        console.error("Erro ao ler o arquivo de dados:", err);
        res.status(500).json({ error: 'Erro ao ler o arquivo de dados.' });
    }
};

