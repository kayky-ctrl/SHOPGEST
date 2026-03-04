const API_URL = "https://gestaodepedidos-api.onrender.com/api";

// ==========================================================
// GET DOS CLIENTES E PEDIDOS
// ==========================================================

async function carregarDados() {
  // Clientes
  try {
    const resC = await fetch(`${API_URL}/Clientes`);
    const clientes = await resC.json();
    const listaClientes = document.getElementById("listaClientes");

    listaClientes.innerHTML = clientes
      .map((c) => {
        return `
                    <div class="card">
                        <b>#${c.id} — ${c.nome}</b>
                        <p><strong>CPF:</strong> ${c.cpf}</p>
                        <p><strong>Email:</strong> ${c.email}</p>
                    </div>
                `;
      })
      .join("");
  } catch (error) {
    throw new Error(`Erro ao carregar clientes: ${error.message}`);
  }

  // Pedidos
  try {
    const resP = await fetch(`${API_URL}/pedidos`);
    const pedidos = await resP.json();
    const listaPedidos = document.getElementById("listaPedidos");

    listaPedidos.innerHTML = pedidos
      .map((p) => {
        return `
            <div class="card">
                <b>Pedido #${p.pedidoId}</b>
                <p><strong>Cliente:</strong> ${p.nomeCliente}</p>
                <p><strong>Destino:</strong> ${p.enderecoEntrega}</p>
                <p><strong>Total:</strong> ${p.valorTotal}</p>
            </div>
        `;
      })
      .join("");
  } catch (error) {
    throw new Error(`Erro ao carregar pedidos: ${error.message}`);
  }
}

// ==========================================================
// POST DOS CLIENTES
// ==========================================================

async function criarCliente(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    nome: form.nome.value.trim(),
    cpf: form.cpf.value.trim(),
    email: form.email.value.trim(),
    numeroCartao: form.numeroCartao.value.trim(),
  };

  try {
    const res = await fetch(`${API_URL}/Clientes/Criar-cliente`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const created = await res.json();

    alert(`Cliente criado com sucesso (ID: ${created.id})`);

    form.reset();
    carregarDados();
  } catch (error) {
    throw new Error(`Erro ao criar cliente: ${error.message}`);
  }
}

// ==========================================================
// GET DOS PEDIDOS
// ==========================================================

async function criarPedido(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    clienteId: Number(form.clienteId.value),
    enderecoEntrega: form.enderecoEntrega.value.trim(),
    valorTotal: Number(form.valorTotal.value),
  };

  try {
    const res = await fetch(`${API_URL}/pedidos/criar-pedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const created = await res.json();
    alert(`Pedido criado com sucesso (ID: ${created.id})`);
    form.reset();
    carregarDados();
  } catch (error) {
    throw new Error(`Erro ao criar pedido: ${error.message}`);
  }
}

// ==========================================================
// Load das funções e carregamento inicial dos dados
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formCriarCliente")
    .addEventListener("submit", criarCliente);
  document
    .getElementById("formCriarPedido")
    .addEventListener("submit", criarPedido);
  carregarDados();
});
