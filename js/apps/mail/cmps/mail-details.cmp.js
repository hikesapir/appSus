'use strict';

import { mailService } from "../services/mail-service.js";

export default {
    name: 'mail-details',
    props: [],
    template: `
    <section v-if="mail" class="mail-details">
        <button @click="backToMails">back</button>
        <button @click="removeMail">remove</button>
        <hr>
        <h1>{{mail.subject}}</h1>
        <div class="addressee">
            <div class="user-icon"><i class="fa-solid fa-user"></i></div>
            <div>
                <p>from: s@gmail.com</p>
                <p>to: me</p>
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