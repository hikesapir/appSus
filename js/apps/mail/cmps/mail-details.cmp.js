'use strict';

import { mailService } from "../services/mail-service.js";

export default {
    name: 'mail-details',
    props: [],
    template: `
    <section v-if="mail" class="mail-details">
        <div class="actions">
            <button @click="backToMails"><i class="fa-solid fa-arrow-left-long"></i></button>
            <button @click="removeMail"><i class="fa-solid fa-trash-can"></i></button> 
            <button v-if="!mail.isRead" @click="setRead"><i class="fa-solid fa-envelope"></i></button> 
            <button v-if="mail.isRead" @click="setRead"><i  class="fa-solid fa-envelope-open"></i></button> 
            <button  v-if="!mail.isStarred"  @click="starred" class="star"><i class="fa-regular fa-star"></i></button>
            <button v-if="mail.isStarred" @click="starred"  class="star"><i class="fa-solid fa-star"></i></button>
            <div class="nav-page">
                <button> <i class="fa-solid fa-chevron-left"></i></button> 
                1 of 12
                <button><i class="fa-solid fa-chevron-right"></i></button> 
            </div>
        </div>
        <hr>
        <h1 class="subject">{{mail.subject}}</h1>
        <div class="addressee">
            <div class="user-icon"><i class="fa-solid fa-user"></i></div>
            <div>
                <p>from: {{mail.from}}</p>
                <p>to: {{mail.to}}</p>
            </div>
        </div>
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
        const id = this.$route.params.mailId
        mailService.get(id)
            .then(mail => this.mail = mail)

    },

    methods: {
        backToMails() {
            this.$router.push(`/mail/list`)
        },
        removeMail() {
            mailService.remove(this.mail.id)
                .then(() => this.$router.push(`/mail/list`))
        }

    },
    computed: {

    },
}