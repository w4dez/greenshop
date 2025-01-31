const discountList = document.getElementById('js-discountList')


// const URL = 'https://food-boutique.b.goit.study/api/products?'

const URL = 'https://food-boutique.b.goit.study/api/products/discount?'





import Handlebars from "handlebars"


import templateSource  from "../templates/discountCard.hbs";





  
const renderCards = async (posts) => {
    // const posts = await getCards();
    // console.log(posts.results);
    const limitPost = posts.slice(0, 2) 
    const renderedPosts = limitPost.map((post) => {
      return templateSource(post);
    }).join(" ")
  
    // console.log(renderedPosts);

    discountList.innerHTML = renderedPosts
    
};
  
// renderCards();


const getCards = async () => {
  const param = new URLSearchParams({

    limit: 2



  })


  try {
    const response = await fetch(URL + param.toString());
    const posts = await response.json();

    console.log(posts);
    

    renderCards(posts)

  } catch (err) {
    console.error(err);
    return "постів не знайдено";
  }




};

getCards()