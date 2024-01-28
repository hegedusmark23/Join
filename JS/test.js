// Test Array
let users = [
    { initials: "AM", name: "Anton Mayer", added: false, loginState: "loggedIn", color: "#FF5733" },
    { initials: "SH", name: "Sahrah Huber", added: true, loginState: null, color: "#9df400" },
    { initials: "PS", name: "Peter Schmitt", added: false, loginState: null, color: "#FFC300" },
    { initials: "TM", name: "Thomas Müller", added: false, loginState: null, color: "#581845" },
    { initials: "FS", name: "Frank Schulz", added: false, loginState: null, color: "#C70039" },
    { initials: "BV", name: "Bert Vogel", added: false, loginState: null, color: "#900C3F" },
    { initials: "DZ", name: "Dominik Ziegler", added: false, loginState: null, color: "#34495E" }
];

let dropdownContent = document.getElementById('assign-to');

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let userContainer = document.createElement('div');
        userContainer.className = 'dropdwon-content-container' + (user.added ? ' user-checked' : '');

        userContainer.innerHTML = `
            <div class="dropdown-content-binding">
                <div class="dropdown-content-circle" style="background-color:${user.color};">
                    <p id="user-initials">${user.initials}</p>
                </div>
                <div class="dropdown-content-name">
                    <a id="user-name" href="#" data-value="option${i + 1}">${user.name}</a>
                </div>
            </div>
            <div class="dropdown-content-checkbox">
                ${user.added ? `
                <svg id="checkbox-checked-active" style="display:block" width="25" height="24"
                    viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882"
                        stroke="#fff" stroke-width="2" stroke-linecap="round" />
                    <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>` : `
                <svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647"
                        stroke-width="2" />
                </svg>`}
            </div>
        `;

        dropdownContent.appendChild(userContainer);
    }
