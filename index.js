const expenses = [
  {
    name: 'coffee',
    price: {
      amount: 40,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-07-16',
  },
  {
    name: 'bread',
    price: {
      amount: 8,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-08-03',
  },
  {
    name: 'cheese',
    price: {
      amount: 21,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-08-03',
  },
  {
    name: 'fuel',
    price: {
      amount: 320,
      currency: 'PLN',
    },
    category: 'car',
    date: '2022-08-14',
  },
  {
    name: 'bread',
    price: {
      amount: 8,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-09-01',
  },
  {
    name: 'ham',
    price: {
      amount: 14,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-09-01',
  },
  {
    name: 'butter',
    price: {
      amount: 6,
      currency: 'PLN',
    },
    category: 'food',
    date: '2022-09-10',
  },
  {
    name: 'fuel',
    price: {
      amount: 320,
      currency: 'PLN',
    },
    category: 'car',
    date: '2022-09-10',
  },
  {
    name: 'car wash',
    price: {
      amount: 60,
      currency: 'PLN',
    },
    category: 'car',
    date: '2022-09-10',
  },
];
const expensesListElement = document.querySelector('.expenses__list');
const foodCheckbox = document.querySelector('#checkbox-1');
const carCheckbox = document.querySelector('#checkbox-2');
const currentPageElement = document.querySelector('.currentPage');
const nextPageBtn = document.querySelector('.nextPage-button');
const prevPageBtn = document.querySelector('.prevPage-button');
const searchInput = document.querySelector('.search-input');
const startDateInput = document.querySelector('.start-date');
const endDateInput = document.querySelector('.end-date');
const toggleDropDownMenu = document.querySelector('.drop-down-menu');
const navList = document.querySelector('.nav-list');

const ITEMS_PER_PAGE = 5;
let searchText = '';
let currentPage = 1;

foodCheckbox.addEventListener('click', () => loadExpenses(expenses));
carCheckbox.addEventListener('click', () => loadExpenses(expenses));

startDateInput.addEventListener('input', () => loadExpenses(expenses));
endDateInput.addEventListener('input', () => loadExpenses(expenses));

foodCheckbox.checked = true;
carCheckbox.checked = true;

toggleDropDownMenu.addEventListener('click', () => {
  if (navList.classList.contains('active-drop-down-menu')) {
    navList.classList.remove('active-drop-down-menu');
  } else {
    navList.classList.add('active-drop-down-menu');
  }
});
searchInput.addEventListener('input', () => {
  searchText = searchInput.value;
  loadExpenses(expenses);
});

nextPageBtn.addEventListener('click', () => {
  const filteredExpenses = getFilteredExpenses();
  const amountOfPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

  if (amountOfPages > currentPage) {
    currentPage++;
    currentPageElement.innerText = `Page ${currentPage}`;
  }

  loadExpenses();
});
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    currentPageElement.innerText = `Page ${currentPage}`;
  }
  loadExpenses();
});

const getFilteredExpenses = () => {
  let filteredExpenses = expenses;

  if (searchText) {
    filteredExpenses = filteredExpenses.filter((expense) => expense.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  if (!foodCheckbox.checked) {
    filteredExpenses = filteredExpenses.filter((expense) => expense.category !== 'food');
  }

  if (!carCheckbox.checked) {
    filteredExpenses = filteredExpenses.filter((expense) => expense.category !== 'car');
  }

  const startDate = new Date(document.querySelector('.start-date').value);
  const endDate = new Date(document.querySelector('.end-date').value);

  if (!isNaN(startDate) && !isNaN(endDate)) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  }

  return filteredExpenses;
};

const loadExpenses = () => {
  const filteredExpenses = getFilteredExpenses();
  expensesListElement.innerText = '';
  filteredExpenses.forEach((expense, i) => {
    filteredExpenses[i].page = Math.ceil((i + 1) / ITEMS_PER_PAGE);
    if (expense.page === currentPage) {
      const expenseHTML = `
      <div class="expense__item">
        <div class="main-row">
          <div class="name">${expense.name}</div>
          <div class="price">
            <span class="price__amount">${expense.price.amount}</span>
            <span class="price__currency">${expense.price.currency}</span>
          </div>
        </div>
        <div class="secondary-row">
          <div class="category">
            <span>${expense.category}</span>
            <span class="material-symbols-outlined food-icon"> restaurant </span>
          </div>
          <div class="date">${expense.date}</div>
        </div>
      </div>
    `;
      expensesListElement.insertAdjacentHTML('beforeend', expenseHTML);
    }
  });
};
loadExpenses();
