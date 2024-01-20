
function init(){
    includeHTML();
    generateSummaryContent();
    timeDynamicWelcome();
}

async function initRegister(){
    await loadUsers();
}