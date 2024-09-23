<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.user" class="col-6">
                    <h4>Пользователь</h4>
                    <div v-if="!submitted">
                        <form @submit="updateUser" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" name="name" id="name" class="form-control" placeholder="ФИО" required v-model="user.name">
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
                                <select class="form-control" placeholder="Студенческая группа" required v-model="user.student_group_id">
                                    <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                                        {{studentGroup.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                            <div class="col-auto">
                                <button v-on:click="deleteUser()" class="btn btn-outline-danger">Удалить</button>
                            </div>
                        </form>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listUsers">Вернуться к списку пользователей</router-link>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите пользователя</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "user-details",
        props: ['id'],
        data() {
            return {
                user: null,
                studentGroup: null,
                faculty: null,
                university_id: null,
                faculty_id: null,
                direction_id: null,
                universities: [],
                faculties: [],
                directions: [],
                studentGroups: [],
                submitted: false
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
            university_id(){
                console.log("university_id " + this.university_id);
                if(this.faculty.university_id != this.university_id){
                    this.faculty_id = null;
                }
                this.getFaculties();
                this.getStudentGroups();
            },
            faculty_id(){
                console.log("faculty_id " + this.faculty_id);
                this.getStudentGroups();
            },
            direction_id(){
                console.log("direction_id " + this.direction_id);
                this.getStudentGroups();
            },
            
        },
        methods: {
            getUser() {
                http
                    .get("/user/"+ this.id)
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
                    student_group_id: this.user.student_group_id,
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
        },
        mounted() { // загружаем данные пользователя
            this.getUser();
            //this.getDirections();
        }
    }
</script>