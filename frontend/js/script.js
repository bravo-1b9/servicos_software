function gerarEstrelas(textoClassificacao) {
  const mapa = {
    "muito negativo": 1,
    "negativo": 2,
    "neutro": 3,
    "positivo": 4,
    "muito positivo": 5
  };

  const estrelasAtivas = mapa[textoClassificacao.toLowerCase()] || 0;
  const estrelas = '⭐'.repeat(estrelasAtivas) + '☆'.repeat(5 - estrelasAtivas);
  return estrelas;
}

function enviarTexto() {
  const texto = document.getElementById('text-input').value;

  fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto })
  })
    .then(res => res.json())
    .then(data => {
      const estrelas = gerarEstrelas(data.class);
      document.getElementById('resultado').innerHTML =
        `Resultado: ${estrelas}<br>Interpretação: "${data.class.toUpperCase()}".`;
    })
    .catch(err => {
      document.getElementById('resultado').innerText = "Erro ao classificar a mensagem.";
      console.error(err);
    });
}

function enviarArquivo() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (!file) {
    document.getElementById('resultado-arquivo').innerText = "Selecione um arquivo primeiro.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const texto = event.target.result;

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texto })
    })
      .then(res => res.json())
      .then(data => {
        const estrelas = gerarEstrelas(data.class);
        document.getElementById('resultado-arquivo').innerHTML =
          `Resultado do arquivo: ${estrelas}<br>Interpretação: "${data.class.toUpperCase()}".`;
      })
      .catch(err => {
        document.getElementById('resultado-arquivo').innerText = "Erro ao processar o arquivo.";
        console.error(err);
      });
  };

  reader.readAsText(file);
}


  
  