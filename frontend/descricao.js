document.addEventListener("DOMContentLoaded", () => {
    fetchProduto();
});

function fetchProduto() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (!id) {
        console.error("ID do produto não encontrado na URL.");
        return;
    }

    fetch(`http://localhost:8000/api/produtos/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Produto não encontrado.");
            }
            return res.json();
        })
        .then(produto => renderProduto(produto))
        .catch(err => {
            console.error("Erro ao buscar o produto", err);
            const container = document.getElementById("produtos-container");
            container.innerHTML = "<p>Produto não encontrado.</p>";
        });
}

function renderProduto(produto) {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
        <h2>${produto.nome}</h2>
        <div>
           <img src="${produto.imagem}" alt="${produto.nome}" />
        </div>
        <p>${produto.descricao}</p>
        <p class="preco">R$ ${produto.preco}</p>
        <p><strong>Categoria: </strong> ${produto.categoria?.nome || "Sem categoria"} </p>
    `;
    container.appendChild(card);
}
