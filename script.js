const veiculos = [
    { marca: "Fiat", modelo: "Uno", ano: 2012, valorCompra: 18000, valorAtual: 22000, cor: "Branco" },
    { marca: "Volkswagen", modelo: "Gol", ano: 2020, valorCompra: 40000, valorAtual: 46000, cor: "Prata" },
    { marca: "Chevrolet", modelo: "Onix", ano: 2022, valorCompra: 60000, valorAtual: 65000, cor: "Preto" },
    { marca: "Toyota", modelo: "Corolla", ano: 2018, valorCompra: 85000, valorAtual: 90000, cor: "Cinza" },
    { marca: "Honda", modelo: "Civic", ano: 2015, valorCompra: 55000, valorAtual: 60000, cor: "Azul" },
];

const anoAtual = new Date().getFullYear();


const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });


const calcularLucro = veiculo => veiculo.valorCompra * 0.03;
const calcularIPVA = veiculo => veiculo.valorAtual * 0.04;
const calcularLicenciamento = veiculo => (anoAtual - veiculo.ano <= 10 ? 160 : 0);


const veiculosCompletos = veiculos.map(veiculo => ({
    ...veiculo,
    lucro: calcularLucro(veiculo),
    ipva: calcularIPVA(veiculo),
    licenciamento: calcularLicenciamento(veiculo),
}));


const tabela = document.createElement("table");

const thead = tabela.createTHead();
const trHead = thead.insertRow();
["Marca", "Modelo", "Ano", "Cor", "Valor de compra", "Valor atual", "Lucro (3%)", "IPVA (4%)", "Licenciamento"]
    .forEach(titulo => {
        const th = document.createElement("th");
        th.textContent = titulo;
        trHead.appendChild(th);
    });

const tbody = tabela.createTBody();
veiculosCompletos.forEach(v => {
    const tr = tbody.insertRow();
    [
        v.marca,
        v.modelo,
        v.ano,
        v.cor,
        moeda(v.valorCompra),
        moeda(v.valorAtual),
        moeda(v.lucro),
        moeda(v.ipva),
        moeda(v.licenciamento),
    ].forEach(valor => {
        tr.insertCell().textContent = valor;
    });
});

document.getElementById("estoque").appendChild(tabela);