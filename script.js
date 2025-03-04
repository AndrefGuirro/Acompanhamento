let clientes = [];

// Função para corrigir o problema de codificação do "Litrão"
function corrigirTexto(texto) {
  if (!texto) return "";
  return texto.replace("Litrï¿½o", "Litrão");
}

// Função para carregar o CSV e exibir os clientes na tabela
async function carregarCSV() {
  const response = await fetch("clientes.csv");
  const data = await response.text();

  const linhas = data.split("\n").map(linha => linha.trim()).filter(linha => linha);
  const cabecalho = linhas[0].split(";");
  
  // Criar o array de clientes
  clientes = linhas.slice(1).map(linha => {
    const valores = linha.split(";");
    let cliente = {};
    cabecalho.forEach((coluna, index) => {
      cliente[coluna.trim()] = corrigirTexto(valores[index]?.trim());
    });
    return cliente;
  });

  // Exibir os clientes ao carregar o CSV
  exibirClientes(clientes);
}

// Função para exibir os clientes na tabela
function exibirClientes(clientesFiltrados) {
  let tabela = document.getElementById("tabela-clientes");
  tabela.innerHTML = ""; // Limpa a tabela antes de exibir os dados

  // Exibe os clientes na tabela
  clientesFiltrados.forEach(cliente => {
    let linha = `<tr>
      <td>${cliente["CODIGO"]}</td>
      <td>${cliente["CLIENTE"]}</td>
      <td>${cliente["TIPO"]}</td>
      <td>${cliente["QTDE"]}</td>
    </tr>`;
    tabela.innerHTML += linha;
  });
}

// Função para filtrar os clientes conforme a busca
function filtrarClientes() {
  const input = document.getElementById("search-input").value.toLowerCase();
  
  // Filtra os clientes com base no que o usuário digitou
  const clientesFiltrados = clientes.filter(cliente => {
    return (
      cliente["CODIGO"].toLowerCase().includes(input) ||
      cliente["CLIENTE"].toLowerCase().includes(input) ||
      cliente["TIPO"].toLowerCase().includes(input)
    );
  });

  // Exibe os resultados filtrados
  exibirClientes(clientesFiltrados);

  // Mostrar ou esconder o "X" dependendo se há pesquisa
  const clearButton = document.getElementById("clear-search");
  if (input.length > 0) {
    clearButton.classList.add("show");
  } else {
    clearButton.classList.remove("show");
  }
}

// Função para limpar a busca
function limparBusca() {
  document.getElementById("search-input").value = ""; // Limpa o campo de pesquisa
  exibirClientes(clientes); // Exibe todos os clientes novamente
  const clearButton = document.getElementById("clear-search");
  clearButton.classList.remove("show"); // Esconde o "X"
}

// Carregar os clientes ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarCSV();
});
