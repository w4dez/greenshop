const cardContainer = document.getElementById('js-cardList');
const btnsBlock = document.getElementById('js-btnsBlock');

const leftDblBtn = document.getElementById('js-leftDblBtn');
const leftBtn = document.getElementById('js-leftBtn');
const rightBtn = document.getElementById('js-rightBtn');
const rightDblBtn = document.getElementById('js-rightDblBtn');

let currentPage = 1;
// const URL = 'https://food-boutique.b.goit.study/api/products?keyword=&category=&page=1&limit=9&sort=byABC_Asc'
const URL = 'https://food-boutique.b.goit.study/api/products?';

import Handlebars from 'handlebars';

import templateSource from '../templates/card.hbs';

export const renderCards = async posts => {
  // const posts = await getCards();
  console.log(posts.results);

  const renderedPosts = posts.results
    .map(post => {
      return templateSource(post);
    })
    .join(' ');

  // console.log(renderedPosts);

  cardContainer.innerHTML = renderedPosts;
};

// renderCards();

export const getCards = async () => {
  const param = new URLSearchParams({
    keyword: '',
    page: currentPage,
    limit: 9,
    category: '',
    sort: 'byABC_Asc',
  });

  try {
    const response = await fetch(URL + param.toString());
    const posts = await response.json();

    renderCards(posts);

    const totalPages = posts.totalPages;

    renderPagination(currentPage, totalPages);
  } catch (err) {
    console.error(err);
    return 'постів не знайдено';
  }
};

getCards();

export const renderPagination = (currentPage, total) => {
  btnsBlock.innerHTML = '';

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= currentPage - 1 && i <= currentPage + 3)
    ) {
      const button = document.createElement('button');

      button.classList.add('cards__btn');
      button.dataset.page = i;
      button.textContent = i;
      if (i === currentPage) {
        button.disabled = true;
        button.style.background = '#6d8434';
        button.style.color = '#e8e8e2';
      }
      if (i === total) {
        button.textContent = '...';
      }
      btnsBlock.appendChild(button);
    }
  }

  leftDblBtn.disabled = currentPage === 1 || currentPage === 2;
  leftBtn.disabled = currentPage === 1;

  rightBtn.disabled = currentPage === total;
  rightDblBtn.disabled = currentPage === total || currentPage === total - 2;
};

btnsBlock.addEventListener('click', e => {
  if (e.target.classList.contains('cards__btn')) {
    currentPage = +e.target.dataset.page;
    getCards();
  }
});

leftDblBtn.addEventListener('click', () => {
  currentPage -= 2;
  getCards();
});

leftBtn.addEventListener('click', () => {
  currentPage--;
  getCards();
});

rightBtn.addEventListener('click', () => {
  currentPage++;
  getCards();
});

rightDblBtn.addEventListener('click', () => {
  currentPage += 2;
  getCards();
});
