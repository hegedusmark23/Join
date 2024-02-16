
async function init(){
    await includeHTML();
    timeDynamicWelcome();
    numberOfTodos();
}

async function initRegister(){
    await loadUsers();
}

