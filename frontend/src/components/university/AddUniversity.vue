<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление университета</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addUser определён в script-->
                <form @submit="addUniversity" class="input-group mt-3 gap-3 d-md-flex">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <input type="text" name="name" id="name" placeholder="Университет" required v-model="university.name" class="form-control">
                    <input type="submit" value="Добавить" class="btn btn-outline-primary">
                </form>
            </div>
            <div v-else>
                <div class="container">
                    <div class="row row-cols-lg-1 g-4">
                        <h4>Вы успешно добавили запись</h4>
                        <div class="input-group mt-3 gap-3 d-md-flex">
                            <div>
                                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить нового пользователя"
                                Обработчик newUser определён в script-->
                                <button v-on:click="newUniversity" class="btn btn-outline-primary">Добавить новый университет</button>
                            </div>
                            <div>
                                <router-link to="/listUniversities" class="btn btn-outline-primary">Вернуться к списку университетов</router-link>
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
        name: "AddUniversity",
        data() {
            return {
                university: {
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addUniversity(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.university.name
                };
                // Либо var data = this.user;
                http
                    .post("/addUniversity", data)
                    .then(response => { // запрос выполнился успешно
                        this.university.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newUniversity() {
                this.submitted = false;
                this.university = {
                    name: ""
                };
            }
        }
    }
</script>