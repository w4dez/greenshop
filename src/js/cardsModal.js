
const list = document.getElementById('js-cardList')
const modalBlock = document.getElementById('js-modalBlock')

const closeModal = document.getElementById('js-closeModal')
const backdrop = document.getElementById('js-backdrop')
const body = document.body

const URL = 'https://food-boutique.b.goit.study/api/products/'

import templateModal  from "../templates/cardsModal.hbs";


const setCardFn = async(e) => {
    // console.log(e.target);
    const item = e.target.closest("li")
    const btn = e.target.closest("button")

    let idElement = ''
    if (item) {
        idElement = item.dataset.id
        
    }
    if(!btn) {
        toggleModal()

    }

    // console.log(idElement);

    const response = await fetch(URL+idElement)
    const card = await response.json()

     
    modalBlock.innerHTML = templateModal(card)
    


    
}

const toggleModal = () => {
    backdrop.classList.toggle('show')
    body.classList.toggle('bodyOverflow')
}


list.addEventListener('click', (e) => {
    setCardFn(e)



})





backdrop.addEventListener('click', (e) => {

    console.log(e.target);
    

    const close = e.target.closest("button")


    if (close.classList.contains('closeModal')) {
        toggleModal()
        console.log('btn');

        
    }

})