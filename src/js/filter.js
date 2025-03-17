const cardContainer = document.getElementById('js-cardList');
const btnsBlock = document.getElementById('js-btnsBlock');
const leftDblBtn = document.getElementById('js-leftDblBtn');
const leftBtn = document.getElementById('js-leftBtn');
const rightBtn = document.getElementById('js-rightBtn');
const rightDblBtn = document.getElementById('js-rightDblBtn');
const searchInput = document.querySelector('.filter__search_input');
const categorySelect = document.querySelector('.filter__sort');
const sortSelect = document.querySelector('.filter__catigories');

let currentPage = 1;
const URL = 'https://food-boutique.b.goit.study/api/products?';
const CATEGORY_URL =
  'https://food-boutique.b.goit.study/api/products/categories';

import Handlebars from 'handlebars';
import templateSource from '../templates/card.hbs';

const renderCards = async posts => {
  cardContainer.innerHTML = '';
  const renderedPosts = posts.results
    .map(post => templateSource(post))
    .join('');

  cardContainer.innerHTML = renderedPosts;
};

const getCards = async () => {
  const param = new URLSearchParams({
    keyword: searchInput.value.trim(),
    page: currentPage,
    limit: 9,
    category: categorySelect.value !== 'show-all' ? categorySelect.value : '',
    sort: sortSelect.value !== 'showAll' ? sortSelect.value : '',
  });

  try {
    const response = await fetch(URL + param.toString());
    const posts = await response.json();
    if (sortSelect.value === 'byABC_Asc') {
      posts.results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortSelect.value === 'byABC_Desc') {
      posts.results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortSelect.value === 'byPrice_Asc') {
      posts.results.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === 'byPrice_Desc') {
      posts.results.sort((a, b) => b.price - a.price);
    } else if (sortSelect.value === 'byPopularity_Asc') {
      posts.results.sort((a, b) => a.popularity - b.popularity);
    } else if (sortSelect.value === 'byPopularity_Desc') {
      posts.results.sort((a, b) => b.popularity - a.popularity);
    }

    renderCards(posts);
    renderPagination(currentPage, posts.totalPages);
  } catch (err) {
    console.error(err);
    cardContainer.innerHTML = '<p>Постів не знайдено</p>';
  }
};
const renderPagination = (currentPage, total) => {
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
      if (i === total) button.textContent = '...';
      btnsBlock.appendChild(button);
    }
  }
  leftDblBtn.disabled = currentPage <= 2;
  leftBtn.disabled = currentPage === 1;
  rightBtn.disabled = currentPage === total;
  rightDblBtn.disabled = currentPage >= total - 1;
};

btnsBlock.addEventListener('click', e => {
  if (e.target.classList.contains('cards__btn')) {
    currentPage = +e.target.dataset.page;
    getCards();
  }
});

[leftDblBtn, leftBtn, rightBtn, rightDblBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    currentPage +=
      btn === leftDblBtn ? -2 : btn === leftBtn ? -1 : btn === rightBtn ? 1 : 2;
    getCards();
  });
});

[searchInput, categorySelect, sortSelect].forEach(input => {
  input.addEventListener('input', () => {
    currentPage = 1;
    getCards();
  });
});
sortSelect.addEventListener('change', () => {
  currentPage = 1;
  getCards();
});

const loadCategories = async () => {
  try {
    const response = await fetch(CATEGORY_URL);
    const categories = await response.json();
    categorySelect.innerHTML =
      '<option value="show-all">Show all</option>' +
      categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  } catch (err) {
    console.error('Ошибка загрузки категорий:', err);
  }
};

loadCategories();
getCards();
