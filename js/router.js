import homePage from './views/home-page.cmp.js';
import mailApp from './apps/mail/views/mail-app.cmp.js';
import noteApp from './apps/note/views/note-app.cmp.js';
import bookApp from './apps/book/views/book-app.cmp.js';
import bookDetails from './apps/book/cmps/book-details.cmp.js';
import bookAdd from './apps/book/cmps/book-add.cmp.js';
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
        children: [
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
        // path: '/note/:from?/:date?/:subject?/:body?',
        path: '/note',
        component: noteApp
    },
    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/book/:bookId',
        component: bookDetails,

    },
    {
        path: '/book/add',
        component: bookAdd

    }

];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});