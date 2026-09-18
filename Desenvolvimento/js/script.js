let botaoLogout = document.querySelector('div#usuarioInfo a.botao');

botaoLogout.addEventListener('click', () => {
    console.log('clicou no Logout');
});

let botaoExcluir = document.querySelector('a.botao.excluir');

botaoExcluir.addEventListener('mouseover', () => {
    botaoExcluir.classList.remove('excluir');
});