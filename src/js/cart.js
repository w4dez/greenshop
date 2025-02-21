import ProductsTemplate from "../templates/cartProduct.hbs";
const list = document.querySelector(".products_list")
let sum = 0

const productsId = JSON.parse(localStorage.getItem("productsId"))|| []
const renderProducts =()=>{
    productsId.forEach(async (id)=> {
        const res = await fetch(`https://food-boutique.b.goit.study/api/products?${id}`)
        const product = await res.json()
        const liItem = document.createElement('li')
      const params ={
        id:product.id,
        img:product.image,
        title: product.title,
        price:product.price,
        count:1,
      }
      liItem.innerHTML = ProductsTemplate(params)
      list.appendChild(liItem)
      sum += product.price

    });
}
list.addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete_btn')){
        const id = e.target.parentElement.dataset.id
        productsId.splice(productsId.indexOf(id), 1)
        localStorage.setItem("productsId", JSON.stringify(productsId))
        renderProducts()
    }
    if(e.target.classList.contains('plus')){
        e.target.parentElement.dataset.count = +e.target.parentElement.dataset.count + 1
        const price = e.target.parentElement.prevElementSibling.textContent
        sum =+ +price * +e.target.parentElement.dataset.count
    }
    if(e.target.classList.contains('minus')){
        e.target.parentElement.dataset.count = +e.target.parentElement.dataset.count - 1
        const price = e.target.parentElement.prevElementSibling.textContent
        sum =+ +price * +e.target.parentElement.dataset.count
    }
})
const deleteAllBtn = document.querySelector(".delete_all-btn")

deleteAllBtn.addEventListener("click", ()=>{
    localStorage.removeItem(productsId)
})



