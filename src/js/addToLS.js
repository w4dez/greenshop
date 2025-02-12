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
        // const response = await fetch(URL+idElement)
        // const card = await response.json()
        console.log(typeof cardsBasket)
        cardsBasket.push(idElement)
        localStorage.setItem('productsId', JSON.stringify(cardsBasket))


        console.log('btndfffdfdfdfd');
        

    }
    console.log('btnntntntntn');
    
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



        

    }

    




    
}




backdrop.addEventListener('click', (e) => {

    // console.log(e.target);
    

    const btnModal = e.target.closest("button")


    if (btnModal.classList.contains('addToCard')) {
        addCardFnModal(e)
        console.log('btn');

        
    }

})



discountList.addEventListener('click', (e) => {


    const btn = e.target.closest("button")


    if (btn.classList.contains('addToCard')) {
        addCardFnModal(e)
        console.log('btn');

        
    }

})

popularList.addEventListener('click', (e) => {


    const btn = e.target.closest("button")


    if (btn.classList.contains('addToCard')) {
        addCardFnModal(e)
        console.log('btn');

        
    }

})




