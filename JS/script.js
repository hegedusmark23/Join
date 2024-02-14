
async function init(){
    await includeHTML();
    // generateSummaryContent();
    timeDynamicWelcome();
}

async function initRegister(){
    await loadUsers();
}