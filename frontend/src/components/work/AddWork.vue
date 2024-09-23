<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление работы</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addWork определён в script-->
                <form @submit="addWork" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <h5 class="title mt-3 d-md-flex">Выберите университет:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Университет" required v-model="university_id">
                            <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                                {{university.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите факультет:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Факультет" required v-model="faculty_id">
                            <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                                {{faculty.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите направление:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Направление" required v-model="direction_id">
                            <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                                {{direction.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите студенческую группу:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Студенческая группа" required v-model="student_group_id">
                            <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                                {{studentGroup.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите пользователя:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Пользователь" required v-model="work.user_id">
                            <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                                {{user.name}}
                            </option>
                        </select>
                    </div>
                    <h5 class="title mt-3 d-md-flex">Выберите категорию:</h5>
                    <div class="form-group mb-3 mt-3 d-md-flex"> 
                        <select class="form-control" placeholder="Категория" required v-model="work.category_id">
                            <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                                {{category.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="name" id="name" placeholder="Наименование работы" required v-model="work.name" class="form-control">
                        <input type="text" name="name" id="name" class="form-control" placeholder="Описание работы" required v-model="work.description"> 
                        <input type="file" id="file" ref="file" class="form-control" accept=".jpg, .jpeg, .png, .gif, .bmp" required v-on:change="handleFileUpload()"/>
                        <input type="date" name="year" id="year" class="form-control" placeholder="Дата" required v-model="work.year">
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
                                <button v-on:click="newWork" class="btn btn-outline-primary">Добавить новую работу</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listWorks">Вернуться к списку работ</router-link>
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
        name: "add-work",
        data() {
            return {
                work: {
                    name: "",
                    description: "", 
                    file: "",
                    year: "",
                    user_id: null,
                    category_id: null,
                },
                universities: [],
                university_id: null,
                faculties: [],
                faculty_id: null,
                directions: [],
                direction_id: null,
                studentGroups: [],
                student_group_id: null,
                users: [],
                categories: [],
                message: "",
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
                this.student_group_id = null;
            },
            direction_id(){
                this.getStudentGroups();
                this.student_group_id = null;
            },
            student_group_id(){
                this.getUsers();
                this.work.user_id = null;
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
            addWork(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios

                let formData = new FormData();
                formData.append('name', this.work.name);
                formData.append('file', this.work.file);
                formData.append('description', this.work.description);
                formData.append('year', this.work.year);
                formData.append('user_id', this.work.user_id);
                formData.append('category_id', this.work.category_id);
                
                http
                    .post("/addWork", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => { // запрос выполнился успешно
                        this.message = "Добавление записи выполнено успешно"
                        this.$router.push('/listWorks'); // переходим к списку работ
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                        this.message = "Запись не добавлена в базу данных, повторите попытку или обратитесь к администратору для выяснения причины ошибки";
                    });
                this.submitted = true;
            },
            
            handleFileUpload(){
                this.work.file = this.$refs.file.files[0];
            },

            newWork() {
                this.submitted = false;
                this.work = {
                    name: "",
                    description: "", 
                    file: "",
                    year: "",
                    user_id: null,
                    category_id: null,
                };
                this.university_id = null;
                this.faculty_id = null;
                this.direction_id = null;
                this.student_group_id = null;
            }
        },
        mounted() {
            this.getUniversities();
            this.getDirections(); 
            this.getCategories(); 
        }
    }
</script>