import ProductsTemplate from "../templates/cartProduct.hbs";
import EmptyBasket from "../templates/empty-basket.hbs"
import Basket from "../templates/basket.hbs"
// import { getCards } from "./cards"
import imgEmpty from "../images/basket-img.png"
import greenCard from "../images/cart-green.svg"
const list = document.querySelector(".products_list")
const productContent = document.querySelector(".product__content")
const showSum = document.querySelector(".summary")
const deleteAllBtn = document.querySelector(".delete_all-btn")
const cartCount = document.querySelector(".cart_count")
let sum = 0


const getProductsFromStorage = () => JSON.parse(localStorage.getItem("productsId")) || [];

const updateBasketSpans = () => {
    const count = getProductsFromStorage().length;
    
    const basketSpans = document.querySelectorAll(".basket_span")
    basketSpans.forEach(span => {
        span.textContent = `(${count})`
    })
    
    if (cartCount) {
        cartCount.textContent = `(${count})`
    }
    
    return count;
}

const initCartCount = () => {
    updateBasketSpans();
}

document.addEventListener('DOMContentLoaded', () => {
    initCartCount();
})

const sumOfProducts = () => {
    let sumOfProducts = 0
    const productsId = getProductsFromStorage();
    
    productsId.forEach(async (item) => {
        const res = await fetch(`https://food-boutique.b.goit.study/api/products/${item}`)
        const product = await res.json()
        sumOfProducts += product.price
    })
    return sumOfProducts
}

const renderProducts = () => {
    const productsId = getProductsFromStorage();
    
    if (productsId.length === 0) {
        if (list) list.innerHTML = "";
        return;
    }
    
    sum = 0;
    
    if (list) list.innerHTML = "";
    
    productsId.forEach(async (id) => {
        const res = await fetch(`https://food-boutique.b.goit.study/api/products/${id}`)
        const product = await res.json()
        
        const params = {
            id: product._id,
            img: product.img,
            title: product.name,
            price: product.price,
            count: 1,
            category: product.category,
            size:product.size
        }

        if (list) {
            list.insertAdjacentHTML("afterbegin", ProductsTemplate(params))
            sum += product.price
            
            if (showSum) {
                showSum.textContent = `$${sum.toFixed(2)}`
            }
        }
    });
    
    updateBasketSpans();
}

if (list) {
    list.addEventListener("click", (e) => {
        console.log('click', e.target);
        const liItem = e.target.closest("li")
    
        const deleteBtn = e.target.closest('.delete_btn')
        if (deleteBtn) {
            console.log('click delete');
            const id = e.target.parentElement.dataset.id
            const productsId = getProductsFromStorage();
            productsId.splice(productsId.indexOf(id), 1)
            localStorage.setItem("productsId", JSON.stringify(productsId))
    
            liItem.remove()
            const price = liItem.querySelector(".product_price").textContent
            sum -= +price
            
            if (showSum) {
                showSum.textContent = `$${sum.toFixed(2)}`
            }
            
            updateBasketSpans();
        }
    
        let sumOfProducts = 0;
    
        if (e.target.classList.contains('plus')) {
            const counter = e.target.closest(".product_counter")
            let quantity = counter.querySelector(".quantity")
            console.log(quantity);
            let count = +quantity.textContent + 1
    
            const price = e.target.closest("li").querySelector(".product_price")
    
            quantity.textContent = count
            sumOfProducts = +price.textContent * count
            if (showSum) {
                showSum.textContent = (sumOfProducts + (sum - price.textContent)).toFixed(2)
            }
            console.log(sumOfProducts);
        }
        
        if (e.target.classList.contains('minus')) {
            const counter = e.target.closest(".product_counter")
            let quantity = counter.querySelector(".quantity")
    
            console.log(quantity);
            let count = +quantity.textContent - 1
            // Prevent the counter from going below 1
            if (count < 1) {
                count = 1;
            }
            const price = e.target.closest("li").querySelector(".product_price")
    
            quantity.textContent = count
            sumOfProducts = +price.textContent * count
    
            if (showSum) {
                showSum.textContent = sumOfProducts
            }
        }
    })
}

if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", () => {
        localStorage.removeItem("productsId")
        
        if (list) list.innerHTML = ""
        if (showSum) showSum.textContent = `$0`
        sum = 0
        
        updateBasketSpans();
        
        if (productContent) {
            const params = {
                img: imgEmpty,
                greenCard: greenCard
            }
            productContent.innerHTML = EmptyBasket(params)
        }
    })
}

if (productContent) {
    const productsId = getProductsFromStorage();
    
    if (productsId.length === 0) {
        const params = {
            img: imgEmpty,
            greenCard: greenCard
        }
        productContent.innerHTML = EmptyBasket(params)
    }
    else {
        renderProducts()
    }
}

export { updateBasketSpans, initCartCount };