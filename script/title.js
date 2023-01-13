const spanContainers = document.querySelectorAll('.title div');
const txtAnim = document.querySelector('.popup');
const cvAnim = document.querySelector('#cv')

spanContainers.forEach(item => {

    const letters = item.children[0].textContent.split('');
    item.innerHTML = "";

    letters.forEach((el, index) => {
        item.innerHTML += `<span style="transition-delay: ${0.02 * index}s">${el}</span>`
    })
});



new Typewriter(txtAnim, {
    loop: true,
    deleteSpeed: 20,
    delay: 50,
    cursor: '<span style="color: #eff1e6">|</span>'
})
.typeString('<span style="color: #eff1e6">À Propos</span>')
.pauseFor(5000)
.deleteChars(8)
.typeString('<span style="color: #eff1e6">About</span>')
.pauseFor(2500)
.deleteChars(5)
.start();

new Typewriter(cvAnim, {
    loop: true,
    deleteSpeed: 20,
    delay: 50,
    cursor: '<span style="color: #eff1e6">|</span>'
})
.typeString('<span style="color: #eff1e6">CV</span>')
.pauseFor(5000)
.deleteChars(1)
.typeString('<span style="color: #eff1e6">URRICULUM VITÆ</span>')
.pauseFor(2500)
.deleteChars(16)
.start();

const loader = document.querySelector('#loaders');
const desac = document.querySelector('.loader')

window.addEventListener('load', () => {
    loader.classList.add('fondu-out'),
    desac.classList.remove('loader'),
    loader.classList.remove('loader-container');
})