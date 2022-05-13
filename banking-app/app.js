let usersArray = []; //will contain all users
let counter; //number of users in localstorage
let dataDiv = document.querySelector(".div-data");

// ---------NAVBAR(Login, Signup, Users)-------------------------------------------------------------
let navLinks = document.querySelectorAll(".nav-link");
let contents = document.querySelectorAll(".content");

navLinks.forEach(navLink => {
    navLink.addEventListener("click", switchNav);
})

function switchNav() {
    navLinks.forEach(navLink => {
        navLink.classList.remove("active");
        this.classList.add("active");
    })
    
    contents.forEach(content => {
        content.classList.remove("active-content");
    })
}

let navLogin = document.querySelector("#nav-login");
let loginContent = document.getElementById("content-login");
navLogin.addEventListener("click", () => {
    loginContent.classList.add("active-content");
    
})

let navSignUp = document.querySelector("#nav-signup");
let signupContent = document.getElementById("content-signup");
navSignUp.addEventListener("click", () => {
    signupContent.classList.add("active-content");
})

let navUsers = document.querySelector("#nav-users");
let usersContent = document.getElementById("content-users");
navUsers.addEventListener("click", () => {
    usersContent.classList.add("active-content");

    //Disable Load User Button if localStorage is not empty
    counter = localStorage.length;
    if (counter > 0) {
        loadDataButton.style.display = "none";
    }
})

// -------LOAD USER DATA----------------------------------------------------------------------------------------
/**
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} accountNumber 
 * @param {string} balance 
 * @param {string} password 
 * @param {array} expenses 
 * @param {array} transactions 
 */
let User = function(username, email, firstName, lastName, accountNumber, balance, password, expenses, transactions) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.password = password;
    this.expenses = expenses;
    this.transactions = transactions
}

/**
 * 
 * @param {string} name 
 * @param {number} cost 
 */
 let Expense = function(name, cost) {
    this.name = name;
    this.cost = cost;
}

/**
 * 
 * @param {string} type 
 * @param {number} amount 
 * @param {string} accountnum 
 */
 let Transaction = function(type, amount, accountnum) {
    this.type = type;
    this.amount = amount;
    this.accountnum = accountnum;
}

//Load User Data Button Functionality
let loadDataButton = document.getElementById("load-user-data");
loadDataButton.addEventListener("click", loadData, {once: true});

function loadData() {
    let AngelLocsin = new User("angellocsin", "angellocsin@mail.com", "Angel", "Locsin", "1111-1111-1111", 500000, "alex", [], []);
    let BeaAlonzo = new User ("beaalonzo", "beaalonzo@mail.com", "Bea", "Alonzo", "2222-2222-2222", 1000000, "bobbie", [], []);
    let ShainaMagdayao = new User ("shainamagdayao", "shainamagdayao@mail.com", "Shaina", "Magdayao", "3333-3333-3333", 300000, "gabbie", [], []);
    let EnchongDee = new User ("enchongdee", "enchongdee@mail.com", "Enchong", "Dee", "4444-4444-4444", 600000, "rebreb", [], []);
    let KathrynBernardo = new User ("kathrynbernardo", "kathrynbernardo@mail.com", "Kathryn", "Bernardo", "5555-5555-5555", 2000000, "george", [], []);
    let DanielPadilla = new User ("danielpadilla", "danielpadilla@mail.com", "Daniel", "Padilla", "6666-6666-6666", 1200000, "primo", [], []);
    let LizaSoberano = new User ("lizasoberano", "lizasoberano@mail.com", "Liza", "Soberano", "7777-7777-7777", 1500000, "cali", [], []);
    let EnriqueGil = new User ("enriquegil", "enriquegil@mail.com", "Enrique", "Gil", "8888-8888-8888", 1300000, "gio", [], []);
    
    //Store loadedUserData in an Array for Displaying Data in HTML(in Users Nav)
    let loadedUsersArray = [];
    loadedUsersArray.push(AngelLocsin);
    loadedUsersArray.push(BeaAlonzo);
    loadedUsersArray.push(ShainaMagdayao);
    loadedUsersArray.push(EnchongDee);
    loadedUsersArray.push(KathrynBernardo);
    loadedUsersArray.push(DanielPadilla);
    loadedUsersArray.push(LizaSoberano);
    loadedUsersArray.push(EnriqueGil);

    //Store User Data in localStorage
    counter = localStorage.length;
    localStorage.setItem(`userData${counter + 1}`, JSON.stringify(AngelLocsin));
    localStorage.setItem(`userData${counter + 2}`, JSON.stringify(BeaAlonzo));
    localStorage.setItem(`userData${counter + 3}`, JSON.stringify(ShainaMagdayao));
    localStorage.setItem(`userData${counter + 4}`, JSON.stringify(EnchongDee));
    localStorage.setItem(`userData${counter + 5}`, JSON.stringify(KathrynBernardo));
    localStorage.setItem(`userData${counter + 6}`, JSON.stringify(DanielPadilla));
    localStorage.setItem(`userData${counter + 7}`, JSON.stringify(LizaSoberano));
    localStorage.setItem(`userData${counter + 8}`, JSON.stringify(EnriqueGil));

    //Display loadedUserData in HTML(Users Navbar)
    for (let i = 0; i < loadedUsersArray.length; i++) {
        usersArray.push(loadedUsersArray[i]); //Store loadedUserData in array of All Users
        let valuesArray = Object.values(loadedUsersArray[i]); //Get values only of the object User
        for (let j = 0; j < valuesArray.length - 2; j++) {
            let userData = document.createElement("div");
            userData.classList.add("data");
            userData.innerHTML = valuesArray[j];
            dataDiv.append(userData);
        }
    }
    loadDataButton.style.display = "none";
}

// ------------SIGNUP------------------------------------------------------------------------------------
let signupError = document.getElementById("error-signup");
let signupForm = document.getElementById("signup");
signupForm.addEventListener("submit", signUp);

function signUp(event) {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let accountNumber = document.getElementById("accountnumber").value;
    let balance = parseInt(document.getElementById("balance").value);
    let password = document.getElementById("password").value;
    let newUser = new User (username, email, firstName, lastName, accountNumber, balance, password, []);
    let valuesArray = Object.values(newUser); //Get values only of the object User
    
    //Check if username/email already exists
    for (let m = 0; m < usersArray.length; m++) {
        if(usersArray[m].username === username && usersArray[m].email === email) {
            signupError.style.display = "block";
            signupError.innerHTML = "User already exists!"
            event.preventDefault();
            return;
        } else if(usersArray[m].username === username) {
            signupError.style.display = "block";
            signupError.innerHTML = "Username already exists!"
            event.preventDefault();
            return;
        } else if(usersArray[m].email === email) {
            signupError.style.display = "block";
            signupError.innerHTML = "Email is already registered!"
            event.preventDefault();
            return;
        } 
    }
    counter = localStorage.length;
    localStorage.setItem(`userData${counter + 1}`, JSON.stringify(newUser));
    
    usersArray.push(newUser); //Store submitted data in array of All Users

    event.preventDefault();
    signupForm.reset();

    //Display submitted data in HTML(Users Navbar)
    for (let k = 0; k < valuesArray.length - 2; k++) {
        let userData = document.createElement("div");
        userData.classList.add("data");
        userData.innerHTML = valuesArray[k];
        dataDiv.append(userData);
    }
    signupError.style.display = "none";
}

// --------------WINDOW ONLOAD--------------------------------------------------------------------------------
window.onload = function() {
    //Display all stored Users in the Users Nav upon window load
    for (let i = 1; i < localStorage.length + 1; i++) {
        let storedUser = JSON.parse(localStorage.getItem(`userData${i}`));
        let valuesArray = Object.values(storedUser); //Get values only of the object User
        for (let k = 0; k < valuesArray.length - 2; k++) {
            let userData = document.createElement("div");
            userData.classList.add("data");
            userData.innerHTML = valuesArray[k];
            dataDiv.append(userData);
        }
        usersArray.push(storedUser);
    }
}

// --------------LOGIN-------------------------------------------------------------------
let loginPage = document.getElementById("landing-page");
let loginError = document.getElementById("error-login");
let loginForm = document.getElementById("login");
let balanceDiv = document.getElementById("div-balance");
let accountNumberDiv = document.getElementById("div-accountnumber");
let fullNameDiv = document.getElementById("div-name");
let currentUser = [];
let indexUser; //index of current user on AllUsers Array
loginForm.addEventListener("submit", login);

function login(event) {
    let loginInfo = document.getElementById("login-info").value;
    let loginPassword = document.getElementById("login-password").value;

    for (let i = 0; i < usersArray.length; i++) {
        if(usersArray[i].username === loginInfo || usersArray[i].email === loginInfo) {
            if(usersArray[i].password === loginPassword) {
            //If login is succesful
                loginPage.style.display = "none"; //Display Main Page

                //Get and store user details upon login
                currentUser = usersArray[i];
                indexUser = i;
                
                //Display User Details on card
                accountNumberDiv.innerHTML = `${currentUser.accountNumber}`;
                fullNameDiv.innerHTML = `${currentUser.firstName} ${currentUser.lastName}`;
                fullNameDiv.style.textTransform = "uppercase";
                showBalance(); //Show Balance on card

                //Display Expenses upon login
                for (let m = 0; m < currentUser.expenses.length; m++) {
                    showExpense(currentUser.expenses[m].name, currentUser.expenses[m].cost)
                }

                //Display Transaction Historyy upon login
                for (let n = 0; n < currentUser.transactions.length; n++) {
                    showTransaction(currentUser.transactions[n].type, currentUser.transactions[n].amount, currentUser.transactions[n].accountnum)
                }

                event.preventDefault();
                return;
            } else {
            //But Password is incorrect
                loginError.style.display = "block";
                loginError.innerHTML = "Incorrect password!"
                event.preventDefault();
                return;
            }
        }
    }
    //If username/email is not on the UsersArray yet
    loginError.style.display = "block";
    loginError.innerHTML = "User does not exist!"
    event.preventDefault();
}

// ------------------------------------------------------------------------

//Show/Update HTML Card Balance
function showBalance() {
    balanceDiv.innerHTML = currentUser.balance;
}

function updateUsersArray() {
    usersArray[indexUser] = currentUser;
}

function updateLocalStorage() {
    localStorage.setItem(`userData${indexUser + 1}`, JSON.stringify(usersArray[indexUser]));
}

function showExpense(name, cost) {
    let expensesDiv = document.getElementById("div-expenses-row");
    //Create Expenses Div
    let expensesItemsDiv = document.createElement("div");
    expensesItemsDiv.className = "expenses-row";
    expensesDiv.append(expensesItemsDiv);

    //Create ExpenseName Div
    let expenseNameDiv = document.createElement("div");
    expenseNameDiv.className = "expenses-items";
    expenseNameDiv.id = "expense-name";
    expenseNameDiv.innerHTML = name;
    expensesItemsDiv.append(expenseNameDiv);

    //Create Cost Div
    let expenseCostDiv = document.createElement("div");
    expenseCostDiv.className = "expenses-items";
    expenseCostDiv.id = "expense-cost";
    expenseCostDiv.innerHTML = `Php ${cost}`;
    expensesItemsDiv.append(expenseCostDiv);

    //Create Action Div
    let expenseActionDiv = document.createElement("div")
    expenseActionDiv.className = "expenses-items";
    expenseActionDiv.id = "expense-action";
    expensesItemsDiv.append(expenseActionDiv);

    //Insert Actions Icons
    let penIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    penIcon.className = "fa-solid";
    trashIcon.className = "fa-solid";
    penIcon.classList.add("fa-pen");
    trashIcon.classList.add("fa-trash");
    expenseActionDiv.append(penIcon);
    expenseActionDiv.append(trashIcon);

    //Delete Expense Functionality
    trashIcon.addEventListener("click", () => {
        expensesItemsDiv.remove(); //HTML

        //Update Balance
        currentUser.balance += cost;


        //Delete corresponding Expense in currentUserObject
        let deleteExpenseIndex = currentUser.expenses.findIndex((element) => element.name === name);
        currentUser.expenses.splice(deleteExpenseIndex, 1);
        
        showBalance();
        updateUsersArray();
        updateLocalStorage();
    })
}

function showTransaction(type, amount, accountnum) {
    let transactionsDiv = document.getElementById("div-transactions-items");
    //Create Transactions Div
    let transactionItemsDiv = document.createElement("div");
    transactionItemsDiv.className = "transactions-row";
    transactionsDiv.append(transactionItemsDiv);

    //Create Type Div
    let transactionTypeDiv = document.createElement("div");
    transactionTypeDiv.className = "transactions-items";
    transactionTypeDiv.id = "transaction-type";
    transactionTypeDiv.innerHTML = type;
    transactionItemsDiv.append(transactionTypeDiv);

    //Create Amount Div
    let transactionAMountDiv = document.createElement("div");
    transactionAMountDiv.className = "transactions-items";
    transactionAMountDiv.id = "transaction-amount";
    transactionAMountDiv.innerHTML = `Php ${amount}`;
    transactionItemsDiv.append(transactionAMountDiv);

    //Create Accountnum Div
    let transactionAccountnumDiv = document.createElement("div")
    transactionAccountnumDiv.className = "transactions-items";
    transactionAccountnumDiv.id = "transaction-accountnum";
    transactionAccountnumDiv.innerHTML = accountnum;
    transactionItemsDiv.append(transactionAccountnumDiv);
}

// --------------------------------------------------------------------

//Password Toggle Button functionality
let inputPassword = document.getElementById("login-password");
let togglePassword = document.getElementById("toggle-password");
togglePassword.addEventListener("click", passwordVisibility);

function passwordVisibility() {
    togglePassword.classList.toggle("fa-eye");

    if(inputPassword.getAttribute("type") === "password") {
        inputPassword.setAttribute("type", "text");
    } else {
        inputPassword.setAttribute("type", "password");
    }
}

// ---------------------------------------------------------------------------

//Signout button Functionality
let  signoutButton = document.getElementById("signout-button");
signoutButton.addEventListener("click", () => {
    document.location.reload();
})

// -------------------------------------------------------------------------------

//Deposit/Withdraw/Send Money Functionality
let transactionForm = document.getElementById("transaction-form")
let moneyTransaction = document.getElementById("money-transaction");
let transactionTitle = document.getElementById("transaction-title");
let currentBalance = document.getElementById("div-current-bal");
let inputAccountNumber = document.getElementById("accountnumber-transacted")
let accountNumberSend = document.getElementById("modal-card");
let submitTransactionButton = document.getElementById("transaction-submit");
let currentTransaction;

//Deposit CLick Event
let depositButton = document.getElementById("deposit");
depositButton.addEventListener("click", () => {
    moneyTransaction.style.display = "flex";
    transactionTitle.innerHTML = "DEPOSIT MONEY";
    currentTransaction = "deposit";
    currentBalance.innerHTML = `Current balance: Php ${currentUser.balance}`;
    submitTransactionButton.innerHTML = "DEPOSIT";
    inputAccountNumber.value = currentUser.accountNumber;
    accountNumberSend.style.display = "none";
})

//Withdraw Click Event
let withdrawButton = document.getElementById("withdraw");
withdrawButton.addEventListener("click", () => {
    moneyTransaction.style.display = "flex";
    transactionTitle.innerHTML = "WITHDRAW MONEY";
    currentTransaction = "withdraw";
    currentBalance.innerHTML = `Current balance: Php ${currentUser.balance}`;
    submitTransactionButton.innerHTML = "WITHDRAW";
    inputAccountNumber.value = currentUser.accountNumber;
    accountNumberSend.style.display = "none";
})

//Send Money
let sendButton = document.getElementById("send-money");
sendButton.addEventListener("click", () => {
    moneyTransaction.style.display = "flex";
    transactionTitle.innerHTML = "SEND MONEY";
    currentTransaction = "send";
    currentBalance.innerHTML = `Current balance: Php ${currentUser.balance}`;
    submitTransactionButton.innerHTML = "SEND";
    accountNumberSend.style.display = "block";

    inputAccountNumber.required = true;
})

//Modal close button
let closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", () => {
    moneyTransaction.style.display = "none";
    transactionForm.reset();
    transactionError.style.display = "none";

    if(currentTransaction === "send") {
        inputAccountNumber.required = false;
    }
})

//Submit Transaction Submit Event
transactionForm.addEventListener("submit", transaction);
let transactionError = document.getElementById("error-transaction");

function transaction(event) {
    let moneyTransacted = parseInt(document.getElementById("money-transacted").value);
    //Deposit Transaction
    if(currentTransaction === "deposit") {
        currentUser.balance += moneyTransacted;

        //Update HTML
        showBalance();
        showTransaction("Deposit", moneyTransacted, "");
        
        let newTransaction = new Transaction("Deposit", moneyTransacted, ""); //Create a new TransactionObject
        currentUser.transactions.push(newTransaction); //Push every added transaction on currentUserObject's transactions property
        updateUsersArray();
        updateLocalStorage();

        moneyTransaction.style.display = "none";
        transactionError.style.display= "none";
    //Withdraw Transaction
    } else if(currentTransaction ==="withdraw") {
        if(currentUser.balance >= moneyTransacted) {
            currentUser.balance -= moneyTransacted;
            showBalance();
            showTransaction("Withdraw", moneyTransacted, "");

            let newTransaction = new Transaction("Withdraw", moneyTransacted, ""); //Create a new TransactionObject
            currentUser.transactions.push(newTransaction); //Push every added transaction on currentUserObject's transactions property
            updateUsersArray();
            updateLocalStorage();

            moneyTransaction.style.display = "none";
            transactionError.style.display = "none";
        } else {
        //If balance is not enough
            transactionError.style.display = "block";
            transactionError.innerHTML = "Current balance is not enough";
        }
    //Send Money Transaction
    } else if(currentTransaction === "send") {
        for (let i = 0; i < usersArray.length; i++) {
            if(usersArray[i].accountNumber === inputAccountNumber.value && currentUser.accountNumber === inputAccountNumber.value) {
                transactionError.style.display = "block";
                transactionError.innerHTML = "Cannot send money on own account";
                event.preventDefault();
                return;
            } else if(usersArray[i].accountNumber === inputAccountNumber.value) {
                if(currentUser.balance >= moneyTransacted) {
                    currentUser.balance -= moneyTransacted;
                    showBalance();
                    showTransaction("Send To", moneyTransacted, usersArray[i].accountNumber);

                    //Sender
                    let senderTransaction = new Transaction("Send To", moneyTransacted, usersArray[i].accountNumber); //Create a new TransactionObject
                    currentUser.transactions.push(senderTransaction); //Push every added transaction on currentUserObject's transactions property
                    
                    //Receiver
                    let receiverTransaction = new Transaction("Received From", moneyTransacted, currentUser.accountNumber); //Create a new TransactionObject
                    usersArray[i].transactions.push(receiverTransaction); //Push every added transaction on currentUserObject's transactions property
                    usersArray[i].balance += moneyTransacted;
                    localStorage.setItem(`userData${i + 1}`, JSON.stringify(usersArray[i]));

                    updateUsersArray();
                    updateLocalStorage();


                    moneyTransaction.style.display = "none";
                    transactionError.style.display = "none";
                    event.preventDefault();
                    transactionForm.reset();
                    return;
                } else {
                    transactionError.style.display = "block";
                    transactionError.innerHTML = "Current balance is not enough!";
                    event.preventDefault();
                    return;
                }
            }
        }
        transactionError.style.display = "block";
        transactionError.innerHTML = "Account does not exist!";
        event.preventDefault();
        return;
    }
    event.preventDefault();
    transactionForm.reset();
}

// -----------BUDGET APP-----------------------------------------------------------------
//Show Expense Form through Add Expense Button
let expenseFormDiv = document.getElementById("div-expense-form");
let showExpenseForm = document.getElementById("add-expense");
showExpenseForm.addEventListener("click", () => {
    expenseFormDiv.style.display = "block";
})

//When addExpense Form is submitted
let expenseForm = document.getElementById("form-expenses")
expenseForm.addEventListener("submit", addExpense);

function addExpense(event) {
    let expenseName = document.getElementById("input-expenses-name").value;
    let expenseCost = parseInt(document.getElementById("input-expenses-cost").value);
    event.preventDefault();
    expenseForm.reset();
    expenseFormDiv.style.display = "none";

    let newExpense = new Expense(expenseName, expenseCost); //Create a new ExpenseObject
    currentUser.expenses.push(newExpense); //Push every added expense on currentUserObject's expenses property

    //Update Balance on currentUserObject after adding expense
    currentUser.balance -= expenseCost;

    showBalance();
    updateUsersArray();
    updateLocalStorage();
    showExpense(expenseName, expenseCost); //Show newly added expense in HTML
}









