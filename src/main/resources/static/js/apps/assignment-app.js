var AssignmentApp = (function () {

    var template =  `
        <div class="courseApp">
            <loading-status v-if="assignment === null"></loading-status>
            <div class="course-stageContainer" v-if="assignment !== null">
                <assignment :assignment="assignment"></assignment>
            </div>
        </div>
    `;

    return {
        template: template,
        data: function () {
            return {
                assignment: null,
                course: null
            }
        },
        components: {
            'assignment': Assignment,
            'loading-status': LoadingStatus
        },
        created: function () {
            var self = this;
            var assignmentId = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
            fetch(Config.assignmentsdApiUrl + '/' + assignmentId, {
                credentials: 'include'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (assignment) {
                self.assignment = assignment;
            });
        }
    }

})();

new Vue(AssignmentApp).$mount('#assignmentApp');