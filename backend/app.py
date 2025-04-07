from flask import Flask, request, jsonify # Importa os módulos principais: Flask - cria o app web / Request - Captura os dados que o usuário enviou / Jsonify - Converte resposta Python em JSON para o frontend.
from flask_cors import CORS # Habilita a comunicação do frontend com o Backend
from transformers import AutoTokenizer, AutoModelForSequenceClassification # Transforma o texto em tokens e carrega o modelo de ML.
import torch # Torch - Trabalha com vetores/matrizes de dados, realizando operações matemáticas, essenciais para aplicações de ML.

app = Flask(__name__) # Cria uma instância do "Flask", necessária para inicializar o servidor e definir as rotas.
CORS(app , origins=["http://localhost:8080"]) # Habilita a comunicação apenas do frontend com o Backend (Segurança).

model_name = "nlptown/bert-base-multilingual-uncased-sentiment" # Nome do modelo já treinado do "Hugging Face".
model = AutoModelForSequenceClassification.from_pretrained(model_name) # Modelo de classificação de texto (sentimento).
tokenizer = AutoTokenizer.from_pretrained(model_name) # Transforma texto em entrada para o modelo.

@app.route('/predict', methods=['POST']) # Cria a rota "/predict" que aceita somente requisições "POST"
def predict():
    data = request.get_json() # Pega os dados enviados pelo usuário (em JSON).
    text = data.get('text', '') # Extrai o campo "text" (frase que será classificada).

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True) # Transformação do texto em tokens (vetores) e retorna no formato do Pytorch.  
    with torch.no_grad():
        outputs = model(**inputs) # Faz a predição sem guardar os gradientes (economiza memória, já que não estamos treinando, só inferindo).
        logits = outputs.logits # Pega os "logits", que são valores brutos antes de decidir a classe (por exemplo '[0.12, 2.35, 3.41, 1.15, 2.46]').
        predicted_class = torch.argmax(logits).item() # Acha o índice com maior valor - representa a classe predita.

    # Mapeamento de 1 a 5 estrelas
    labels = {
        0: "muito negativo",
        1: "negativo",
        2: "neutro",
        3: "positivo",
        4: "muito positivo"
    }
    classe = labels[predicted_class]

    return jsonify({'text': text, 'class': classe}) # Envia a resposta como JSON contendo o texto original e a classificação.

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)