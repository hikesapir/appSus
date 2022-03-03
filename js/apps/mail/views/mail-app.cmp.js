'use strict';
import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js";
import navBar from "../cmps/nav-bar.cmp.js";

export default {
    name: 'mail-app',
    template: `
        <section class="mail-app">
            <nav-bar :unread="unread"></nav-bar>
               <router-view @opened="recount"></router-view>
        </section>
    `,
    components: {
        mailList,
        navBar,
    },
    data() {
        return {
            mails: null,
            unread: null,

        }
    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
                this.recount()
            });

    },

    methods: {
        recount() {
            mailService.query()
                .then(mails => {
                    this.mails = mails
                    var count = 0
                    this.mails.forEach(mail => {
                        if (!mail.isRead) count++
                    })
                    console.log(this.mails);
                    this.unread = count;
                });
        },
 
    },
    computed: {
        mailsForDisplay() {
            return this.mails;
            // if (!this.filterBy) return this.cars;
            // const regex = new RegExp(this.filterBy.vendor, 'i');
            // return this.cars.filter(car => regex.test(car.vendor));
        },
        unreadMails1() {
            return this.unread;
        }

    },
}