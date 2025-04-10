
// Função que converte o resultado de classificação textual em estrelas visuais
function gerarEstrelas(textoClassificacao) {
  // Mapeia os rótulos de sentimento para número de estrelas
  const mapa = {
    "muito negativo": 1,
    "negativo": 2,
    "neutro": 3,
    "positivo": 4,
    "muito positivo": 5
  };

  // Busca o número de estrelas correspondente ao rótulo recebido
  const estrelasAtivas = mapa[textoClassificacao.toLowerCase()] || 0;

  // Gera string com estrelas preenchidas e vazias
  const estrelas = '⭐'.repeat(estrelasAtivas) + '☆'.repeat(5 - estrelasAtivas);
  return estrelas;
}

// Função para enviar o texto digitado pelo usuário para o backend
function enviarTexto() {
  const texto = document.getElementById('text-input').value;

  // Envia o texto via API REST usando fetch
  fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto })
  })
    // Converte a resposta em JSON
    .then(res => res.json())
    .then(data => {
      // Gera a visualização em estrelas com base no resultado
      const estrelas = gerarEstrelas(data.class);

      // Exibe o resultado na interface
      document.getElementById('resultado').innerHTML =
        `Resultado: ${estrelas}<br>Interpretação: "${data.class.toUpperCase()}".`;
    })
    .catch(err => {
      // Mostra erro amigável se algo falhar
      document.getElementById('resultado').innerText = "Erro ao classificar a mensagem.";
      console.error(err);
    });
}

// Função para analisar um arquivo .txt enviado pelo usuário
function enviarArquivo() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  // Validação: verifica se algum arquivo foi selecionado
  if (!file) {
    document.getElementById('resultado-arquivo').innerText = "Selecione um arquivo primeiro.";
    return;
  }

  const reader = new FileReader();

  // Quando a leitura do arquivo estiver completa
  reader.onload = function(event) {
    const texto = event.target.result;

    // Envia o conteúdo do arquivo como JSON via fetch
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texto })
    })
      .then(res => res.json())
      .then(data => {
        const estrelas = gerarEstrelas(data.class);

        // Exibe o resultado na interface
        document.getElementById('resultado-arquivo').innerHTML =
          `Resultado do arquivo: ${estrelas}<br>Interpretação: "${data.class.toUpperCase()}".`;
      })
      .catch(err => {
        document.getElementById('resultado-arquivo').innerText = "Erro ao processar o arquivo.";
        console.error(err);
      });
  };

  // Inicia a leitura do conteúdo do arquivo como texto
  reader.readAsText(file);
}
