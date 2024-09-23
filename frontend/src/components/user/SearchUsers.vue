<template>
    <div class="container">
        <div class="row row-cols-lg-1 mt-3 gap-3">
            <h4>Поиск пользователей по имени</h4>
            <form @submit="searchUsersByName" class="input-group mt-3 gap-3 d-md-flex">
                <input type="text" name="name" id="name" placeholder="ФИО" required v-model="name" class="form-control">
                <input type="submit" value="Поиск" class="btn btn-outline-primary">
            </form>
            <ul class="list-group mt-3 d-md-flex">
                <li v-for="(user, index) in users" :key="index" class="list-group-item">
                    {{user.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "SearchUsers.vue",
        data() {
            return {
                name: "",
                users: []
            };
        },
        methods: {
            searchUsersByName(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                http
                    .get("/user/name/" + this.name)
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    };
</script>