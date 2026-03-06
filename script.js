const API_URL = "https://gestaodepedidos-api.onrender.com/api";

// --- CARREGAR CLIENTES ---
async function carregarClientes() {
    const listaClientes = document.getElementById("listaClientes");

    try {
        const res = await fetch(`${API_URL}/Clientes`);
        const clientes = await res.json();
        listaClientes.innerHTML = clientes.map(c => `
            <div class="card">
                <b>#${c.id} — ${c.nome}</b>
                <p><strong>CPF:</strong> ${c.cpf}</p>
                <p><strong>Email:</strong> ${c.email}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

// --- CARREGAR PEDIDOS ---
async function carregarPedidos() {
    const listaPedidos = document.getElementById("listaPedidos");
    if (!listaPedidos) return;

    try {
        const res = await fetch(`${API_URL}/pedidos`);
        const pedidos = await res.json();
        listaPedidos.innerHTML = pedidos.map(p => `
            <div class="card">
                <b>Pedido #${p.pedidoId}</b>
                <p><strong>Cliente:</strong> ${p.nomeCliente}</p>
                <p><strong>Destino:</strong> ${p.enderecoEntrega}</p>
                <p><strong>Total:</strong> R$ ${p.valorTotal}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
    }
}

// --- CRIAR CLIENTE ---
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
        alert(`Cliente criado com sucesso!`);
        form.reset();
        carregarClientes();
    } catch (error) {
        alert("Erro ao criar cliente.");
    }
}

// --- CRIAR PEDIDO ---
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
        alert(`Pedido criado com sucesso!`);
        form.reset();
        carregarPedidos();
    } catch (error) {
        alert("Erro ao criar pedido.");
    }
}

// --- PREENCHER SELECT DE CLIENTES ---
async function popularSelectClientes() {
    const select = document.getElementById("selectClientes");
    try {
        const res = await fetch(`${API_URL}/Clientes`);
        const clientes = await res.json();

        select.innerHTML = '<option value="">Selecione um cliente</option>';

        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
            select.appendChild(option);
        });
    } catch (error) {
        select.innerHTML = '<option value="">Erro ao carregar clientes</option>';
        console.error("Erro ao popular select:", error);
    }
}

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    const formCliente = document.getElementById("formCriarCliente");
    const formPedido = document.getElementById("formCriarPedido");

    if (formCliente) formCliente.addEventListener("submit", criarCliente);
    if (formPedido) formPedido.addEventListener("submit", criarPedido);

    popularSelectClientes();
    carregarClientes();
    carregarPedidos();
});