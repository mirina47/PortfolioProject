<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div v-if="this.work" class="col-6">
                <h4>Работа</h4>
                <div v-if="!submitted">
                    <form @submit="updateWork" class="row row-cols-lg-1 mt-3 gap-3">
                        <h5 class="title mt-3 d-md-flex">Наименование работы:</h5>
                        <div class="col-auto">
                            <input type="text" name="name" id="name" class="form-control" placeholder="Наименование работы" required v-model="work.name">
                        </div>
                        <h5 class="title mt-3 d-md-flex">Работа:</h5>
                        <div class="col-auto">
                            <img :src="this.globalVariables.serverUrl + work.link" width="100"/>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Описание работы:</h5>
                        <div class="col-auto">
                            <input type="text" name="name" id="name" class="form-control" placeholder="Описание работы" required v-model="work.description">
                        </div>
                        <h5 class="title mt-3 d-md-flex">Дата:</h5>
                        <div class="col-auto">
                            <input type="date" name="year" id="year" class="form-control" placeholder="Дата" required v-model="work.year">
                        </div>
                        <h5 class="title mt-3 d-md-flex">Университет:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Университет" required v-model="university_id">
                                <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                                    {{university.name}}
                                </option>
                            </select>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Факультет:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Факультет" required v-model="faculty_id">
                                <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                                    {{faculty.name}}
                                </option>
                            </select>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Направление:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Направление" required v-model="direction_id">
                                <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                                    {{direction.name}}
                                </option>
                            </select>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Студенческая группа:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Студенческая группа" required v-model="student_group_id">
                                <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                                    {{studentGroup.name}}
                                </option>
                            </select>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Пользователь:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Пользователь" required v-model="work.user_id">
                                <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                                    {{user.name}}
                                </option>
                            </select>
                        </div>
                        <h5 class="title mt-3 d-md-flex">Категория:</h5>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Категория" required v-model="work.category_id">
                                <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                                    {{category.name}}
                                </option>
                            </select>
                        </div>
                        <div class="input-group mt-3 sm-10 gap-3 d-md-flex">
                            <div class="col-auto" >
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                            <div class="col-auto">
                                <button v-on:click="deleteWork()" class="btn btn-outline-danger">Удалить</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else class="mx-auto mt-3 gap-3">
                    <h4>Вы успешно обновили запись</h4>
                    <div v-if="currentUser.login === 'admin'"><router-link class="btn btn-outline-primary" to="/listWorks">Вернуться к списку работ</router-link></div>
                    <div v-else><router-link class="btn btn-outline-primary" to="/profile">Вернуться к профилю</router-link></div>
                </div>
            </div>
            <div v-else>
                <br>
                <p>Выберите работу</p>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";
    export default {
        name: "work-details",
        props: ['id'],
        data() {
            return {
                work: null,
                user: null,
                studentGroup: null,
                faculty: null,
                university_id: null,
                faculty_id: null,
                direction_id: null,
                student_group_id: null,
                universities: [],
                faculties: [],
                directions: [],
                studentGroups: [],
                users: [],
                categories: [],
                message: "",
                submitted: false
            };
        },
        watch: {
            work(){
                this.getUser();
                this.getCategories();

            },
            user(){
                this.getStudentGroup();
                this.student_group_id = this.user.student_group_id;
            },
            studentGroup(){
                this.getFaculty();
                this.getDirections();
                this.faculty_id = this.studentGroup.faculty_id;
                this.direction_id = this.studentGroup.direction_id;
            },
            faculty(){
                this.getUniversities();
                this.university_id = this.faculty.university_id;
            },
            university_id(){
                console.log("university_id " + this.university_id);
                if(this.faculty.university_id != this.university_id){
                    this.faculty_id = null;
                    this.student_group_id = null;
                }
                this.getFaculties();
                this.getStudentGroups();
            },
            faculty_id(){
                console.log("faculty_id " + this.faculty_id);
                if(this.studentGroup.faculty_id != this.faculty_id){
                    this.student_group_id = null;
                }
                this.getStudentGroups();
            },
            direction_id(){
                console.log("direction_id " + this.direction_id);
                if(this.studentGroup.faculty_id != this.faculty_id){
                    this.student_group_id = null;
                }
                this.getStudentGroups();
            },
            student_group_id(){
                console.log("student_group_id " + this.student_group_id);
                this.getUsers();
               
            },
            
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getWork() {
                http
                    .get("/work/"+ this.id)
                    .then(response => {
                        this.work = response.data;
                        //console.log(this.work);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getLink(base64, mime_type){
                var byteCharacters = atob(base64);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var file = new Blob([byteArray], { type: mime_type });
                var fileURL = URL.createObjectURL(file);
                return fileURL;
            },
            updateWork(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.work.name,
                    description: this.work.description,
                    year: this.work.year,
                    link: this.work.link,
                    user_id: this.work.user_id,
                    category_id: this.work.category_id
                };
                http
                    .post("/updateWork/" + this.work.id, data)
                    .then(() => { // запрос выполнился успешно
                        //if (this.currentUser.login === 'admin') this.$router.push('/listWorks'); // переходим к списку работ
                        //else this.$router.push('/profile'); // переходим к профилю
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteWork() {
                http
                    .post("/deleteWork/" + this.work.id)
                    .then(() => {
                        this.getWork();
                        if (this.currentUser.login === 'admin') this.$router.push('/listWorks'); // переходим к списку работ
                        else this.$router.push('/profile'); // переходим к профилю
                        //this.$router.push('/listWorks'); // переходим к списку работ
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            getUser() {
                http
                    .get("/user/" + this.work.user_id)
                    .then(response => {
                        this.user = response.data;
                        //console.log(this.user);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getStudentGroup() {
                http
                    .get("/studentGroup/"+ this.user.student_group_id)
                    .then(response => {
                        this.studentGroup = response.data;
                        //console.log(this.studentGroup);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getFaculty() {
                http
                    .get("/faculty/" + this.studentGroup.faculty_id)
                    .then(response => {
                        this.faculty = response.data;
                        //console.log(this.faculty);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getUniversities() {
                http
                    .get("/universities") // обращаемся к серверу для получения списка университетов
                    .then(response => { // запрос выполнен успешно
                        this.universities = response.data;
                        //console.log(this.universities)
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
                        //console.log(this.directions)
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
            getUsers() {
                http
                    .get("listUsers/student_group_id=" + this.student_group_id) // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.users = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getCategories() {
                http
                    .get("/categories") // обращаемся к серверу для получения списка категорий
                    .then(response => { // запрос выполнен успешно
                        this.categories = response.data;
                        //console.log(this.categories)
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
        },
        mounted() {
            this.getWork();
        }
    }
</script>