# Endpoints do Backend Spring Boot

Este documento descreve todos os endpoints REST que o backend Spring Boot deve implementar para o sistema EstoKar.

## URL Base
```
http://localhost:8080
```

## Headers
Todas as requisições devem incluir:
```
Content-Type: application/json
```

---

## 1. Marcas

### GET /Marcas
Lista todas as marcas cadastradas.

**Response:**
```json
[
  {
    "id": "uuid",
    "nome_marca": "string",
    "pais_origem": "string",
    "descricao": "string",
    "status": boolean,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### GET /Marcas/{id}
Busca uma marca específica por ID.

### POST /Marcas
Cria uma nova marca.

**Body:**
```json
{
  "nome_marca": "string",
  "pais_origem": "string",
  "descricao": "string"
}
```

### PUT /Marcas/{id}
Atualiza uma marca existente.

### DELETE /Marcas/{id}
Remove uma marca.

---

## 2. Materiais

### GET /Materiais
Lista todos os materiais cadastrados.

**Response:**
```json
[
  {
    "id": "uuid",
    "codigo": "string",
    "descricao": "string",
    "marca": "string",
    "quantidade_estoque": number,
    "unidade": "string",
    "estoque_minimo": number,
    "localizacao": "string",
    "status": boolean,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### GET /Materiais/{id}
Busca um material específico por ID.

### POST /Materiais
Cria um novo material.

**Body:**
```json
{
  "codigo": "string",
  "descricao": "string",
  "cod_marca": "uuid",
  "cod_fornecedor": "uuid",
  "quantidade_estoque": number,
  "unidade": "string",
  "estoque_minimo": number,
  "localizacao": "string"
}
```

### PUT /Materiais/{id}
Atualiza um material existente.

### DELETE /Materiais/{id}
Remove um material.

---

## 3. Funcionários

### GET /Funcionarios
Lista todos os funcionários cadastrados.

**Response:**
```json
[
  {
    "id": "uuid",
    "nome": "string",
    "cpf": "string",
    "setor": "string",
    "turno": "Manhã|Tarde|Noite",
    "status": boolean,
    "data_contratacao": "date",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### GET /Funcionarios/{id}
Busca um funcionário específico por ID.

### POST /Funcionarios
Cria um novo funcionário.

**Body:**
```json
{
  "nome": "string",
  "cpf": "string",
  "cod_setor": "uuid",
  "turno": "Manhã|Tarde|Noite",
  "data_contratacao": "date"
}
```

### PUT /Funcionarios/{id}
Atualiza um funcionário existente.

### DELETE /Funcionarios/{id}
Remove um funcionário.

---

## 4. Setores

### GET /Setores
Lista todos os setores cadastrados.

**Response:**
```json
[
  {
    "id": "uuid",
    "descricao": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### GET /Setores/{id}
Busca um setor específico por ID.

### POST /Setores
Cria um novo setor.

**Body:**
```json
{
  "descricao": "string"
}
```

### PUT /Setores/{id}
Atualiza um setor existente.

### DELETE /Setores/{id}
Remove um setor.

---

## 5. Entradas

### GET /Entradas
Lista todas as movimentações de entrada.

**Response:**
```json
[
  {
    "id": "uuid",
    "data_entrada": "timestamp",
    "codigo": "string",
    "material": "string",
    "quantidade": number,
    "fornecedor": "string",
    "nota_fiscal": "string",
    "observacoes": "string",
    "created_at": "timestamp"
  }
]
```

### GET /Entradas/{id}
Busca uma entrada específica por ID.

### POST /Entradas
Registra uma nova entrada de material.

**Body:**
```json
{
  "cod_material": "uuid",
  "cod_fornecedor": "uuid",
  "cod_usuario": "uuid",
  "quantidade": number,
  "data_entrada": "timestamp",
  "nota_fiscal": "string",
  "observacoes": "string"
}
```

### PUT /Entradas/{id}
Atualiza uma entrada existente.

### DELETE /Entradas/{id}
Remove uma entrada.

---

## 6. Saídas

### GET /Saidas
Lista todas as movimentações de saída.

**Response:**
```json
[
  {
    "id": "uuid",
    "data_saida": "timestamp",
    "codigo": "string",
    "material": "string",
    "quantidade": number,
    "usuario": "string",
    "motivo": "venda|transferência|devolução|uso interno|descarte",
    "observacoes": "string",
    "created_at": "timestamp"
  }
]
```

### GET /Saidas/{id}
Busca uma saída específica por ID.

### POST /Saidas
Registra uma nova saída de material.

**Body:**
```json
{
  "cod_material": "uuid",
  "cod_funcionario": "uuid",
  "cod_usuario": "uuid",
  "quantidade": number,
  "data_saida": "timestamp",
  "motivo": "venda|transferência|devolução|uso interno|descarte",
  "observacoes": "string"
}
```

### PUT /Saidas/{id}
Atualiza uma saída existente.

### DELETE /Saidas/{id}
Remove uma saída.

---

## 7. Usuários

### GET /Usuarios
Lista todos os usuários do sistema.

**Response:**
```json
[
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "admin|gerente|operador|consultor",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

### GET /Usuarios/{id}
Busca um usuário específico por ID.

### POST /Usuarios
Cria um novo usuário.

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "admin|gerente|operador|consultor"
}
```

### PUT /Usuarios/{id}
Atualiza um usuário existente.

### DELETE /Usuarios/{id}
Remove um usuário.

---

## 8. Dashboard

### GET /Dashboard/stats
Retorna estatísticas gerais do sistema.

**Response:**
```json
[
  {
    "title": "Total de Materiais",
    "value": "string",
    "icon": "Package",
    "description": "Itens cadastrados"
  },
  {
    "title": "Funcionários Ativos",
    "value": "string",
    "icon": "Users",
    "description": "No sistema"
  },
  {
    "title": "Entradas (Mês)",
    "value": "string",
    "icon": "ArrowDownToLine",
    "description": "Últimos 30 dias"
  },
  {
    "title": "Saídas (Mês)",
    "value": "string",
    "icon": "ArrowUpFromLine",
    "description": "Últimos 30 dias"
  }
]
```

### GET /Dashboard/recent-activity
Retorna as atividades recentes do sistema.

**Response:**
```json
[
  {
    "action": "string",
    "item": "string",
    "time": "string"
  }
]
```

### GET /Dashboard/low-stock
Retorna materiais com estoque baixo.

**Response:**
```json
[
  {
    "name": "string",
    "qty": number,
    "min": number
  }
]
```

---

## Configuração CORS

O backend deve permitir requisições da origem do frontend:
- Desenvolvimento: `http://localhost:5173` ou porta configurada no Vite
- Produção: domínio de produção do frontend

## Tratamento de Erros

Todos os endpoints devem retornar erros no formato:
```json
{
  "error": "string",
  "message": "string",
  "timestamp": "timestamp"
}
```

Códigos de status HTTP:
- 200: Sucesso
- 201: Criado
- 400: Requisição inválida
- 404: Não encontrado
- 500: Erro interno do servidor
