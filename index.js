document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const modelo = document.getElementById('modelo').value;
    const designacao = document.getElementById('designacao').value;
    const sensor = document.getElementById('sensor').value;
    const pressao = document.getElementById('pressao').value;
    const corpo = document.getElementById('corpo').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;
    const valvula = document.getElementById('valvula').value;

    // Começar a frase com os elementos que sempre devem ser incluídos
    let frase = `${tipo}, ${modelo}, ${corpo}, ${pressao}, ${designacao}, ${sensor}, ${entrada}, ${saida}`;

    // Se a válvula não for "Base (Sem válvula)", adicionar à frase
    if (valvula !== "base" && valvula) {
        frase += `, ${valvula}`;
    }

    console.log("Frase enviada para o servidor:", frase);

    try {
        // Fazer a requisição
        const response = await fetch('/buscar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frase })
        });

        const data = await response.json();
        console.log("Resposta do servidor:", data);

        document.getElementById('resultado').innerText = `Código: ${data.codigo}`;
    } catch (error) {
        document.getElementById('resultado').innerText = 'Erro ao buscar o código.';
        console.error("Erro:", error);
    }
});
