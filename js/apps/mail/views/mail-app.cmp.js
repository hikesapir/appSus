'use strict';
import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js";
import navBar from "../cmps/nav-bar.cmp.js";
import sendMail from "../cmps/send-mail.cmp.js";

export default {
    name: 'mail-app',
    template: `
        <section class="mail-app">
            <nav-bar @selected="moveTo" :unread="unread"></nav-bar>
               <router-view :mails="mailsForDisplay" @opened="recount"></router-view>
               <send-mail @close="closeMsgTeb" v-if="openCompose" />
        </section>
    `,
    components: {
        mailList,
        navBar,
        sendMail,
    },
    data() {
        return {
            mails: null,
            unread: null,
            openCompose: false,
            filter: 'inbox',
            // sentMails: null,

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
        moveTo(nav) {
            if (nav === 'compose') this.openCompose = !this.openCompose
            else this.filter = nav
            console.log(this.filter);
        },
        closeMsgTeb() {
            this.openCompose = false
        }

    },
    computed: {
        mailsForDisplay() {
            if (!this.mails) return null
            if (this.filter === 'inbox') return this.mails.filter(mail => mail.isInbox&&!mail.isTrashed)
            else if (this.filter === 'sent') return this.mails.filter(mail => !mail.isInbox&&!mail.isTrashed)
            else if (this.filter === 'starred') return this.mails.filter(mail => mail.isStarred)
            else if (this.filter === 'trash') return this.mails.filter(mail => mail.isTrashed)
        },


    },
}