<template>
    <div class="container">
        <h4 class="mt-3">Список направлений</h4>
        <ul class="list-group mt-3 d-md-flex">
            <!-- Вывод списка направлений -->
            <li v-for="(direction, index) in directions" :key="index" class="list-group-item">
                <!-- name - Именованный маршрут: будет осуществляться переход на страницу с просмотром данных о пользователе -->
                <!-- Ссылка на user определена в файле router.js -->
                <!-- По маршруту user подгружается компонент User.vue -->
                <!-- в params указываются параметры, которые передаютс компоненту-->
                <!--Двоеточие перед to указыает, что значение атрибута изменяющееся (динамическое) -->
                <router-link class="link-dark text-decoration-none" :to="{
                        name: 'direction-details',
                        params: { id: direction.id }
                    }">
                    {{direction.name}}
                </router-link>
            </li>
        </ul>
        <!-- Определение ссылок -->
        <div class="mx-auto form-group mt-3 gap-3 d-md-flex">
            <router-link class="btn btn-outline-primary" to="/addDirection">Добавить направление</router-link>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
    export default {
        name: "ListDirections", // Имя шаблона
        data() { // данные компонента (определение переменных)
            return {
                directions: []
            };
        },
        methods: { // методы компонента
            getDirections() {
                http
                    .get("/directions") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
                        this.directions = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные направлений. Обработчик mounted() вызывается после монтирования экземпляра шаблона
            this.getDirections();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>