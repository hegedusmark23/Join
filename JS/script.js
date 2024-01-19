
function init(){
    includeHTML();
    generateSummaryContent();
}

async function initRegister(){
    await loadUsers();
}