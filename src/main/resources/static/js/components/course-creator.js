(function () {

    const BLANK_STAGE = {stageid: null, title: '', videoUrl: '', transcript: '', questions: []};
    const BLANK_QUESTION = {questionid: null, question: '', explanation: '', options: []};
    const BLANK_OPTION = {optionid: null, text: '', isCorrect: false};

    var optionTemplate = [
        '<div class="form-group row">',
            '<label class="col-sm-2 col-form-label">Option {{optionindex + 1}}</label>',
            '<div class="col-sm-7">',
                '<input type="text" v-model="optionText" :class="[\'form-control\', {\'is-invalid\': wasValidated && !validOptionText}]" />',
                '<div class="invalid-feedback">Option text must be provided</div>',
            '</div>',
            '<div class="col-sm-2">',
                '<div class="form-check">',
                    '<input class="form-check-input" type="checkbox" :id="\'chbx-questionoption-\' + randId" v-model="isCorrect"><label class="form-check-label" :for="\'chbx-questionoption-\' + randId"><i class="fas fa-check-circle"></i></label>',
                '</div>',
            '</div>',
            '<div class="col-sm-1 text-right">',
                '<button class="btn btn-medium btn-light" @click="removeOption"><i class="fas fa-trash-alt"></i></button>',
            '</div>',
        '</div>',
    ].join('');

    Vue.component('course-creator-option', {
        props: ['course', 'stageindex', 'questionindex', 'optionindex'],
        template: optionTemplate,
        data: function () {
            return {
                optionText: this.course.stages[this.stageindex].questions[this.questionindex].options[this.optionindex].text,
                isCorrect: this.course.stages[this.stageindex].questions[this.questionindex].options[this.optionindex].isCorrect,
                randId: Util.guid()
            }
        },
        methods: {
            removeOption: function () {
                this.course.stages[this.stageindex].questions[this.questionindex].options.splice(this.optionindex, 1);
            },
            isValid: function () {
                return this.validOptionText;
            }
        },
        watch: {
            optionText: function (newVal) {
                this.course.stages[this.stageindex].questions[this.questionindex].options[this.optionindex].text = newVal;
            },
            isCorrect: function (newVal) {
                this.course.stages[this.stageindex].questions[this.questionindex].options[this.optionindex].isCorrect = newVal;
            }
        },
        computed: {
            wasValidated: function () {
                return this.course.wasValidated;
            },
            validOptionText: function () {
                return this.optionText.length > 0;
            },
        }
    });


    var questionTemplate = [
        '<div class="courseCreator-questions-tabInner">',
            '<div class="form-group">',
                '<label>Question</label>',
                '<input type="text" v-model="questionTitle" :class="[\'form-control\', {\'is-invalid\': wasValidated && !validQuestionTitle}]" />',
                '<div class="invalid-feedback">Question is required</div>',
            '</div>',
            '<div class="form-group">',
                '<label>Explanation</label>',
                '<input type="text" v-model="explanation" :class="[\'form-control\', {\'is-invalid\': wasValidated && !validExplanation}]" />',
                '<div class="invalid-feedback">Explanation is required</div>',
            '</div>',
            '<div class="courseCreator-questions-options">',
                '<h4>Options</h4>',
                '<course-creator-option ref="optionEls" v-for="(option, optionIndex) in options" :stageindex="stageindex" :questionindex="questionindex" :course="course" :optionindex="optionIndex" :key="option.uid"></course-creator-option>',
                '<button class="btn btn-light" @click="addOption">Add Option  <i class="fas fa-plus-circle"></i></button>',
            '</div>',
        '</div>',
    ].join("");

    Vue.component('course-creator-question', {
        props: ['course', 'stageindex', 'questionindex'],
        template: questionTemplate,
        data: function () {
            return  {
                questionTitle: this.course.stages[this.stageindex].questions[this.questionindex].question,
                explanation: this.course.stages[this.stageindex].questions[this.questionindex].explanation
            }
        },
        methods: {
            addOption: function () {
                var newOption = Util.clone(BLANK_OPTION);
                newOption.uid = Util.guid();

                this.course.stages[this.stageindex].questions[this.questionindex].options.push(newOption);
            },
            isValid: function () {
                var validChildren = true;

                if (this.$refs.optionEls) {
                    this.$refs.optionEls.forEach(child => {
                        if (!child.isValid()) {
                            validChildren = false;
                        }
                    })
                }

                return validChildren && this.validQuestionTitle && this.validExplanation;
            }
        },
        watch: {
            questionTitle: function (newVal) {
                this.course.stages[this.stageindex].questions[this.questionindex].question = newVal;
            },
            explanation: function (newVal) {
                this.course.stages[this.stageindex].questions[this.questionindex].explanation = newVal;
            }
        },
        computed: {
            wasValidated: function () {
                return this.course.wasValidated;
            },
            validQuestionTitle: function () {
                return this.questionTitle.length > 0;
            },
            validExplanation: function () {
                return this.explanation.length > 0;
            },
            options: function () {
                return this.course.stages[this.stageindex].questions[this.questionindex].options;
            }
        }
    });

    var stageTemplate = `
        <div class="courseCreator-stageSingle">
        <div class="alert alert-danger" v-if="wasValidated && !validNumQuestions">At least 6 questions must be asked per stage</div>
            <div class="form-group">
                <label>Stage Title</label>
                <input type="text" v-model="title" :class="[\'form-control\', {\'is-invalid\': wasValidated && !validQuestionTitle}]" />
                <div class="invalid-feedback" >Stage Title is required</div>
            </div>
            <div class="form-group">
                <label>Video URL</label>
                <input type="text" v-model="videoUrl" :class="[\'form-control\', {\'is-invalid\': wasValidated && !validVideoUrl}]" />
                <div class="invalid-feedback">Video URL is required</div>
            </div>
            <div class="form-group">
                <label>Video Transcript</label>
                <textarea v-model="transcript" class="form-control" />
            </div>
            <div class="courseCreator-questions">
                <ul class="nav nav-tabs">
                    <li class="nav-item" v-for="(question, questionIndex) in questions">
                        <a :class="[\'nav-link\', {active: currentQuestionIndex === questionIndex}]" @click="changeQuestion(questionIndex)">Question {{questionIndex + 1}} <button class="btn btn-clear" @click.stop="removeQuestion(questionIndex)"><i class="fas fa-trash-alt"></i></button></a>
                    </li>
                    <li class="nav-item nav-buttonContainer"><button class="btn btn-secondary" @click="addQuestion">Add Question  <i class="fas fa-plus-circle"></i></button></li>
                </ul>
                <course-creator-question ref="questionsEls" v-for="(question, questionIndex) in questions" :stageindex="stageindex" :questionindex="questionIndex" :course="course" :key="question.uid" v-show="currentQuestionIndex === questionIndex"></course-creator-question>
            </div>
        </div>
    `;

    Vue.component('course-creator-stage', {
        props: ['stageindex', 'course'],
        template: stageTemplate,
        data: function () {
            return {
                title: this.course.stages[this.stageindex].title,
                videoUrl: this.course.stages[this.stageindex].videoUrl,
                transcript: this.course.stages[this.stageindex].transcript,
                currentQuestionIndex: this.course.stages[this.stageindex].questions.length > 0? 0 : null
            };
        },
        methods: {
            addQuestion: function () {
                var newQuestion = Util.clone(BLANK_QUESTION);
                newQuestion.uid = Util.guid();

                this.course.stages[this.stageindex].questions.push(newQuestion);
                this.currentQuestionIndex = this.course.stages[this.stageindex].questions.length - 1;
            },
            removeQuestion: function (questionIndex) {
                this.course.stages[this.stageindex].questions.splice(questionIndex, 1);

                if (this.questions.length > 0 && questionIndex <= this.currentQuestionIndex) {
                    this.currentQuestionIndex--;
                } else if (this.questions.length === 0) {
                    this.currentQuestionIndex = null;
                }
            },
            changeQuestion: function (questionIndex) {
                this.currentQuestionIndex = questionIndex;
            },
            isValid: function () {
                var childrenValid = true;

                if (this.$refs.questionsEls) {
                    this.$refs.questionsEls.forEach(child => {
                        if (!child.isValid()) {
                            childrenValid = false;
                        }
                    })
                }

                return childrenValid && this.validQuestionTitle && this.validVideoUrl && this.validNumQuestions;
            }
        },
        computed: {
            questions: function () {
                return this.course.stages[this.stageindex].questions;
            },
            wasValidated: function () {
                return this.course.wasValidated;
            },
            validQuestionTitle: function () {
                return this.title.length > 0;
            },
            validVideoUrl: function () {
                return this.videoUrl.length > 0;
            }
            ,
            validNumQuestions: function () {
                return this.questions.length > 5;
            }
        },
        watch: {
            title: function (newVal) {
                this.course.stages[this.stageindex].title = newVal;
            },
            videoUrl: function (newVal) {
                this.course.stages[this.stageindex].videoUrl = newVal;
            },
            transcript: function (newVal) {
                this.course.stages[this.stageindex].transcript = newVal;
            }
        }
    });

    var template = `
        <div :class="[\'courseCreator\', {wasValidated: course.wasValidated}]">
            <div class="courseCreator-form">
                <div class="alert alert-warning" v-if="course.wasValidated && !isValid()">Please fix any validation errors and submit again</div>
                <div class="form-group">
                    <label>Course Title</label>
                    <input type="text" v-model="course.title" :class="[\'form-control\', {\'is-invalid\': course.wasValidated && !validCourseTitle}]"/>
                    <div class="invalid-feedback" >Course Title is required</div>
                </div>
                <div class="form-group">
                    <label>Course Image</label>
                    <input type="text" v-model="course.imageName" class="form-control"/>
                </div>
                <div class="courseCreator-stages">
                    <ul class="nav nav-tabs courseCreator-stages-tabs">
                        <li class="nav-item" v-for="(stage, stageIndex) in stages">
                            <a :class="[\'nav-link\', {active: stageIndex === currentStageIndex}]" @click="changeStage(stageIndex)">Stage {{stageIndex + 1}} <button class="btn btn-clear" @click.stop="removeStage(stageIndex)"><i class="fas fa-trash-alt"></i></button></a>
                        </li>
                        <li class="nav-item nav-buttonContainer"><button class="btn btn-primary" @click="addStage">Add a Stage  <i class="fas fa-plus-circle"></i></button></li>
                    </ul>
                    <course-creator-stage ref="courseStageEls" v-for="(stage, stageIndex) in stages" v-show="stageIndex === currentStageIndex" :course="course" :stageindex="stageIndex" :key="stage.uid"></course-creator-stage>
                </div>
                <div class="courseCreator-actions">
                    <button @click="saveCourse" class="btn btn-primary">{{isUpdate? 'Update' : 'Save'}}</button>
                    <button @click="clearForm" class="btn btn-secondary">Clear Form</button>
                </div>
            </div>
        </div>
    `

    Vue.component('course-creator', {
        props: {
            courseData: {
                default: function () {
                    return {
                        title: '',
                        imageName: '',
                        stages: [],
                        wasValidated: false
                    }
                }
            }
        },
        template: template,
        data: function () {
            let course = Util.clone(this.courseData);
            Util.setCourseUid(course);
            course.wasValidated = false;
            return {
                course: course,
                currentStageIndex: this.courseData.stages.length > 0? 0 : null
            }
        },
        computed: {
            stages: function () {
                return this.course.stages;
            },
            validCourseTitle: function () {
                return this.course.title.length > 0;
            },
            isUpdate: function () {
                return this.course.courseId;
            }
        },
        methods: {
            saveCourse: function () {
                var self = this;
                this.course.wasValidated = true;

                if (this.isValid()) {
                    fetch(Config.coursesApiUrl + (self.isUpdate? '/' + self.course.courseId : ''), {
                        method: (self.isUpdate? 'PUT' :'POST'),
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.course)
                    }).then(response => {
                        if (response.ok) {
                            if (!self.isUpdate) {
                                self.clearForm();
                            }
                            //alert('Course ' + (self.isUpdate? 'Updated' : 'Saved') + ' Successfully');
                        } else {
                            throw Error(response.statusText);
                        }
                    }).catch(error => {
                        console.error(error);
                        //alert("An error has occurred, please try again");
                    });
                }
            },
            isValid: function () {
                var childrenValid = true;

                if (this.$refs.courseStageEls) {
                    this.$refs.courseStageEls.forEach((child) => {
                        if (!child.isValid()) {
                            childrenValid = false;
                        }
                    });
                }

                return childrenValid && this.validCourseTitle;
            },
            clearForm: function () {
                this.course = {
                    title: '',
                    stages: [],
                    wasValidated: false
                };
            },
            addStage: function () {
                var newStage = Util.clone(BLANK_STAGE);
                newStage.uid = Util.guid();
                newStage.stepOrder = this.course.stages.length;

                this.course.stages.push(newStage);
                this.currentStageIndex = this.course.stages.length - 1;
            },
            removeStage: function (stageIndex) {
                this.course.stages.splice(stageIndex, 1);

                if (this.stages.length > 0 && stageIndex <= this.currentStageIndex) {
                    this.currentStageIndex--;
                } else if (this.stages.length === 0) {
                    this.currentStageIndex = null;
                }
            },
            changeStage: function (stageIndex) {
                this.currentStageIndex = stageIndex;
            }
        }
    });

})();