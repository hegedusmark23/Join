
async function init(){
    await includeHTML();
    timeDynamicWelcome();
    }

async function initRegister(){
    await loadUsers();
}

 function initSummary(){
    numberOfTodos();
}