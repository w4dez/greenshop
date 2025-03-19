import { updateBasketSpans } from './cart.js';

const list = document.getElementById('js-cardList')

// let cardsBasket = localStorage.getItem('productsId') || []
let cardsBasket = JSON.parse(localStorage.getItem('productsId')) || []

const popularList = document.getElementById('js-popularList')
const discountList = document.getElementById('js-discountList')

const backdrop = document.getElementById('js-backdrop')

const URL = 'https://food-boutique.b.goit.study/api/products/'




const addCardFn = async(e) => {

    const item = e.target.closest("li")
    const btn = e.target.closest('button')
    let idElement = ''
    if (item) {
        idElement = item.dataset.id
        
    }

    if (btn) {

        console.log(typeof cardsBasket)
        cardsBasket.push(idElement)
        localStorage.setItem('productsId', JSON.stringify(cardsBasket))
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#fff"></i>'
        
        // Update basket span with new count
        updateBasketSpans(cardsBasket.length)



        

    }

    
    console.log(idElement);



    
}

list.addEventListener('click', (e) => {

    


    addCardFn(e)

})





const addCardFnModal = async(e) => {


    const btn = e.target.closest('button')


    if (btn) {
        idElement = btn.dataset.id

        await cardsBasket.push(idElement)
        
        
        localStorage.setItem('productsId', JSON.stringify(cardsBasket))
        
        // Update basket span with new count
        updateBasketSpans(cardsBasket.length)



        

    }

    




    
}




const renderFn = (e, check) => {
    const btn = e.target.closest("button")


    if (btn.classList.contains('addToCard')) {
        addCardFnModal(e)

        btn.innerHTML = check
    }
}




backdrop.addEventListener('click', (e) => {




    renderFn(e, '<i class="fa-solid fa-check"></i>')


})



discountList.addEventListener('click', (e) => {


    renderFn(e, '<i class="fa-solid fa-check" style="color:#fff"></i>')

})

popularList.addEventListener('click', (e) => {

    renderFn(e, '<i class="fa-solid fa-check" style="color:#586f1f; width: 4px; height:5px; margin: 0 10px 10px 0"></i>')


})


// Initialize basket span on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBasketSpans(cardsBasket.length);
});




