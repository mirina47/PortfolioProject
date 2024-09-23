<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление факультета</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addUser определён в script-->
                <form @submit="addFaculty" class="row g-2">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <h5 class="title">Выберите университет:</h5> 
                        <select class="form-control" placeholder="Университет" required v-model="faculty.university_id">
                            <option v-for="university in universities" v-bind:key="university.id" v-bind:value="university.id">
                                {{university.name}}
                            </option>
                        </select>
                    <div class="form-group mt-3 gap-3 d-md-flex">
                        <input type="text" name="name" id="name" placeholder="Факультет" required v-model="faculty.name" class="form-control">
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
                                <button v-on:click="newFaculty" class="btn btn-outline-primary">Добавить новый факультет</button>
                            </div>
                            <div>
                                <router-link class="btn btn-outline-primary" to="/listFaculties">Вернуться к списку факультетов</router-link>
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
        name: "AddFaculty",
        data() {
            return {
                faculty: {
                    name: "",
                    university_id: null
                },
                universities: [],
                submitted: false
            };
        },
        methods: {
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
            addFaculty(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.faculty.name,
                    university_id: this.faculty.university_id
                };
                http
                    .post("/addFaculty", data)
                    .then(() => { // запрос выполнился успешно
                        //this.$router.push('/listFaculties'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
                this.submitted = true;
            },
            newFaculty() {
                this.submitted = false;
                this.faculty = {
                    name: "",
                    university_id: null
                };
            }
        },
        mounted() {
            this.getUniversities();
        }
    }
</script>