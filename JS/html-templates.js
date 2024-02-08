
function summaryHTML() {
    return /*html*/`
        <div class="summary-container">
            
            <div class="summary-main-content">
            <div class="tasks-headline-container">
                <div class="summary-headline">
                    <h1 class="summary-headline-bold">Join 360</h1>
                    <div class="vert-blue-line"></div>
                    <p class="summary-headline-normal">Key Metrics at a Glance</p>
                    <div class="blue-line-mobile"></div>
                </div>
                <div class="tasks-summary-section">
                <div class="task-container-mid">
                    <div id="pencil-button" onmouseover="changePencilImgColor()" class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img id="pencil-icon" src="/assets/img/pencil-white.png" alt=""></div>
                        <div class="text-center">
                            <h1 class="tasks-number no-margin">0</h1>
                            <span class="summary-text">To-do</span>
                        </div>
                    </div>

                    <div id="check-button" onmouseover="changeCheckImgColor()" class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img id="check-icon" src="/assets/img/check-white.png" alt=""></div>
                        <div class="text-center">
                            <h1 class="tasks-number no-margin">0</h1>
                            <span class="summary-text">Done</span>
                        </div>
                    </div>
                </div>  
                    <div class="summary-task-display-long">
                        <div class="urgency-div">
                            <div class="red-urgent-icon"><img src="/assets/img/doube-arrows-up.png" alt=""></div>
                            <div class="text-center">
                                <h1 class="tasks-number no-margin">0</h1>
                                <span class="summary-text">Urgent</span>
                            </div>
                        </div>
                        <div class="gray-vert-line"></div>
                        <div class="deadline-div">
                            <h3>Sample date</h3>
                            <span>Upcoming Deadline</span>
                        </div>
                    </div>

                <div class="small-task-container">
                    <div class="summary-task-display-small">
                        <h1 class="tasks-number no-margin">0</h1>
                        <span class="summary-text-bigger">Tasks in Board</span>
                    </div>

                        <div class="summary-task-display-small">
                            <h1 class="tasks-number no-margin">0</h1>
                            <span class="summary-text-bigger">Tasks In Progress</span>
                        </div>

                        <div class="summary-task-display-small">
                            <h1 class="tasks-number no-margin">0</h1>
                            <span class="summary-text-bigger">Awaiting Feedback</span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="welcome-section">
                    <h1 id="daytime" class="daytime-text no-margin">Sample Daytime,</h1><br>
                    <h1 id="welcome-message" class="user-name-text no-margin">Guest User</h1>
                </div>
            </div>
        </div>
    `;
}

function legalNoticeHTML() {
    return /*html*/`
        <a class="legal-site-arrow" onclick="generateSummaryContent()"><img class="arrow" src="/assets/img/arrow-left-blue.png" alt=""></a>
            <div id="summary-content">
                <div class="legal-text-container">
                    <div>
                        <h1 class="legal-headline">Privacy Policy</h1>
                        
                    </div>
                    <div>
                        <h2>Subtitle</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque odio felis, iaculis ut massa
                        eget, ornare lacinia urna. In dignissim justo eu velit sagittis, in scelerisque nulla convallis.
                        Vestibulum eros lorem, sollicitudin eget eros non, varius aliquam mauris. Sed turpis ipsum,
                        condimentum quis nulla at, lobortis facilisis ipsum. Nunc erat justo, hendrerit vel enim vitae,
                        feugiat mattis dui. In auctor dignissim luctus. Mauris ornare ipsum at ultrices eleifend. Praesent
                        tempus congue magna. Quisque libero erat, pharetra a neque et, imperdiet semper justo.</p>
                        <h2>Subtitle</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque odio felis, iaculis ut massa
                        eget, ornare lacinia urna. In dignissim justo eu velit sagittis, in scelerisque nulla convallis.
                        Vestibulum eros lorem, sollicitudin eget eros non, varius aliquam mauris. Sed turpis ipsum,
                        condimentum quis nulla at, lobortis facilisis ipsum. Nunc erat justo, hendrerit vel enim vitae,
                        feugiat mattis dui. In auctor dignissim luctus. Mauris ornare ipsum at ultrices eleifend. Praesent
                        tempus congue magna. Quisque libero erat, pharetra a neque et, imperdiet semper justo.</p>
    
                    </div>
                </div>
            </div>
`;
}

function privacyPolicyHTML() {
    return /*html*/`
        <a class="legal-site-arrow" onclick="generateSummaryContent()"><img class="arrow"
                    src="/assets/img/arrow-left-blue.png" alt=""></a>
            <div id="summary-content">
                <div class="legal-text-container">
                    <div>
                        <h1 class="legal-headline">Legal Notice</h1>

                    </div>
                    <div>
                        <h2>Imprint</h2>
                        <li>[Student Names List]</li>
                        <li>[Address of the JOIN operator - e.g. one of the students]</li>
                        <li>[Postcode and city]</li>
                        <h2>Exploring the Board</h2>
                        Email: [Email]
                        <h2>Acceptance of terms</h2>
                        <p>By accessing and using <span class="blue-text">Join</span> (Product), you acknowledge and
                            agree to the following terms and
                            conditions, and any policies, guidelines, or amendments thereto that may be presented to you
                            from time to time. We, the listed students, may update or change the terms and conditions
                            from time to time without notice.</p>
                        <h2>Scope and ownership of the product</h2>
                        <p><span class="blue-text">Join</span> has been developed as part of a student group project in
                            a web development bootcamp at the
                            <span class="blue-text">Developer Akademie GmbH</span>. It has an educational purpose and is
                            not intended for extensive
                            personal & business usage. As such, we cannot guarantee consistent availability,
                            reliability,
                            accuracy, or any other aspect of quality regarding this Product.
                        </p>
                        <br>
                        <p>The design of <span class="blue-text">Join</span> is owned by the <span
                                class="blue-text">Developer Akademie GmbH</span>. Unauthorized use, reproduction,
                            modification, distribution, or replication of the design is strictly prohibited.</p>
                        <h2>Proprietary rights</h2>
                        <p>Aside from the design owned by <span class="blue-text">Developer Akademie GmbH</span>, we,
                            the listed students, retain all
                            proprietary rights in <span class="blue-text">Join</span>, including any associated
                            copyrighted material, trademarks, and
                            other
                            proprietary information.</p>
                        <h2>Use of the product</h2>
                        <p><span class="blue-text">Join</span> is intended to be used for lawful purposes only, in
                            accordance with all applicable laws
                            and
                            regulations. Any use of <span class="blue-text">Join</span> for illegal activities, or to
                            harass, harm, threaten, or
                            intimidate
                            another person, is strictly prohibited. You are solely responsible for your interactions
                            with
                            other users of <span class="blue-text">Join</span>.</p>
                        <h2>Disclaimer of warranties and limitation of liability</h2>
                        <p><span class="blue-text">Join</span> is provided "as is" without warranty of any kind, whether
                            express or implied, including
                            but
                            not limited to the implied warranties of merchantability, fitness for a particular purpose,
                            and
                            non-infringement. In no event will we, the listed students, or the <span
                                class="blue-text">Developer Akademie</span>, be
                            liable
                            for any direct, indirect, incidental, special, consequential or exemplary damages, including
                            but
                            not limited to, damages for loss of profits, goodwill, use, data, or other intangible
                            losses,
                            even if we have been advised of the possibility of such damages, arising out of or in
                            connection
                            with the use or performance of <span class="blue-text">Join</span>.</p>
                        <h2>Indemnity</h2>
                        <p>You agree to indemnify, defend and hold harmless us, the listed students, the <span
                                class="blue-text">Developer
                                Akademie</span>, and our affiliates, partners, officers, directors, agents, and
                            employees, from and
                            against any claim, demand, loss, damage, cost, or liability (including reasonable legal
                            fees)
                            arising out of or relating to your use of <span class="blue-text">Join</span> and/or your
                            breach of this Legal Notice.</p>
                        <br>
                        <p>For any questions or notices, please contact us at [Contact Email].</p>
                        <br>
                        <p>Date: July 26, 2023</p>
                    </div>
                </div>
            </div>
    `;
}

function helpHTML() {
    return /*html*/`
    <a class="legal-site-arrow" onclick="generateSummaryContent()"><img class="arrow"
    src="/assets/img/arrow-left-blue.png" alt=""></a>
<div id="summary-content">
<div class="legal-text-container">
    <div>
        <h1 class="legal-headline">Help</h1>

    </div>
    <div>
        Welcome to the help page for <span class="blue-text">Join</span>, your guide to using our kanban
        project management tool. Here,
        we'll provide an overview of what <span class="blue-text">Join</span> is, how it can benefit
        you, and how to use it.
        <h2>What is Join?</h2>
        <p><span class="blue-text">Join</span> is a kanban-based project management tool designed and
            built by a group of dedicated
            students as part of their web development bootcamp at the Developer Akademie.</p>
        <br>
        <p>Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work,
            limit work-in-progress, and maximize efficiency (or flow). <span
                class="blue-text">Join</span> leverages the principles of
            kanban to help users manage their tasks and projects in an intuitive, visual interface.</p>
        <br>
        <p>It is important to note that Join is designed as an educational exercise and is not intended
            for
            extensive business usage. While we strive to ensure the best possible user experience, we
            cannot
            guarantee consistent availability, reliability, accuracy, or other aspects of quality
            regarding
            <span class="blue-text">Join</span>.
        </p>
        <h2>How to use it</h2>
        <p>Here is a step-by-step guide on how to use <span class="blue-text">Join</span>:</p>



        <ol type="1">
            <li>
                <h3>Exploring the Board</h3>
                When you log in to Join, you'll find a default board. This board represents your project
                and
                contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".
            </li>


            <li>
                <h3>Creating Contacts</h3>
                In Join, you can add contacts to collaborate on your projects. Go to the "Contacts"
                section,
                click on "New contact", and fill in the required information. Once added, these contacts
                can
                be
                assigned tasks and they can interact with the tasks on the board.
            </li>

            <li>
                <h3>Adding Cards</h3>
                Now that you've added your contacts, you can start adding cards. Cards represent
                individual
                tasks. Click the "+" button under the appropriate list to create a new card. Fill in the
                task
                details in the card, like task name, description, due date, assignees, etc.
            </li>
            <li>
                <h3>Moving Cards</h3>
                As the task moves from one stage to another, you can reflect that on the board by
                dragging and
                dropping the card from one list to another.
            </li>
            <li>
                <h3>Deleting Cards</h3>
                Once a task is completed, you can either move it to the "Done" list or delete it.
                Deleting a
                card will permanently remove it from the board. Please exercise caution when deleting
                cards, as
                this action is irreversible.
            </li>
        </ol>
        <p>Remember that using <span class="blue-text">Join</span> effectively requires consistent
            updates from you and your team to
            ensure the board reflects the current state of your project.</p>
        <br>
        <p>Have more questions about <span class="blue-text">Join</span>? Feel free to contact us at
            [Your Contact Email]. We're here to
            help you!</p>

        <h2>Enjoy using Join!</h2>

    </div>
</div>
</div>
    `;
}

function contactsHTML() {
    return /*html*/ `
    <section onclick="getEmail()"  id="contact-section" class="contact-section">
        <div id="contact-book" class="contact-book">
        <div onclick="showAddContactOverlay()" id="add-new-contact-btn-mobile" class="add-new-contact-btn-mobile"><img class="add-person-icon" src="./assets/icons/person_add.svg" alt=""></div>
            <div id="add-new-contact-btn" class="add-new-contact-btn mobile-d-none" onclick="showAddContactOverlay()">
                <span>Add new contact</span> <img class="add-person-icon" src="./assets/icons/person_add.svg"
                    alt="add-person">
            </div>
            <div id="contacts-list" class="contacts-list"></div>
        </div>
        <div onclick="hidePopUpEditDelete(event)" id="contact-view-section" class="contact-view-section mobile-d-none">
        <div onclick="showPopUpEditDelete(event)" id="three-vertical-dots-container" class="three-vertical-dots-container"><img class="three-vertical-dots" src="./assets/icons/three-dots.svg" alt=""></div>
        <img onclick="backToContactList()" class="arrow-left-line" src="./assets/icons/arrow-left-line.svg" alt="">
            <div id="contact-view-title-container" class="contact-view-title-container">
                <h2 class="contact-view-title">Contacts</h2>
                <span class="contact-view-separator-bar"></span>
                <h3 class="contact-view-subtitle">Better with a team</h3>
                <span class="contact-view-separator-bar-mobile"></span>
            </div>
            <div id="contact-view-container" class="contact-view-container translateX"></div>
        </div>
    </section>
</main>

    <!-- add Contact Overlay -->
    <div onclick="hideAddContactOverlay()" id="add-contact-overlay" class="contact-bg-dialog d-none">
        <div onclick="doNotClose(event)" class="contact-dialog">
            <div class="contacts-left-container">
                <div class="logo-and-title-container">
                    <span class="contact-dialog-logo-container"><img class="contact-dialog-logo" src="./assets/img/logo-small-white.png" alt=""></span>
                    <h2 class="add-contact-title">Add Contact</h2>
                    <h3 class="add-contact-subtitle">Tasks are better with a Team</h3>
                    <span class="border-bar"></span>
                </div>
            </div>
            <div class="contact-right-container">
            <div class="mobile-badge-container">
                <div class="person-icon-container">
                    <img src="./assets/icons/person.svg" alt="person">
                </div>
            </div>
                <form onsubmit="getContact(); return false" class="input-and-btn-container">
                    <span class="cross-icon-container"><img onclick="hideAddContactOverlay()" class="cross-icon"
                            src="./assets/icons/cross.svg" alt="">
                    </span>
                    <div class="inputs-container">
                        <input required class="input-name" type="text" id="name" placeholder="Name and Lastname">
                        <input required class="input-email" type="email" id="email" placeholder="E-Mail Address">
                        <input required class="input-phone" type="text" id="phone" placeholder="Phone">
                    </div>
                    <div class="contact-btn-container">
                        <button class="add-contact-btn1" onclick="emptyInputs()">Cancel
                            <img class="cross-icon-btn1" src="./assets/icons/cross.svg" alt="">
                        </button>
                        <button class="add-contact-btn2">Create contact<img
                                class="check-icon-btn2" src="./assets/icons/check.svg" alt=""></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- edit Contact Overlay -->
    <div onclick="hideEditContactOverlay(event)" id="edit-contact-overlay" class="contact-bg-dialog d-none"></div>
    `;
}

function addTaskHTML() {
    return /*html*/`
    <section id="addtask-content">

    <h1>Add Task</h1>

    <form onsubmit="return false;" class="addtask-form">
        <div class="form-section left-section">
            <div class="addtask-selection">
                <label>
                    <span class="label-text required">Title</span>
                    <input id="addtask-title" type="text" placeholder="Enter a title">
                </label>
            </div>
            <div class="addtask-selection">
                <label>
                    <span>Description</span>
                    <textarea placeholder="Enter a description" name="decription" id="description"></textarea>
                </label>
            </div>

            <div class="addtask-selection">
                <label>
                    <span class="required">Assigned to</span>
                    <div class="dropdown">
                        <button class="dropbtn">Select contacts to assign</button>
                        <div class="dropdown-ctrl">
                            <div class="icon-background"></div>
                            <div class="arrow-dropdown"></div>
                        </div>

                        <div class="dropdown-content" id="assignedTo">
                            <a href="#" data-value="option1">User A</a>
                            <a href="#" data-value="option2">User B</a>
                        </div>
                    </div>
                </label>
            </div>

        </div>
        <div class="divider"></div>
        <div class="form-section right-section">
            <div class="addtask-selection">
                <label>
                    <span class="required">Due date</span>
                    <input type="date" id="dueDate" name="due-date">
                </label>
            </div>

            <label class="addtask-custom-label">Prio</label>
            <div class="addtask-selection">
                <div class="addtask-prio-btn">
                    <button class="addtask-buttons" id="addtask-prio-urgent">Urgent
                        <img class="icon" src="/assets/img/addtask_prio-urgent-icon.svg" alt="Prio Urgent">
                    </button>
                    <button class="addtask-buttons" id="addtask-prio-medium">Medium
                        <img class="icon" src="/assets/img/addtask_prio-medium-icon.svg" alt="Prio Medium">
                    </button>
                    <button class="addtask-buttons" id="addtask-prio-low">Low
                        <img class="icon" src="/assets/img/addtask_prio-low-icon.svg" alt="Prio Low">
                    </button>
                </div>
            </div>
            <div class="addtask-selection">
                <label>
                    <span class="required">Category</span>
                    <div class="dropdown">
                        <button id="dropdown-categories" class="dropbtn">Select task category</button>
                        <div class="dropdown-ctrl">
                            <div class="icon-background"></div>
                            <div class="arrow-dropdown"></div>
                        </div>

                        <div class="dropdown-content" id="category">
                            <a href="#" data-value="option1">Technical Task</a>
                            <a href="#" data-value="option2">User Story</a>
                        </div>
                    </div>
                </label>
            </div>

            <div class="addtask-selection">
                <label>
                    <span>Subtask</span>
                    <input class="custom-input" type="text" id="subtask" name="subtask">

                </label>
            </div>
        </div>
    </form>

    <div class="addtask-actions">

        <div class="addtask-info info">This field is required</div>

        <div class="addtask-action-btns">
            <button class="transparent-btn">Clear
                <svg class="cross-icon-btn1" width="24" height="25" viewBox="0 0 24 25" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                        stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </button>
            <button class="blue-btn">Create Task <img src="/assets/icons/check.svg" alt="Create Task"></button>
        </div>

    </div>

</section>
    `;
}


