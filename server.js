// BERSERK ARMOR - E-commerce de Cupcakes Artesanais
// Desenvolvido por Sivaldo Silva

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "db.json");

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData = { usuarios: [], produtos: [], pedidos: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch (error) {
    console.error("Erro ao ler DB:", error.message);
    return { usuarios: [], produtos: [], pedidos: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Erro ao escrever DB:", error.message);
    return false;
  }
}

function popularProdutos() {
  const db = readDB();
  
  if (db.produtos.length === 0) {
    db.produtos = [
      {
        id: 1,
        nome: "Armadura de Chocolate",
        preco: 12.99,
        descricao: "Cobertura de chocolate belga premium com recheio intenso",
        imagem: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400",
        estoque: 50,
        categoria: "chocolate"
      },
      {
        id: 2,
        nome: "Berserker Red Velvet",
        preco: 14.99,
        descricao: "Red velvet clássico com cream cheese e toque especial",
        imagem: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
        estoque: 40,
        categoria: "especial"
      },
      {
        id: 3,
        nome: "Baunilha do Cavaleiro",
        preco: 10.99,
        descricao: "Baunilha de Madagascar com buttercream sedoso",
        imagem: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400",
        estoque: 45,
        categoria: "classico"
      },
      {
        id: 4,
        nome: "Morango da Batalha",
        preco: 11.99,
        descricao: "Morangos frescos com chantilly artesanal",
        imagem: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400",
        estoque: 35,
        categoria: "frutas"
      },
      {
        id: 5,
        nome: "Limão Celestial",
        preco: 11.99,
        descricao: "Limão siciliano refrescante com toque cítrico",
        imagem: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400",
        estoque: 30,
        categoria: "frutas"
      },
      {
        id: 6,
        nome: "Eclipse de Nutella",
        preco: 15.99,
        descricao: "Nutella premium com avelãs caramelizadas",
        imagem: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
        estoque: 25,
        categoria: "especial"
      }
    ];
    
    writeDB(db);
    console.log("Produtos carregados com sucesso");
  }
}

popularProdutos();

app.post("/api/cadastro", async (req, res) => {
  try {
    const { nome, email, senha, telefone, endereco } = req.body;
    
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
    }
    
    if (senha.length < 6) {
      return res.status(400).json({ erro: "Senha deve ter no mínimo 6 caracteres" });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: "Email inválido" });
    }
    
    const db = readDB();
    
    if (db.usuarios.find(u => u.email === email)) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }
    
    const senhaHash = await bcrypt.hash(senha, 10);
    
    const novoUsuario = {
      id: db.usuarios.length + 1,
      nome,
      email,
      senha: senhaHash,
      telefone: telefone || "",
      endereco: endereco || "",
      dataCadastro: new Date().toISOString()
    };
    
    db.usuarios.push(novoUsuario);
    writeDB(db);
    
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    
    res.status(201).json({ 
      mensagem: "Cadastro realizado com sucesso!",
      usuario: usuarioSemSenha
    });
    
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }
    
    const db = readDB();
    const usuario = db.usuarios.find(u => u.email === email);
    
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }
    
    const { senha: _, ...usuarioSemSenha } = usuario;
    
    res.json({ 
      mensagem: "Login realizado com sucesso!",
      usuario: usuarioSemSenha
    });
    
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

app.get("/api/produtos", (req, res) => {
  try {
    const db = readDB();
    const { categoria, busca } = req.query;
    
    let produtos = db.produtos;
    
    if (categoria && categoria !== "todos") {
      produtos = produtos.filter(p => p.categoria === categoria);
    }
    
    if (busca) {
      const termo = busca.toLowerCase();
      produtos = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
      );
    }
    
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});

app.get("/api/produtos/:id", (req, res) => {
  try {
    const db = readDB();
    const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
    
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }
    
    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

app.post("/api/pedidos", (req, res) => {
  try {
    const { usuarioId, itens, total } = req.body;
    
    if (!usuarioId || !itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: "Dados do pedido inválidos" });
    }
    
    const db = readDB();
    
    if (!db.usuarios.find(u => u.id === usuarioId)) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    for (const item of itens) {
      const produto = db.produtos.find(p => p.id === item.produtoId);
      if (!produto) {
        return res.status(404).json({ erro: `Produto ${item.produtoId} não encontrado` });
      }
      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ erro: `Estoque insuficiente para ${produto.nome}` });
      }
    }
    
    for (const item of itens) {
      const produto = db.produtos.find(p => p.id === item.produtoId);
      produto.estoque -= item.quantidade;
    }
    
    const novoPedido = {
      id: db.pedidos.length + 1,
      usuarioId,
      itens,
      total,
      status: "pendente",
      dataPedido: new Date().toISOString()
    };
    
    db.pedidos.push(novoPedido);
    writeDB(db);
    
    res.status(201).json({ 
      mensagem: "Pedido realizado com sucesso!",
      pedido: novoPedido
    });
    
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ erro: "Erro ao criar pedido" });
  }
});

app.get("/api/pedidos/:usuarioId", (req, res) => {
  try {
    const db = readDB();
    const usuarioId = parseInt(req.params.usuarioId);
    
    const pedidos = db.pedidos.filter(p => p.usuarioId === usuarioId);
    
    const pedidosDetalhados = pedidos.map(pedido => {
      const itensDetalhados = pedido.itens.map(item => {
        const produto = db.produtos.find(p => p.id === item.produtoId);
        return {
          ...item,
          nome: produto ? produto.nome : "Produto removido",
          imagem: produto ? produto.imagem : ""
        };
      });
      
      return { ...pedido, itens: itensDetalhados };
    });
    
    res.json(pedidosDetalhados);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ erro: "Erro ao listar pedidos" });
  }
});

app.get("/api/health", (req, res) => {
  const db = readDB();
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    stats: {
      usuarios: db.usuarios.length,
      produtos: db.produtos.length,
      pedidos: db.pedidos.length
    }
  });
});

app.listen(PORT, () => {
  console.log("\n========================================");
  console.log("  BERSERK ARMOR - E-commerce");
  console.log("  Desenvolvido por Sivaldo Silva");
  console.log("========================================");
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log("========================================\n");
});
