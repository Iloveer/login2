document.addEventListener('DOMContentLoaded', () => {
    const btnRcprTrue = document.querySelector('#btn-rcpr-true');
    const btnRcprFalse = document.querySelector('#btn-rcpr-false');

    btnRcprTrue.addEventListener('click', function (event) {
        event.preventDefault();
        const tipo = 'href';
        if (tipo) {
            window.location.href = './confirmar.html';
        }
    });
    btnRcprFalse.addEventListener('click', function (event) {
        event.preventDefault();
        const tipo = 'href';
        if (tipo) {
            window.location.href = './login.html';
        }
    });

});
