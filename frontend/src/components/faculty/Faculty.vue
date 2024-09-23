<template>
    <div class="container">
        <div class="input-group mt-3 gap-3 d-md-flex">
            <div v-if="faculty">
                <h4>Факультет</h4>
                <div v-if="!submitted">
                    <form @submit="updateFaculty" class="row g-2">
                        <div class="col-auto">
                            <input type="text" name="name" id="name" class="form-control" placeholder="Наименование факультета" required v-model="faculty.name">
                        </div>
                        <div class="col-auto">
                            <select class="form-control" placeholder="Университет" required v-model="faculty.university_id">
                                <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                                    {{university.name}}
                                </option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <input type="submit" class="btn btn-outline-primary" value="Обновить">
                        </div>
                    </form>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <button v-on:click="deleteFaculty()" class="btn btn-outline-danger">Удалить</button>
                    </div>
                </div>
                <div v-else class="mx-auto mt-3 gap-3">
                    <h4>Вы успешно обновили запись</h4>
                    <router-link class="btn btn-outline-primary" to="/listUniversities">Вернуться к списку университетов</router-link>
                </div>
            </div>
            <div v-else>
                <br>
                <p>Выберите факультет</p>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "faculty-details",
        props: ['id'],
        data() {
            return {
                faculty: null,
                universities: [],
                submitted: false
            };
        },
        methods: {
            getFaculty() {
                http
                    .get("/faculty/"+ this.id)
                    .then(response => {
                        this.faculty = response.data;
                        console.log(this.faculty);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateFaculty(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.faculty.name,
                    university_id: this.faculty.university_id,
                };
                http
                    .post("/updateFaculty/" + this.faculty.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listFaculties'); // переходим к списку расходов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteFaculty() {
                http
                    .post("/deleteFaculty/" + this.faculty.id)
                    .then(() => {
                        this.$router.push('/listFaculties'); // переходим к списку расходов
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
            }
        },
        mounted() { // загружаем данные факультета
            this.getFaculty();
            this.getUniversities();
        }
    }
</script>