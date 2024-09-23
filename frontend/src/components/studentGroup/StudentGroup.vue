<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.studentGroup" class="col-6">
                    <h4>Студенческая группа</h4>
                    <div v-if="!submitted">
                        <form @submit="updateStudentGroup" class="form-group mt-3 gap-3 d-md-flex">
                            <div class="col-auto">
                                <input type="text" name="name" id="name" class="form-control" placeholder="Наименование студенческой группы" required v-model="studentGroup.name">
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Университет" required v-model="university_id">
                                    <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                                        {{university.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Факультет" required v-model="studentGroup.faculty_id">
                                    <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                                        {{faculty.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <select class="form-control" placeholder="Направление" required v-model="studentGroup.direction_id">
                                    <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                                        {{direction.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <input type="submit" class="btn btn-outline-primary" value="Обновить">
                            </div>
                        </form>
                            <div class="form-group mt-3 gap-3 d-md-flex">
                                <button v-on:click="deleteStudentGroup()" class="btn btn-outline-danger">Удалить</button>
                            </div>
                        
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listStudentGroups">Вернуться к списку студенческих групп</router-link>
                    </div>
                </div>
                <div v-else>
                    <br>
                    <p>Выберите студенческую группу</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "studentGroup-details",
        props: ['id'],
        data() {
            return {
                studentGroup: null,
                faculty: null,
                university_id: null,
                universities: [],
                faculties: [],
                directions: [],
                submitted: false
            };
        },
        watch: {
            studentGroup(){
                this.getFaculty();
            },
            faculty(){
                this.getUniversities();
                this.university_id = this.faculty.university_id;
            },
            universities(){
                this.getFaculties();
            },
            university_id(){
                this.getNewFaculties();
            }
        },
        methods: {
            getStudentGroup() {
                http
                    .get("/studentGroup/"+ this.id)
                    .then(response => {
                        this.studentGroup = response.data;
                        console.log(this.studentGroup);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateStudentGroup(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.studentGroup.name,
                    direction_id: this.studentGroup.direction_id,
                    faculty_id: this.studentGroup.faculty_id,
                };
                http
                    .post("/updateStudentGroup/" + this.studentGroup.id, data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listStudentGroups'); // переходим к списку студенческих групп
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteStudentGroup() {
                http
                    .post("/deleteStudentGroup/" + this.studentGroup.id)
                    .then(() => {
                        this.$router.push('/listStudentGroups'); // переходим к списку студенческих групп
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
            }

        },
        mounted() { // загружаем данные студенческой группы
            this.getStudentGroup();
            this.getDirections();
        }
    }
</script>