import ProductsTemplate from "../templates/cartProduct.hbs";
import EmptyBasket from "../templates/empty-basket.hbs"
import Basket from "../templates/basket.hbs"
const list = document.querySelector(".products_list")
const showSum = document.querySelector(".summary")
const deleteAllBtn = document.querySelector(".delete_all-btn")
const cartCount = document.querySelector(".cart_count")
let sum = 0
let productCount = 0

const productsId = JSON.parse(localStorage.getItem("productsId")) || []
console.log(productsId);
const renderProducts = () => {
    if (productsId.length === 0) {
        list.innerHTML = ""
        return
    }
    productsId.forEach(async (id) => {
        const res = await fetch(`https://food-boutique.b.goit.study/api/products/${id}`)
        const product = await res.json()
        console.log(product);
        const params = {
            id: product._id,
            img: product.img,
            title: product.name,
            price: product.price,
            count: 1,
        }

        list.insertAdjacentHTML("afterbegin", ProductsTemplate(params))
        //   liItem.innerHTML = ProductsTemplate(params)
        //   list.appendChild(liItem)
        sum += product.price
        productCount += 1
        console.log(sum);
        showSum.textContent = `$${sum.toFixed(2)}`
        cartCount.textContent = `(${productCount})`

    });
}
renderProducts()
list.addEventListener("click", (e) => {
    console.log('click', e.target);
    const liItem = e.target.closest("li")

    const deleteBtn = e.target.closest('.delete_btn')
    if (deleteBtn) {
        console.log('click delete');
        const id = e.target.parentElement.dataset.id
        productsId.splice(productsId.indexOf(id), 1)
        localStorage.setItem("productsId", JSON.stringify(productsId))

       liItem.remove()
       const price = liItem.querySelector(".product_price").textContent
        sum -= +price
        productCount -= 1
        showSum.textContent = `$${sum.toFixed(2)}`
        cartCount.textContent = `(${productCount})`
   

    }
    if (e.target.classList.contains('plus')) {
        e.target.parentElement.dataset.count = +e.target.parentElement.dataset.count + 1
        const price = e.target.parentElement.prevElementSibling
        
        sum = + +price * +e.target.parentElement.dataset.count
    }
    if (e.target.classList.contains('minus')) {
        e.target.parentElement.dataset.count = +e.target.parentElement.dataset.count - 1
        const price = e.target.parentElement.prevElementSibling
        sum = + +price * +e.target.parentElement.dataset.count
    }
})
// const deleteAllBtn = document.querySelector(".delete_all-btn")

deleteAllBtn.addEventListener("click", () => {
    localStorage.removeItem("productsId")
    list.innerHTML = ""
    showSum.textContent = $0
    sum = 0
    productCount = 0
    cartCount.textContent = (`${productCount}`)

})

const quantity = document.querySelector(".quantity")
const minus = document.querySelector(".minus")
const plus = document.querySelector(".plus")

plus.addEventListener("click", (e)=>{
    +quantity++
})
minus.addEventListener("click", (e)=>{
    quantity--
    if (+quantity < 0){
        alert("The quantity is less than 0")
    }
})


if(productsId.length === 0){
    document.innerHTML = EmptyBasket()
}
else{
    document.innerHTML = Basket()
}