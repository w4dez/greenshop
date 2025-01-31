
// const URL = 'https://food-boutique.b.goit.study/api/products?'

const URL = 'https://food-boutique.b.goit.study/api/products/popular'

const popularList = document.getElementById('js-popularList')


import Handlebars from "handlebars"


import templateSource  from "../templates/popularCard.hbs";





  
const renderCards = async (posts) => {
    // const posts = await getCards();
    // console.log(posts.results);
    
    const renderedPosts = posts.map((post) => {
      return templateSource(post);
    }).join(" ")
  
    // console.log(renderedPosts);

    popularList.innerHTML = renderedPosts
    
};
  
// renderCards();


const getCards = async () => {
  // const param = new URLSearchParams({
  //   keyword: '',
  //   page: 1,
  //   limit: 5,
  //   category: '',
  //   sort: 'byPopularity_Asc'


  // })


  try {
    const response = await fetch(URL);
    const posts = await response.json();
    console.log(posts);
    
    renderCards(posts)

  } catch (err) {
    console.error(err);
    return "постів не знайдено";
  }




};

getCards()