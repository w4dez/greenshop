import ProductsTemplate from "../templates/cartProduct.hbs";
import EmptyBasket from "../templates/empty-basket.hbs"
import Basket from "../templates/basket.hbs"
import imgEmpty from "../images/basket-img.png"
import greenCard from "../images/cart-green.svg"
const list = document.querySelector(".products_list")
const productContent = document.querySelector(".product__content")
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
    let quantity = +e.target.closest(".quantity")

    if (e.target.classList.contains('plus')) {
        let count = +e.target.closest("li").dataset.count
        e.target.parentElement.dataset.count = +e.target.parentElement.dataset.count + 1
        const price = e.target.closest("li").querySelector(".product_price").textContent

        count++
        console.log(count);

        quantity.textContent = count
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
    if (productsId.length === 0) {
        productContent.innerHTML = EmptyBasket()
    }
    else {
        renderProducts()
    }
})

// const quantity = document.querySelector(".quantity")
// const minus = document.querySelector(".minus")
// const plus = document.querySelector(".plus")

// plus.addEventListener("click", (e)=>{
//     +quantity++
// })
// minus.addEventListener("click", (e)=>{
//     quantity--
//     if (+quantity < 0){
//         alert("The quantity is less than 0")
//     }
// })


if (productsId.length === 0) {
    const params = {
        img: imgEmpty,
        greenCard: greenCard
    }
    productContent.innerHTML = EmptyBasket(params)
}
else {


    // productContent.innerHTML = Basket()
    renderProducts()

}