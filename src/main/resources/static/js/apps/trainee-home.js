var TraineeHomeApp = (function () {

    var template = `
        <article class="card">
            <div class="card-body">
                <h3>Assigned Course</h3>
        
                <loading-status v-if="assignmentsLoading"></loading-status>
        
                <div class="userAssignments">
                    <div v-for="assignment in userAssignments" class="userAssignments-single">
                        <img v-if="assignment.assignedCourse.imageName !== null" :src="cdnUrl + '/images/' + assignment.assignedCourse.imageName" alt="">
                        <img v-else :src="contextRoot + '/images/placeholder.jpeg'" alt="">
                        <div class="userAssignments-single-body">
                            <h3>{{ assignment.assignedCourse.title }}</h3>
                            <h4>Deadline: {{ assignment.deadline | dateFormat }}</h4>
                            <a :href="'course/' + assignment.assignedCourse.courseId">Start Course</a>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-info" v-if="!assignmentsLoading && userAssignments.length === 0">There are currently no assigned courses</div>
            </div>
        </article>
    `

    return {
        template: template,
        data: function () {
            return {
                assignmentsLoading: true,
                userAssignments: [],
                contextRoot: Config.contextRoot,
                cdnUrl: Config.cdnUrl
            }
        },
        components: {
            'loading-status': LoadingStatus
        },
        filters: {
            dateFormat: function (date) {
                return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
        },
        created: function () {
            var self = this;

            fetch(Config.assignedCoursesApiUrl, {
                credentials: "include"
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }

                    self.assignmentsLoading = false;
                })
                .catch(error => {
                    console.error('Error', error);
                    self.assignmentsLoading = false;
                })
                .then(function (json) {
                    if (json) {
                        self.userAssignments = json;
                        self.assignmentsLoading = false;
                    }
                })
        }
    };

})();

new Vue(TraineeHomeApp).$mount('#traineeHomeApp');