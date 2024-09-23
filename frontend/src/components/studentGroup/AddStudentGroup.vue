<template>
<div class="container">
    <div class="row row-cols-lg-1 mt-3 gap-3">
        <h4>Добавление студенческой группы</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addStudentGroup определён в script-->
            <form @submit="addStudentGroup" class="row g-2">
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
                    <select class="form-control" placeholder="Факультет" required v-model="studentGroup.faculty_id">
                        <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">
                            {{faculty.name}}
                        </option>
                    </select>
                </div>
                <h5 class="title">Выберите направление:</h5>
                <div class="form-group mb-3"> 
                    <select class="form-control" placeholder="Направление" required v-model="studentGroup.direction_id">
                        <option v-for="direction in directions" v-bind:key="direction.id" v-bind:value="direction.id">
                            {{direction.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group mt-3 gap-3 d-md-flex">
                    <input type="text" name="name" id="name" placeholder="Студенческая группа" required v-model="studentGroup.name" class="form-control">
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
                            <button v-on:click="newStudentGroup" class="btn btn-outline-primary">Добавить новую студенческую группу</button>
                        </div>
                        <div>
                            <router-link class="btn btn-outline-primary" to="/listStudentGroups">Вернуться к списку студенческих групп</router-link>
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
        name: "AddStudentGroup",
        data() {
            return {
                studentGroup: {
                    name: "",
                    faculty_id: null,
                    direction_id: null
                },
                universities: [],
                university_id: null,
                faculties: [],
                directions: [],
                submitted: false
            };
        },
        watch: {
            university_id(){
                this.getFaculties();
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
            addStudentGroup(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.studentGroup.name,
                    faculty_id: this.studentGroup.faculty_id,
                    direction_id: this.studentGroup.direction_id
                };
                http
                    .post("/addStudentGroup", data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listStudentGroups'); // переходим к списку студенческих групп
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newStudentGroup() {
                this.submitted = false;
                this.studentGroup = {
                    name: "",
                    faculty_id: null,
                    direction_id: null
                };
                this.university_id = null;
            }
        },
        mounted() {
            this.getUniversities();
            this.getDirections(); 
        }
    }
</script>