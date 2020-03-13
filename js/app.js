class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = '<p>value cannot be empty or negative</p>';
      const self = this;
      // console.log(this);
      setTimeout(function () {
        // console.log('2');
        // console.log(this);
        self.budgetFeedback.classList.remove('showItem');
      }, 4000);
    } else {
      /*
      innerHTML parses content as HTML, so it takes longer.
      nodeValue uses straight text, does not parse HTML, and is faster.
      textContent uses straight text, does not parse HTML, and is faster.
      innerText Takes styles into consideration. It won't get hidden text for instance.
      */

      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  // showBalance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;

    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }

  //submit Expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    // alert(expenseValue + ' ' + amountValue);

    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = "<p>values cannot be empty or negative</p>";
      const self = this;
      // console.log(this);
      setTimeout(function () {
        // console.log(this);
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        titel: expenseValue,
        amount: amount
      };

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);

    }
  }

  //add Expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML =` 
    <div class="expense-item d-flex justify-content-between align-items-baseline">

      <h6 class="expense-title mb-0 text-uppercase list-item">${expense.titel} </h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

        <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
          </a>
        </div>
</div > `;

// div.innerHTML = `<p>sdfsdf</p>`;

this.expenseList.appendChild(div);
  }

  //total expense
  totalExpense() {
    let total = 400;
    return total;
  }



}

function addEventListener() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener('submit', function () {

  });


}

document.addEventListener('DOMContentLoaded', function () {
  addEventListener();
});
