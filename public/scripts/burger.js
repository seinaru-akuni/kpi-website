const burger = document.getElementById('burger');
const burgerDropdown = document.getElementById('burger-dropdown');
const burgerIcon = document.getElementById('burger-icon');

burgerIcon.addEventListener('click', () => {
    burger.classList.toggle('active');
});