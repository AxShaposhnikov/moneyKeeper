'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.getElementsByClassName('optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

// Кнопка 'Начать рассчёт'
startBtn.addEventListener('click', () => {
    time = prompt('Введите дату в формате: YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц', '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalexpensesBtn.disabled = false;
    countBtn.disabled = false;
});


// Кнопка 'Утвердить обязятельные расходы'
expensesBtn.disabled = true;
expensesBtn.addEventListener('click', () => {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

// Кнопка 'Утвердить НЕобязятельные расходы'
optionalexpensesBtn.disabled = true;
optionalexpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

// Кнопка 'Расчет дневного бюджета'
countBtn.disabled = true;
countBtn.addEventListener('click', () => {
    let expensesSum = 0;
    if (Object.keys(appData.expenses).length !== 0) {
        for (let key in appData.expenses) {
            expensesSum += +appData.expenses[key];
        }
    }
    console.log(expensesSum);

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - expensesSum) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        

        if (appData.moneyPerDay < 30) {
            levelValue.textContent = 'Минимальный уровень достатка';
            } else if (appData.moneyPerDay > 30 && appData.moneyPerDay < 60) {
                levelValue.textContent = 'Средний уровень достатка';
            } else if (appData.moneyPerDay > 60) {
                levelValue.textContent = 'Высокий уровень достатка';
            } else {
                levelValue.textContent = 'Произошла ошибка';
            }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
});

// Вводим статьи возможного дохода
incomeItem.addEventListener('input', () => {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

//'Чекбокс'
checkSavings.addEventListener('click', () => {
    if (appData.saving == true) {
        appData.saving = false;
    } else {
        appData.saving = true;
    }
});

sumValue.addEventListener('input', () => {
   if (appData.saving == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        console.log(appData.monthIncome);
        console.log(appData.yearIncome);

        monthsavingsValue.textContent =appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
   }       
});

percentValue.addEventListener('input', () => {
    if (appData.saving == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        console.log(appData.monthIncome);
        console.log(appData.yearIncome);

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    } 
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
};

console.log(appData.expenses);