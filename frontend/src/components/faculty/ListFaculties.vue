<template>
    <div class="container">
        <h4 class="mt-3 d-md-flex">Факультеты</h4>
        <h5 class="title mt-3 d-md-flex">Выберите университет:</h5>
        <div class="form-group mb-3 mt-3 d-md-flex"> 
            <select class="form-control" placeholder="Университет" required v-model="university_id">
                <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                    {{university.name}}
                </option>
            </select>
        </div>
        <ul class="list-group mt-3 d-md-flex">
            <li v-for="(faculty, index) in faculties" :key="index" class="list-group-item">
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'faculty-details',
                        params: { id: faculty.id }
                    }">
                    {{faculty.name}}
                </router-link>   
            </li>
        </ul>
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex"> 
            <router-link class="btn btn-outline-primary" to="/addFaculty"> Добавить факультет </router-link> 
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "ListFaculties",
        data() {
            return {
                universities: [],
                university_id: null,
                faculties: []
            };
        },
        watch: {
            university_id(){
                this.getFaculties();
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
            }
        },
        mounted() {
            this.getUniversities();
            //this.getFaculties();         
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>