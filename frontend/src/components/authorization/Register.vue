<template>
    <div class="col-md-5">
        <h4 class="mx-auto mt-4">Регистрация пользователя</h4>
        <form name="form" @submit="handleRegister">
            <div v-if="!successful">
                <div class="form-group mb-3">
                    <div class="form-group mb-3">
                        <input type="text" class="form-control" name="name" placeholder="ФИО" v-model="user.name" required/>
                    </div>
                    <div class="form-group mb-3">
                        <input type="text" class="form-control" name="login" placeholder="Логин" v-model="user.login" required/>
                    </div>

                    <div class="form-group mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
                    </div>
                </div>
                <h5 class="title">Выберите университет:</h5>
                <div class="form-group mb-3"> 
                    <select class="form-control" placeholder="Университет" required v-model="university_id">
                        <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                            {{university.name}}
                        </option>
                    </select>
                </div>
                <h5 class="title">Выберите факультет:</h5>
                <div class="form-group mb-3"> 
                    <select class="form-control" placeholder="Факультет" required v-model="faculty_id">
                        <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                            {{faculty.name}}
                        </option>
                    </select>
                </div>
                <h5 class="title">Выберите направление:</h5>
                <div class="form-group mb-3"> 
                    <select class="form-control" placeholder="Направление" required v-model="direction_id">
                        <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                            {{direction.name}}
                        </option>
                    </select>
                </div>
                <h5 class="title">Выберите студенческую группу:</h5>
                <div class="form-group mb-3"> 
                    <select class="form-control" placeholder="Студенческая группа" required v-model="user.student_group_id">
                        <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                            {{studentGroup.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Зарегистрировать</button>
                </div>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: 'RegisterUser',
        data() {
            return {
                user: {
                    name: "",
                    login: "",
                    password: "",
                    student_group_id: ""
                },
                successful: false,
                message: '',
                universities: [],
                university_id: null,
                faculties: [],
                faculty_id: null,
                directions: [],
                direction_id: null,
                studentGroups: [],
            };
        },
        watch: {
            university_id(){
                this.getFaculties();
                this.faculty_id = null;
            },
            faculty_id(){
                this.getStudentGroups();
                this.user.student_group_id = null;
            },
            direction_id(){
                this.getStudentGroups();
                this.user.student_group_id = null;
            },
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        methods: {
            handleRegister(e) {
                e.preventDefault();
                this.message = '';

                this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                    .then( data => {
                        this.message = data.message;
                        this.successful = true;
                    })
                    .catch(e => {
                            this.message = e.response.data.message;
                        }
                    );

            },
            getUniversities() {
                http
                    .get("/universities") // обращаемся к серверу для получения списка университетов
                    .then(response => { // запрос выполнен успешно
                        this.universities = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getFaculties() {
                http
                    .get("/listFaculties/" + this.university_id) // обращаемся к серверу для получения списка факультетов
                    .then(response => { // запрос выполнен успешно
                        this.faculties = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getDirections() {
                http
                    .get("/directions") // обращаемся к серверу для получения списка направлений
                    .then(response => { // запрос выполнен успешно
                        this.directions = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getStudentGroups() {
                http
                    .get("/listStudentGroups/faculty_id=" + this.faculty_id + "/direction_id=" + this.direction_id) // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.studentGroups = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
        },
        mounted() {
            this.getUniversities();
            this.getDirections(); 
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
    };
</script>