
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

                    <div class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img src="/assets/img/pencil-white.png" alt=""></div>
                        <div>
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">To-do</span>
                        </div>
                    </div>

                    <div class="summary-task-display-mid">
                        <div class="summary-icon-circle"><img src="/assets/img/check-white.png" alt=""></div>
                        <div>
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">Done</span>
                        </div>
                    </div>

                    <div class="summary-task-display-long">
                        <div>
                            <div><img src="/assets/img/double-arrows-up.png" alt=""></div>
                            <div>
                            <h1 class="tasks-number">0</h1>
                            <span class="summary-text">Urgent</span>
                            </div>
                        </div>
                        <div class="gray-vert-line"></div>
                        <div>
                            <h3>Sample date</h3>
                            <span>Upcoming Deadline</span>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div class="welcome-section">
                    <h1 class="daytime-text">Sample Daytime,</h1><br>
                    <h1 class="user-name-text">Sample User</h1>
                </div>
            </div>
        </div>
    `;
}