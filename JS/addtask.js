const urgent = document.getElementById('addtask-prio-urgent');
console.log(urgent);  // Überprüfen, ob das Element existiert

urgent.addEventListener('click', handleClick);

function handleClick(){
    urgent.classList.add('is-active');
    console.log(urgent.classList);  // Überprüfen, ob die Klasse hinzugefügt wurde
}

  
  

