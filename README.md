# 🛒 ShopGest - Painel de Gestão de Pedidos

O **ShopGest** é uma interface web moderna e funcional desenvolvida para o gerenciamento de clientes e pedidos. O projeto consome uma API externa para realizar operações de cadastro e listagem em tempo real, oferecendo uma experiência de usuário limpa e responsiva.

## 🚀 Funcionalidades

* **Cadastro de Clientes:** Formulário completo para registrar nome, CPF, e-mail e dados de cartão.
* **Gestão de Pedidos:** Vinculação de novos pedidos a clientes existentes informando o endereço e valor total.
* **Listagem Dinâmica:** Visualização instantânea de todos os clientes e pedidos armazenados no banco de dados.
* **Interface Responsiva:** Layout adaptado para diferentes dispositivos utilizando CSS Grid e Flexbox.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da aplicação.
* **CSS3:** Estilização personalizada com a fonte *Poppins* e efeitos de interação (*hover*) nos cards.
* **JavaScript (ES6+):** Manipulação assíncrona do DOM e consumo de API via `fetch`.
* **API:** Integração com o serviço `gestaodepedidos-api.onrender.com`.

## 📂 Estrutura de Arquivos

* `index.html`: Contém a estrutura dos formulários e os containers de exibição.
* `style.css`: Define a identidade visual, cores e o grid do painel.
* `script.js`: Gerencia as requisições GET/POST e a renderização dos dados.

## ⚙️ Como Executar

1. Clone este repositório ou baixe os arquivos fonte.
2. Certifique-se de que os arquivos `index.html`, `style.css` e `script.js` estejam no mesmo diretório.
3. Abra o arquivo `index.html` em seu navegador preferido.
4. **Nota:** É necessária conexão com a internet para carregar as fontes do Google e comunicar-se com a API externa.

## 🔗 Endpoints Principais

A aplicação interage com os seguintes recursos da API:
* `GET /api/Clientes` e `POST /api/Clientes/Criar-cliente`
* `GET /api/pedidos` e `POST /api/pedidos/criar-pedido`

---
Desenvolvido para facilitar o controle de fluxo de vendas e cadastros.