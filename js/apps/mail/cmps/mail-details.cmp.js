'use strict';

import { mailService } from "../services/mail-service.js";

export default {
    name: 'mail-details',
    props: ['mails'],
    template: `
    <section v-if="mail && mails" class="mail-details">
        <div class="actions">
                <button @click="backToMails" title="Back"><i class="fa-solid fa-arrow-left-long"></i></button>
            <div class="nav-page">
                <button  @click="removeMail" title="Remove"><i class="fa-solid fa-trash-can"></i></button> 
                <button v-if="mail.isTrashed" @click="restoreMail" title="Restore"><i class="fa-solid fa-trash-can-arrow-up"></i></button> 
                <button v-if="mail.isRead" title="Mark as unread" @click="setRead"><i class="fa-solid fa-envelope"></i></button> 
                <button  v-if="!mail.isStarred" title="Not starred" @click="setStarred" class="star"><i class="fa-regular fa-star"></i></button>
                <button v-if="mail.isStarred" title="Starred" @click="setStarred" class="star"><i class="fa-solid fa-star"></i></button>
                <router-link :to="'/mail/'+mail.prevMailId"><button title="Previous"> <i class="fa-solid fa-chevron-left"></i></button> </router-link>
               <span>{{mailIdx}} of {{mails.length}}</span>
                <router-link :to="'/mail/'+mail.nextMailId"><button title="Next"><i class="fa-solid fa-chevron-right"></i></button> </router-link>
            </div>
        </div>
        <hr>
        <div class="mail-header">
            <h1 class="subject">{{mail.subject}}</h1>
            <h4 class="date">{{date}}</h4>
        </div>
        <div class="addressee">
            <div class="user-icon"><i class="fa-solid fa-user"></i></div>
            <div>
                <p>from: {{mail.from}}</p>
                <p>to: {{mail.to}}</p>
            </div>
        </div>
        <hr>
        <p>{{mail.body}}</p>
    </section>
    <section v-else class="loading">
        <h1>loading...</h1>
    </section>
    `,
    components: {
    },
    data() {
        return {
            mail: null,
        }
    },
    created() {

    },

    methods: {
        loadMail() {
            mailService.get(this.mailId)
                .then(mail => {
                    mail.isRead = true
                    mailService.save(mail)
                        .then(() => {
                            this.$emit('opened')
                            this.mail = mail
                        })

                })

        },
        backToMails() {
            this.$router.push(`/mail/list`)
        },
        removeMail() {
            mailService.remove(this.mail.id)
                .then(() => {
                    this.$emit('recount')
                    this.$router.push(`/mail/list`)
                })
        },
        restoreMail() {
            this.mail.isTrashed = false
            mailService.save(this.mail)
                .then(() => {
                    this.$emit('recount')
                    this.$router.push(`/mail/list`)
                })
        },
        setRead() {
            mailService.get(this.mail.id)
                .then(mail => {
                    mail.isRead = !mail.isRead
                    mailService.save(mail)
                        .then(() => {
                            this.$emit('recount')
                            this.$router.push(`/mail/list`)
                        })
                })
        },
        setStarred() {
            this.mail.isStarred = !this.mail.isStarred
            mailService.get(this.mail.id)
                .then(mail => {
                    mail.isStarred = !mail.isStarred
                    mailService.save(mail)
                        .then(() => this.$emit('recount'))
                })
        },

    },
    computed: {
        mailId() {
            return this.$route.params.mailId
        },
        date() {
            let date = new Date(this.mail.sentAt);
            let options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            }
            return date.toLocaleTimeString("en-us", options)
        },
        mailIdx() {
            return this.mails.findIndex(mail => mail.id === this.mailId) + 1
        }

    },
    watch: {
        mailId: {
            handler() {
                this.loadMail()
            },
            immediate: true
        }

    },
}