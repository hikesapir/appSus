import homePage from './views/home-page.cmp.js'
import mailApp from './apps/mail/views/mail-app.cmp.js';
import noteApp from './apps/note/views/note-app.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/note',
        component: noteApp
    }
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});