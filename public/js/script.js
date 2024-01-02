document.addEventListener('DOMContentLoaded', function () {
    const allButtons = document.querySelectorAll('.searchBtn')
    const searchBtn = document.querySelector('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.getElementById('searchInput')
    const searchClose = document.getElementById('searchClose')

    for(let i= 0; i< allButtons.length; i++) {
        allButtons[i].addEventListener('click', ()=> {
            searchBar.style.visibility = 'visible';
            searchBtn.style.visibility = 'hidden';
            searchBar.classList.add('open')
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        })
    }

    searchClose.addEventListener('click', () => {
        searchBtn.style.visibility = 'visible';
        searchBar.style.visibility = "hidden";
        searchBar.classList.remove('open')
        this.setAttribute('aria-expanded', 'false')
    })

})