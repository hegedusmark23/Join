
async function init(){
    await includeHTML();
    generateSummaryContent();
    timeDynamicWelcome();
    renderContact();
}

async function initRegister(){
    await loadUsers();
}