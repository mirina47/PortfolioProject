<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.university" class="col-6">
                    <h4>Университет</h4>
                    <div v-if="!submitted">
                        <form @submit="updateUniversity" class="form-group mt-3 gap-3 d-md-flex">
                            <input type="text" name="name" id="name" placeholder="Наименование университета" required v-model="university.name"  class="form-control">
                            <input type="submit" value="Обновить" class="btn btn-outline-primary">
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button class="btn btn-outline-danger" v-on:click="deleteUniversity()">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listUniversities">Вернуться к списку университетов</router-link>
                    </div>
                </div>
                <div v-else class="col-6">
                    <br>
                    <p>Выберите университет</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "university-details",
        props: ['id'],
        data() {
            return {
                university: null,
                submitted: false
            };
        },
        methods: {
            getUniversity() {
                http
                    .get("/university/" + this.id) // обращаемся к серверу для получения списка пользователей, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.university = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateUniversity(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.university.name
                };

                http
                    .post("/updateUniversity/" + this.university.id, data)
                    .then(() => {  // запрос выполнился успешно
                        // this.$router.push('/listUsers'); // переходим к списку пользователей
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteUniversity() {
                http
                    .post("/deleteUniversity/" + this.university.id)
                    .then(() => {
                        // переходим к списку пользователей (переход по ссылкам программно)
                        this.$router.push('/listUniversities');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getUniversity();
        }
    }
</script>