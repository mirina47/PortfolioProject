<template>
<div class="container">
    <div class="row row-cols-lg-1 mt-3 gap-3">
        <h4>Добавление пользователя</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addUser определён в script-->
            <form @submit="addUser" class="row g-2">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
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
                <div class="form-group mt-3 gap-3 d-md-flex">
                    <input type="text" name="name" id="name" placeholder="Пользователь" required v-model="user.name" class="form-control">
                    <input type="submit" value="Добавить" class="btn btn-outline-primary">
                </div>
            </form>
        </div>
        <div v-else>
            <div class="container">
                <div class="row row-cols-lg-1 g-4">
                    <h4>Вы успешно добавили запись</h4>
                    <div class="input-group mt-3 gap-3 d-md-flex">
                        <div>
                            <button v-on:click="newUser" class="btn btn-outline-primary">Добавить нового пользователя</button>
                        </div>
                        <div>
                            <router-link class="btn btn-outline-primary" to="/listUsers">Вернуться к списку пользователей</router-link>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
</div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddUser",
        data() {
            return {
                user: {
                    name: "",
                    login: "login", // пока указываем значения по умолчанию. После реализации регистрации будем отправлять на сторону сервера "нормальные" логин и пароль
                    password: "password",
                    student_group_id: null
                },
                universities: [],
                university_id: null,
                faculties: [],
                faculty_id: null,
                directions: [],
                direction_id: null,
                studentGroups: [],
                submitted: false
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
        methods: {
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
            addUser(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.user.name,
                    login: this.user.login,
                    password: this.user.password,
                    student_group_id: this.user.student_group_id
                };
                http
                    .post("/addUser", data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newUser() {
                this.submitted = false;
                this.user = {
                    name: "",
                    login: "login",
                    password: "password",
                    student_group_id: null
                };
            }
        },
        mounted() {
            this.getUniversities();
            this.getDirections(); 
        }
    }
</script>