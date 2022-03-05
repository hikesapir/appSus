'use strict';
import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js";
import navBar from "../cmps/nav-bar.cmp.js";
import sendMail from "../cmps/send-mail.cmp.js";

export default {
    name: 'mail-app',
    template: `
        <section class="mail-app main-screen">
            <nav-bar :open="opennav" @selected="moveTo" :unread="unread"></nav-bar>
               <router-view :mails="mailsForDisplay" @darft="darft" @openNavBar="openNavBar" @recount="recount"></router-view>
                   <send-mail @close="closeMsgTeb" v-if="openCompose" :draft="getDraft" />
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
            isNavBarOpen: false,
            draftContent: {}
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
                        if (mail.isInbox && !mail.isRead && !mail.isTrashed) count++
                    })
                    this.unread = count;
                });
        },
        moveTo(nav) {
            if (nav === 'compose') this.closeMsgTeb()
            else this.filter = nav
            console.log(this.filter);
        },
        closeMsgTeb() {
            this.openCompose = !this.openCompose
            this.draftContent={}
            this.recount()
        },
        openNavBar() {
            this.isNavBarOpen = !this.isNavBarOpen
        },
        darft(mail) {
            this.draftContent = mail
            console.log(this.draftContent);

            this.closeMsgTeb()
        }


    },
    computed: {
        mailsForDisplay() {
            if (!this.mails) return null
            if (this.filter === 'inbox') return this.mails.filter(mail => mail.isInbox && !mail.isTrashed)
            else if (this.filter === 'sent') return this.mails.filter(mail => !mail.isInbox && !mail.isTrashed && !mail.isDraft)
            else if (this.filter === 'starred') return this.mails.filter(mail => mail.isStarred)
            else if (this.filter === 'trash') return this.mails.filter(mail => mail.isTrashed && !mail.isDraft)
            else if (this.filter === 'drafts') return this.mails.filter(mail => mail.isDraft)
        },
        opennav() {
            console.log(this.isNavBarOpen);
            return (this.isNavBarOpen) ? 'open ' : ''
        },
        getDraft(){
            return this.draftContent
        }

    },
}