document.getElementById('form-usuario').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Z]/g, '');
});
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Alternar la visibilidad del ícono
    if (type === 'password') {
        this.classList.remove('fa-lock-open');
        this.classList.add('fa-lock');
    } else {
        this.classList.remove('fa-lock');
        this.classList.add('fa-lock-open');
    }
});

