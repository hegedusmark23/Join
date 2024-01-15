
function summaryHTML() {
    return /*html*/`
        <div class="summary-container">
            <div class="summary-headline">
                <h1 class="summary-headline-bold">Join 360</h1>
                <div class="vert-blue-line"></div>
                <p class="summary-headline-normal">Key Metrics at a Glance</p>
            </div>
            <div class="summary-main-content">
                <div class="tasks-summary-section">

                    <div id="pencil-button" onmouseover="changePencilImgColor()" class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img id="pencil-icon" src="/assets/img/pencil-white.png" alt=""></div>
                        <div class="text-center">
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">To-do</span>
                        </div>
                    </div>

                    <div id="check-button" onmouseover="changeCheckImgColor()" class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img id="check-icon" src="/assets/img/check-white.png" alt=""></div>
                        <div class="text-center">
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">Done</span>
                        </div>
                    </div>

                    <div class="summary-task-display-long">
                        <div class="urgency-div">
                            <div class="red-urgent-icon"><img src="/assets/img/doube-arrows-up.png" alt=""></div>
                            <div class="text-center">
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">Urgent</span>
                            </div>
                        </div>
                        <div class="gray-vert-line"></div>
                        <div class="deadline-div">
                            <h3>Sample date</h3>
                            <span>Upcoming Deadline</span>
                        </div>
                    </div>

                    <div class="summary-task-display-small">
                        <h1 class="tasks-number">0</h1>
                        <span class="summary-text-bigger">Tasks in Board</span>
                    </div>

                    <div class="summary-task-display-small">
                        <h1 class="tasks-number">0</h1>
                        <span class="summary-text-bigger">Tasks In Progress</span>
                    </div>

                    <div class="summary-task-display-small">
                        <h1 class="tasks-number">0</h1>
                        <span class="summary-text-bigger">Awaiting Feedback</span>
                    </div>
                </div>
                <div class="welcome-section">
                    <h1 class="daytime-text">Sample Daytime,</h1><br>
                    <h1 class="user-name-text">Sample User</h1>
                </div>
            </div>
        </div>
    `;
}


