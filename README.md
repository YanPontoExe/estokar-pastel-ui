# EstoKar - Frontend Client

> Este é o repositório do cliente web para a aplicação EstoKar. Ele é responsável por toda a interface do usuário (UI) e a lógica de apresentação, comunicando-se com a API para gerenciamento de dados.

## ✨ Visão Geral do Projeto

Este projeto é uma **Single Page Application (SPA)** desenvolvida em **TypeScript**. O objetivo é fornecer uma experiência de usuário fluida e responsiva para a gestão de Estoques e materiais.

### 💻 Tecnologias Chave

* **Framework:** JSX
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Gerenciador de Pacotes:** npm

---

## ⚙️ Configuração Local

Siga estes passos para configurar e executar a aplicação em seu ambiente local.

### Pré-requisitos

* **Node.js** 
* **npm** 
* O Backend da aplicação deve estar em execução em `https://localhost/8080`

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/YanPontoExe/estokar-pastel-ui
    ```

2.  **Acesse o diretório:**
    ```bash
    cd /estokar-pastel-ui
    ```

3.  **Instale as dependências:**
    ```bash
    npm install 
    ```

4.  **Configuração de Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`.
    * **Variável crucial:** Defina a URL da API do Backend:
        ```env
        REACT_APP_API_URL=http://localhost/8080
        ```

5.  **Inicie a Aplicação:**
    ```bash
    npm run dev
    ```

A aplicação será aberta automaticamente em seu navegador, geralmente em **`http://localhost:8081`**.

---

## 🤝 Comunicação com a API (Backend)

O frontend interage com o Backend através de requisições HTTP RESTful.

* **URL Base da API:** `API_BASE_URL = 'http://localhost:8080'`
* **Biblioteca HTTP:** Fetch API
