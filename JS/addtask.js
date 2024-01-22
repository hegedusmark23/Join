
const prioButtons = document.querySelectorAll('.addtask-buttons');

const Colors = {
  urgent: '#ff3d00',
  medium: '#ffa800',
  low: '#7ae229'
};

// Iteriere durch jeden Button und füge den Event-Listener hinzu
prioButtons.forEach(button => {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  const button = event.target;

  // Überprüfen, ob der geklickte Button bereits 'is-active' hat
  if (button.classList.contains('is-active')) {
      // Wenn ja, entferne 'is-active' und den Hintergrundstil
      button.classList.remove('is-active');
      button.style.backgroundColor = '';
  } else {
      // Entferne 'is-active' und den Hintergrundstil von allen Buttons
      prioButtons.forEach(btn => {
          btn.classList.remove('is-active');
          btn.style.backgroundColor = '';
      });

      // Füge 'is-active' zum geklickten Button hinzu und setze die Hintergrundfarbe
      button.classList.add('is-active');
      const priority = button.id.replace('addtask-prio-', '');
      button.style.backgroundColor = Colors[priority];
  }
}


document.querySelectorAll('.dropdown-content a').forEach(item => {
  item.addEventListener('click', (event) => {
    // Verhindern, dass der Link die Seite neu lädt
    event.preventDefault();

    // Erhalten des Wertes des angeklickten Links
    const value = item.getAttribute('data-value');
    console.log("Ausgewählter Wert: ", value);

    // Aktualisieren des Textes des Dropdown-Buttons
    document.getElementById('dropdown-categories').textContent = item.textContent;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownButton = document.getElementById('dropdown-categories');
  const dropdownContent = document.getElementById('category');

  dropdownButton.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  // Klicken außerhalb des Dropdowns schließt es
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
      }
    }
  });
});

  

