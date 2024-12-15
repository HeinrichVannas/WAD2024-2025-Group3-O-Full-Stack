import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import AddPost from "../views/AddPost.vue"
import PostDetails from "@/views/PostDetails.vue";




const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/addpost",
        name: "AddPost",
        component: AddPost,
    },{
        path: "/post/:id", // Dünaamiline tee postituse ID jaoks
        name: "PostDetails",
        component: PostDetails,
        props: true, // Edasta ID propsina
      },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;