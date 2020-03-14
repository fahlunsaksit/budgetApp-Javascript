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
      this.showBalance();

    }
  }

  //add Expense
  addExpense(expense) {
    const div = document.createElement('div');

    div.classList.add('expense');
    div.innerHTML = ` 
    <div class="expense-item d-flex justify-content-between align-items-baseline">

      <h6 class="expense-title mb-0 text-uppercase list-item">-${expense.titel} </h6>
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

    this.expenseList.appendChild(div);
  }

  //total expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      // for (let index = 0; index < this.itemList.length; index++) {
      //   total += this.itemList[index];
      //   console.log(this.itemList[index]);
      // }
      total = this.itemList.reduce(function (acc, curr) {
        acc += curr.amount;
        // console.log('total is ' + acc + ' and the current value is ' + curr.amount);
        return acc;
      }, 0);

      // console.log(this.itemList);s
    }

    this.expenseAmount.textContent = total;
    return total;
  }

  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom
    this.expenseList.removeChild(parent);
    //remove from the list
    let expenes = this.itemList.filter(function (item) {
      return item.id === id;          
    });
    //show value
    console.log(expenes);
    this.expenseInput.value = expenes[0].titel;
    this.amountInput.value = expenes[0].amount;
    //remove from list
    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom
    this.expenseList.removeChild(parent);
    //remove from  list
    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
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

  expenseList.addEventListener('click', function (event) {
    //find event edit button,delete button
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);
    }
  });


}

document.addEventListener('DOMContentLoaded', function () {

  addEventListener();
});
