<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Добавление направления</h4>
            <div v-if="!submitted">
                <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
                Обработчик addDirection определён в script-->
                <form @submit="addDirection" class="input-group mt-3 gap-3 d-md-flex">
                    <!--v-model - директива для связывания данных с элементами.
                    Связь происходит при помощи переменных, которые определены в data()-->
                    <input type="text" name="name" id="name" placeholder="Наименование направления" required v-model="direction.name" class="form-control">
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
                                Обработчик newDirection определён в script-->
                                <button v-on:click="newDirection" class="btn btn-outline-primary">Добавить новое направление</button>
                            </div>
                            <div>
                                <router-link to="/listDirections" class="btn btn-outline-primary">Вернуться к списку направлений</router-link>
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
        name: "AddDirection",
        data() {
            return {
                direction: {
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addDirection(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.direction.name
                };
                http
                    .post("/addDirection", data)
                    .then(response => { // запрос выполнился успешно
                        this.direction.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newDirection() {
                this.submitted = false;
                this.direction = {
                    name: ""
                };
            }
        }
    }
</script>