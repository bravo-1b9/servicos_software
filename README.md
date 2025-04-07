
# Detector de Sentimento em Texto com Docker e Machine Learning

Este projeto é uma aplicação web full stack que utiliza um modelo de Machine Learning pré-treinado para identificar o **sentimento predominante** em textos — como positivo, negativo ou neutro — por meio de uma interface web simples. Ele foi desenvolvido como parte de uma atividade de pós-graduação, com foco em aplicações reais na área de **Segurança da Informação**.

---------------------------------------------------------------------------------------------------------------------------------------

## Tecnologias utilizadas

- [x] **Python** e **Flask** (Backend)
- [x] **Transformers + PyTorch** (Modelo de linguagem)
- [x] **Docker + Docker Compose** (Infraestrutura)
- [x] **HTML + JavaScript + Nginx** (Frontend)
- [x] Modelo: [`nlptown/bert-base-multilingual-uncased-sentiment`](https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment)

---------------------------------------------------------------------------------------------------------------------------------------

##  Como executar o projeto

### Pré-requisitos

- Docker
- Docker Compose

### Instruções

´´´bash
git clone repositório https://github.com/bravo-1b9/servicos_software
cd <pasta-do-projeto>
docker-compose up --build
```

Acesse o sistema via navegador:
```
http://localhost:8080
```

---

##  Funcionalidades

- Análise de sentimento (1 a 5 estrelas)
- Interface interativa com textarea e upload de arquivo `.txt`
- Retorno visual com estrelas e rótulo interpretável
- API REST para consumo externo

---

##  Uso da API

### Endpoint

```
POST /predict
```

### Requisição (JSON)

```json
{
  "text": "Esse produto é excelente, parabéns!"
}
```

### Resposta (JSON)

```json
{
  "text": "Esse produto é excelente, parabéns!",
  "class": "muito positivo",
  "accuracy": "90%"
}
```

---

##  Aplicação em Segurança da Informação

Este projeto tem aplicação prática na **prevenção e detecção de incidentes de linguagem ofensiva ou tóxica** no ambiente corporativo:

- Monitoramento de canais de comunicação (e-mails, helpdesk, chats)
- Apoio a investigações internas e compliance
- Ferramenta de triagem e classificação textual
- Alinhado aos controles técnicos da ISO/IEC 27002 (uso aceitável, proteção contra abusos)

---

##  Estrutura do projeto

```
.
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   └── js/
│       └── script.js
├── docker-compose.yml
└── README.md
```

---

##  Autor

Desenvolvido por Jean Souza como parte da atividade de pós-graduação em Serviços de Software.

---
