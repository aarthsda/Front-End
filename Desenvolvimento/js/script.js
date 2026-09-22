const botaoLogout = document.querySelector('div#usuarioInfo a.botao');

botaoLogout.addEventListener('click', () => {
    console.log('clicou no Logout');
});

const botaoExcluir = document.querySelector('a.botao.excluir');

botaoExcluir.addEventListener('mouseover', () => {
    botaoExcluir.classList.remove('excluir');
});

const botoesExcluir = document.querySelectorAll("a.excluir");

for (const botao of botoesExcluir) {
    botao.addEventListener("click", () => excluir(botao));
}

function excluir(item) {
    if (confirm("Deseja realmente excluir?")) {
        const tabela = item.closest("table");
        item.parentNode.parentNode.remove();
        atualizarTotal(tabela);
    }
}

function atualizarTotal(tabela) {
    tabela.tFoot.querySelector("span#Total").textContent = tabela.tBodies[0].rows.length;
}

const profissionais = [
  {
    "id": 1,
    "nome": "Maria Adelia Serravalle Bezerra",
    "registro": "CRM/AC 377",
    "especialidade": "Cardiologia",
    "unidade": "Bela Vista",
    "telefone": "(68) 98205-4704",
    "email": "monique.nespoli@uol.com.br"
  },
  {
    "id": 2,
    "nome": "Elielson Silveira Andrade",
    "registro": "CRM/AC 455",
    "especialidade": "Cardiologia",
    "unidade": "Bela Vista",
    "telefone": "(68) 98085-4910",
    "email": "elielson.andrade@gmail.com"
  },
  {
    "id": 3,
    "nome": "Davi Jesus Mendes",
    "registro": "CRM/AC 123",
    "especialidade": "Infectologia",
    "unidade": "Cruzeiro do Sul",
    "telefone": "(68) 98408-5352",
    "email": "davi.mendes@yahoo.com"
  },
  {
    "id": 4,
    "nome": "Carla da Paixão Valle",
    "registro": "CRM/AC 234",
    "especialidade": "Geriatria",
    "unidade": "Bela Vista",
    "telefone": "(68) 98395-5604",
    "email": "carla.valle@gmail.com"
  },
  {
    "id": 5,
    "nome": "Neuza Biango Nobrega",
    "registro": "CRM/AC 232",
    "especialidade": "Dermatologia",
    "unidade": "Bosque",
    "telefone": "(68) 98561-6622",
    "email": "neuza.nobrega@uol.com.br"
  }
];

function carregarDados() {
    const tabela = document.querySelector("table");
    const campos = ["id", "nome", "registro", "especialidade", "unidade", "telefone", "email"];
    tabela.tBodies[0].innerHTML = "";
    for (const item of profissionais) {
        inserirItem(tabela, item, campos);
    }
}

function inserirItem(tabela, item, campos) {
    const linha = document.createElement("tr");
    for (const campo of campos) {
        const td = document.createElement("td");
        td.textContent = item[campo];
        linha.appendChild(td);
    }
    const acoes = document.createElement("td");
    acoes.innerHTML =
        "<a href='javascript:void(0)' class='botao'>Editar</a>\n" +
        "<a href='javascript:void(0)' class='botao excluir'>Excluir</a>";
    linha.appendChild(acoes);
    tabela.tBodies[0].appendChild(linha);
    atualizarTotal(tabela);

    const botaoExcluir = linha.querySelector(".excluir");
    botaoExcluir.addEventListener("click", () => excluir(botaoExcluir));
}

const botaoCarregar = document.querySelector("a#carregar");
botaoCarregar.addEventListener("click", carregarDados);

const form = document.querySelector('form');
const botaoAdicionar = document.querySelector('a#adicionar');
const botaoCancelar = document.querySelector('input[value="Cancelar"]');
const btnSalvar = document.querySelector('input[type="submit"]');
const tabela = document.querySelector('table');

function alternarVisibilidadeForm() {
    [form, botaoAdicionar, botaoCarregar, tabela].forEach(elemento => {
        elemento.classList.toggle('inativo');
    });

    form.reset();
}

[botaoAdicionar, botaoCancelar].forEach(botao => {
    botao.addEventListener('click', alternarVisibilidadeForm);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const item = {
        id: proximoId(),
        nome: form.nome.value,
        registro: form.registro.value,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        telefone: form.telefone.value,
        email: form.email.value
    };

    inserirItem(tabela, item, Object.keys(item));
    alternarVisibilidadeForm();
});

function proximoId() {
    const linhas = tabela.tBodies[0].rows;
    let maior = 0;
    for (const linha of linhas) {
        const id = Number(linha.cells[0].textContent);
        if (id > maior) {
            maior = id;
        }
    }
    return maior + 1;
}

