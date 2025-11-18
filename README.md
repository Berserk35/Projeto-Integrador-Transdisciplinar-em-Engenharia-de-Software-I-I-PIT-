# ⚔️ BERSERK ARMOR - E-commerce de Cupcakes

E-commerce de cupcakes artesanais desenvolvido por **Sivaldo Silva** para o PIT de Engenharia de Software II.

## 🎯 Sobre o Projeto

Sistema completo de e-commerce com frontend moderno e backend robusto, implementando funcionalidades de autenticação, catálogo de produtos, carrinho de compras e gestão de pedidos.

## ✨ Funcionalidades

### Usuário
- Cadastro com validações
- Login com senhas criptografadas (bcrypt)
- Catálogo de produtos
- Filtros por categoria
- Busca por nome
- Carrinho de compras persistente
- Controle de quantidade
- Controle de estoque
- Finalização de pedidos
- Histórico de pedidos

### Sistema
- 6 produtos em 4 categorias
- API REST completa
- Banco de dados JSON
- Validações frontend e backend
- Design responsivo
- Tema preto + azul gradiente

## 🚀 Instalação Rápida

### Pré-requisitos
- Node.js 18 ou superior
- Navegador moderno

### Instalação em 2 Passos

#### Windows:
1. Duplo clique em `INSTALAR-WINDOWS.bat`
2. Aguardar instalação concluir

#### Mac/Linux:
```bash
cd backend
npm install
```

## 💻 Como Usar

### Método 1: Scripts .bat (Windows)
1. Duplo clique em `INICIAR.bat`
2. Aguardar backend iniciar
3. Abrir `frontend/index.html` no navegador

### Método 2: VS Code (F5)
1. Abrir projeto no VS Code
2. Pressionar `F5`
3. Backend inicia automaticamente
4. Abrir `frontend/index.html` com Live Server

### Método 3: Terminal
```bash
# Backend
cd backend
npm start

# Frontend
# Abrir frontend/index.html no navegador
```

## 📁 Estrutura do Projeto

```
BerserkArmor/
├── backend/
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependências
│   └── db.json            # Banco de dados
│
├── frontend/
│   ├── index.html         # Landing page
│   ├── login.html         # Login
│   ├── cadastro.html      # Cadastro
│   ├── produtos.html      # Catálogo
│   ├── carrinho.html      # Carrinho
│   ├── pedidos.html       # Histórico
│   └── style.css          # Estilos
│
├── .vscode/
│   └── launch.json        # Configuração F5
│
├── INSTALAR-WINDOWS.bat   # Instalador
└── INICIAR.bat            # Inicializador
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/cadastro` - Cadastrar usuário
- `POST /api/login` - Fazer login

### Produtos
- `GET /api/produtos` - Listar produtos
- `GET /api/produtos/:id` - Buscar produto
- Query params: `?categoria=chocolate&busca=termo`

### Pedidos
- `POST /api/pedidos` - Criar pedido
- `GET /api/pedidos/:usuarioId` - Listar pedidos do usuário

### Sistema
- `GET /api/health` - Verificar status

## 🎨 Design

### Tema: Preto + Azul Gradiente
- Preto: #000000, #1a1a1a, #2d2d2d
- Azul: #0066ff, #00ccff, #0044cc
- Gradientes azul neon
- Efeitos glow nos hovers

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Validações frontend e backend
- CORS configurado
- Tratamento de erros

## 📊 Tecnologias

### Backend
- Node.js 18+
- Express 4.19
- bcryptjs 2.4.3
- CORS 2.8.5

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+
- LocalStorage

## 🐛 Troubleshooting

### Backend não inicia
```bash
cd backend
rm -rf node_modules
npm install
npm start
```

### Porta 3000 ocupada
**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <numero> /F
```

### Produtos não aparecem
- Verificar se backend está rodando
- Abrir DevTools (F12) → Console
- Verificar erros

## ✅ Checklist de Apresentação

### 1 Dia Antes:
- [ ] Testar em outro computador
- [ ] Fazer backup em pendrive

### No Dia (30 min antes):
- [ ] Copiar projeto
- [ ] Executar INICIAR.bat
- [ ] Abrir frontend/index.html
- [ ] Fazer 1 cadastro teste
- [ ] Adicionar 1 produto ao carrinho
- [ ] Finalizar 1 pedido

## 📝 Licença

Projeto acadêmico - Livre para uso educacional

## 👨‍💻 Desenvolvedor

**Sivaldo Silva**  
Engenharia de Software II

---

## 🎉 Status do Projeto

✅ **PRONTO PARA PRODUÇÃO**