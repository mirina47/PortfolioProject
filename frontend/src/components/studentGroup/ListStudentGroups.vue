<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Студенческие группы</h4>  
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
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(studentGroup, index) in studentGroups" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'studentGroup-details',
                        params: { id: studentGroup.id }
                    }">
                    {{studentGroup.name}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addStudentGroup"> Добавить студенческую группу </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListStudentGroups",
        data() {
            return {
                universities: [],
                university_id: null,
                faculties: [],
                faculty_id: null,
                directions: [],
                direction_id: null,
                studentGroups: []
            };
        },
        watch: {
            university_id(){
                this.getFaculties();
                this.studentGroups = [];
            },
            faculty_id(){
                this.getStudentGroups();
            },
            direction_id(){
                this.getStudentGroups();
            }
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
            }
        },
        mounted() {
            this.getUniversities();
            this.getDirections();        
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>