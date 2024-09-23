<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <div class="input-group mt-3 gap-3 d-md-flex">
                <div v-if="this.direction" class="col-6">
                    <h4>Направление</h4>
                    <div v-if="!submitted">
                        <form @submit="updateDirection" class="form-group mt-3 gap-3 d-md-flex">
                            <input type="text" name="name" id="name" placeholder="Наименование направления" required v-model="direction.name" class="form-control">
                            <input type="submit" value="Обновить" class="btn btn-outline-primary">
                        </form>
                        <div class="form-group mt-3 gap-3 d-md-flex">
                            <button class="btn btn-outline-danger" v-on:click="deleteDirection()">Удалить</button>
                        </div>
                    </div>
                    <div v-else class="mx-auto mt-3 gap-3">
                        <h4>Вы успешно обновили запись</h4>
                        <router-link class="btn btn-outline-primary" to="/listDirections">Вернуться к списку направлений</router-link>
                    </div>
                </div>
                <div v-else class="col-6">
                    <br>
                    <p>Выберите направление</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "direction-details",
        props: ['id'],
        data() {
            return {
                direction: null,
                submitted: false
            };
        },
        methods: {
            getDirection() {
                http
                    .get("/direction/" + this.id) // обращаемся к серверу для получения списка, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.direction = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateDirection(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.direction.name
                };

                http
                    .post("/updateDirection/" + this.direction.id, data)
                    .then(() => { 
                        //this.$router.push('/listDirections'); // переходим к списку
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteDirection() {
                http
                    .post("/deleteDirection/" + this.direction.id)
                    .then(() => {
                        // переходим к списку направлений (переход по ссылкам программно)
                        this.$router.push('/listDirections');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные пользователя
            this.getDirection();
        }
    }
</script>