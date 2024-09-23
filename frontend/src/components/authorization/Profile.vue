<template>
    <div class="container">
        <header>
            <h3>Профиль <strong>{{currentUser.name}}</strong></h3>
        </header>
        <p>
            <strong>Логин:</strong>
            {{currentUser.login}}
        </p>
        <div v-if="!submitted">
            <form @submit="updateUser" class="form-group mt-3 gap-3 d-md-flex">
                <div class="col-auto">
                    <input type="text" name="name" id="name" class="form-control" placeholder="ФИО" required v-model="currentUser.name">
                </div>
                <div class="col-auto">
                    <select class="form-control" placeholder="Университет" required v-model="university_id">
                        <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                            {{university.name}}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-control" placeholder="Факультет" required v-model="faculty_id">
                        <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                            {{faculty.name}}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-control" placeholder="Направление" required v-model="direction_id">
                        <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                            {{direction.name}}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-control" placeholder="Студенческая группа" required v-model="studentGroup_id">
                        <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                            {{studentGroup.name}}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <input type="submit" class="btn btn-outline-primary" value="Обновить">
                </div>
            </form>    
        </div>
        <div v-else class="mx-auto mt-3 gap-3">
            <h4>Вы успешно обновили данные</h4>
            <input type='button' class="btn btn-outline-primary" onclick='window.location.reload()'  value='Обновить страницу'/>
        </div>        
        <h5 class="title mt-3 d-md-flex">Выберите категорию:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Категория" required v-model="category_id">
                <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                    {{category.name}}
                </option>
            </select>
        </div>
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(work, index) in works" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'work-details',
                        params: { id: work.id }
                    }">
                    {{work.name}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addWorkUser"> Добавить работу </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: 'ProfileUser',
        data() {
            return {
                user: null,
                studentGroup: null,
                studentGroup_id: null,
                faculty: null,
                university_id: null,
                faculty_id: null,
                direction_id: null,
                universities: [],
                faculties: [],
                directions: [],
                studentGroups: [],
                categories: [],
                category_id: null,
                works: []
            };
        },
        watch: {
            user(){
                this.getStudentGroup();
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
            universities(){
                this.getFaculties();
            },
            university_id(){
                this.getNewStudentGroups();
                this.getNewFaculties();
            },
            faculties(){
                this.getStudentGroups();
            },
            directions(){
                this.getStudentGroups();
            },
            faculty_id(){
                this.getNewStudentGroups();
            },
            direction_id(){
                this.getNewStudentGroups();
            },
            getNewFaculties(){
                this.getNewStudentGroups();
            },
            category_id(){
                this.getWorks();
            },
        },
        methods: {
            getUser() {
                http
                    .get("/user/"+ this.currentUser.id)
                    .then(response => {
                        this.user = response.data;
                        console.log(this.user);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.user.name,
                    login: this.user.login,
                    password: this.user.password,
                    student_group_id: this.studentGroup_id,
                };
                http
                    .post("/updateUser/" + this.user.id, data)
                    .then(() => { // запрос выполнился успешно
                         
                        //this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteUser() {
                http
                    .post("/deleteUser/" + this.user.id)
                    .then(() => {
                        this.$router.push('/listUsers'); // переходим к списку пользователей
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
                        this.studentGroup_id = this.studentGroup.id;
                        console.log(this.studentGroup);
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
                    
                        console.log(this.faculty);
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
                        console.log(this.universities)
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getFaculties() {
                http
                    .get("/listFaculties/" + this.faculty.university_id) // обращаемся к серверу для получения списка факультетов выбранной группы
                    .then(response => { // запрос выполнен успешно
                        this.faculties = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getNewFaculties() {
                http
                    .get("/listFaculties/" + this.university_id) // обращаемся к серверу для получения нового списка факультетов (после смены университета)
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
                    .get("/listStudentGroups/faculty_id=" + this.studentGroup.faculty_id + "/direction_id=" + this.studentGroup.direction_id) // обращаемся к серверу для получения списка студенческих групп
                    .then(response => { // запрос выполнен успешно
                        this.studentGroups = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getNewStudentGroups() {
                http
                .get("/listStudentGroups/faculty_id=" + this.faculty_id + "/direction_id=" + this.direction_id) // обращаемся к серверу для получения нового списка факультетов (после смены университета)
                    .then(response => { // запрос выполнен успешно
                        this.studentGroups = response.data;
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
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            getWorks() {
                http
                .get("/listWorks/user_id=" + this.currentUser.id + "/category_id=" + this.category_id) // обращаемся к серверу для получения списка работ
                    .then(response => { // запрос выполнен успешно
                        this.works = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            this.getUser();
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            this.getCategories(); 
        }
    };
</script>