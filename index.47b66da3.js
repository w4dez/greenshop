const t=document.getElementById("js-cardList");let e=JSON.parse(localStorage.getItem("productsId"))||[];const s=document.getElementById("js-popularList"),c=document.getElementById("js-discountList"),o=document.getElementById("js-backdrop");t.addEventListener("click",(t=>{(async t=>{const s=t.target.closest("li"),c=t.target.closest("button");let o="";s&&(o=s.dataset.id),c&&(console.log(typeof e),e.push(o),localStorage.setItem("productsId",JSON.stringify(e)),c.innerHTML='<i class="fa-solid fa-check" style="color:#fff"></i>'),console.log(o)})(t)}));const a=(t,s)=>{const c=t.target.closest("button");c.classList.contains("addToCard")&&((async t=>{const s=t.target.closest("button");s&&(idElement=s.dataset.id,await e.push(idElement),localStorage.setItem("productsId",JSON.stringify(e)))})(t),c.innerHTML=s)};o.addEventListener("click",(t=>{a(t,'<i class="fa-solid fa-check"></i>')})),c.addEventListener("click",(t=>{a(t,'<i class="fa-solid fa-check" style="color:#fff"></i>')})),s.addEventListener("click",(t=>{a(t,'<i class="fa-solid fa-check" style="color:#586f1f; width: 4px; height:5px; margin: 0 10px 10px 0"></i>')}));
//# sourceMappingURL=index.47b66da3.js.map
