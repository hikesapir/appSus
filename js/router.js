import homePage from './views/home-page.cmp.js'
import mailApp from './apps/mail/views/mail-app.cmp.js';
import noteApp from './apps/note/views/note-app.cmp.js';
import mailDetails from './apps/mail/cmps/mail-details.cmp.js';
import mailList from './apps/mail/cmps/mail-list.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp,
        redirect: '/mail/list',
        children:[
            {
                path: 'list',
                component: mailList
            },
            {
                path: ':mailId',
                component: mailDetails
            },
        ]
    },
    {
        path: '/note',
        component: noteApp
    },

    // {
    //     path: '/mail/:mailId',
    //     component: mailDetails
    // },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});