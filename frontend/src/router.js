import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListUsers from "./components/user/ListUsers";
import AddUser from "./components/user/AddUser";
import User from "./components/user/User";
import SearchUsers from "./components/user/SearchUsers";

import ListCategories from "./components/category/ListCategories";
import AddCategory from "./components/category/AddCategory";
import Category from "./components/category/Category";

import ListUniversities from "./components/university/ListUniversities";
import University from "./components/university/University";
import AddUniversity from "./components/university/AddUniversity";

import ListDirections from "./components/direction/ListDirections";
import Direction from "./components/direction/Direction";
import AddDirection from "./components/direction/AddDirection";

import ListFaculties from "./components/faculty/ListFaculties";
import Faculty from "./components/faculty/Faculty";
import AddFaculty from "./components/faculty/AddFaculty";

import ListStudentGroups from "./components/studentGroup/ListStudentGroups";
import StudentGroup from "./components/studentGroup/StudentGroup";
import AddStudentGroup from "./components/studentGroup/AddStudentGroup";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import ListWorks from "./components/work/ListWorks";
import AddWork from "./components/work/AddWork";
import Work from "./components/work/Work";
import AddWorkUser from "./components/work/AddWorkUser.vue";

// определяем маршруты
const routes = [
    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя"
        }
    },
    {
        path: "/searchUsers",
        name: "search-users",
        component: SearchUsers,
        meta: {
            title: "Поиск пользователей"
        }
    },
    {
        path: "/listCategories", // указание маршрута, по которому будем переходить к списку категорий
        name: "categories", // имя маршрута
        alias: "/categories", // указание дополнительного маршрута
        component: ListCategories, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей"
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: Category,
        props: true, // указываем, что компонент Category.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя"
        }
    },
    {
        path: "/addCategory",
        name: "add-category",
        component: AddCategory,
        meta: {
            title: "Добавление категории"
        }
    },
    {
        path: "/listUniversities", // указание маршрута, по которому будем переходить к списку университетов
        name: "universities", // имя маршрута
        alias: "/universities", // указание дополнительного маршрута
        component: ListUniversities, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список университетов"
        }
    },
    {
        path: "/university/:id",
        name: "university-details",
        component: University,
        props: true, // указываем, что компонент University.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные университета"
        }
    },
    {
        path: "/addUniversity",
        name: "add-university",
        component: AddUniversity,
        meta: {
            title: "Добавление университета"
        }
    },
    {
        path: "/listDirections", // указание маршрута, по которому будем переходить к списку направлений
        name: "directions", // имя маршрута
        alias: "/directions", // указание дополнительного маршрута
        component: ListDirections, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список направлений"
        }
    },
    {
        path: "/direction/:id",
        name: "direction-details",
        component: Direction,
        props: true, // указываем, что компонент Direction.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные направления"
        }
    },
    {
        path: "/addDirection",
        name: "add-direction",
        component: AddDirection,
        meta: {
            title: "Добавление направления"
        }
    },
    {
        path: "/listFaculties", // указание маршрута, по которому будем переходить к списку факультетов
        name: "faculties", // имя маршрута
        alias: "/faculties", // указание дополнительного маршрута
        component: ListFaculties, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список факультетов"
        }
    },
    {
        path: "/faculty/:id",
        name: "faculty-details",
        component: Faculty,
        props: true, // указываем, что компонент Faculty.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные факультета"
        }
    },
    {
        path: "/addFaculty",
        name: "add-faculty",
        component: AddFaculty,
        meta: {
            title: "Добавление факультета"
        }
    },
    {
        path: "/listStudentGroups", // указание маршрута, по которому будем переходить к списку студенческих групп
        name: "studentGroups", // имя маршрута
        alias: "/studentGroups", // указание дополнительного маршрута
        component: ListStudentGroups, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список студенческих групп"
        }
    },
    {
        path: "/studentGroup/:id",
        name: "studentGroup-details",
        component: StudentGroup,
        props: true, // указываем, что компонент StudentGroup.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные студенческой группы"
        }
    },
    {
        path: "/addStudentGroup",
        name: "add-studentGroup",
        component: AddStudentGroup,
        meta: {
            title: "Добавление студенческой группы"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя"
        }
    },
    {
        path: "/listWorks", // указание маршрута, по которому будем переходить к списку работ
        name: "list-works", // имя маршрута
        alias: "/works", // указание дополнительного маршрута
        component: ListWorks, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список работ"
        }
    },
    {
        path: "/work/:id",
        name: "work-details",
        component: Work,
        props: true, // указываем, что компонент Work.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные работы"
        }
    },
    {
        path: "/addWork",
        name: "add-work",
        component: AddWork,
        meta: {
            title: "Добавление работы"
        }
    },
    {
        path: "/addWorkUser",
        name: "add-work-user",
        component: AddWorkUser,
        meta: {
            title: "Добавление работы"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});



export default router;