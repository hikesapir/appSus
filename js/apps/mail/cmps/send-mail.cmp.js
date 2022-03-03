'use strict';
import { mailService } from "../services/mail-service.js";

export default {
    name: 'send-mail',
    props: [],
    template: `
        <section class="send-mail">
            <div class="header">
                <h1>New Message</h1>
                <button>x</button>
            </div>
            <div class="body">
                <input v-model=message.to type="email" required placeholder="To">
                <input v-model=message.Subject type="text" placeholder="Subject">
                <textarea v-model=message.body name="body" id="body" cols="30" rows="14" placeholder="Your message">
                </textarea>
                <div class="send-btn-container">
                    
                    <button @click="send">send</button>
                </div>
            </div>

        </section>
    `,
    components: {
    },
    data() {
        return {
            message: {
                to: '',
                subject: '',
                body: '',
            }
        }
    },
    created() {

    },

    methods: {
        send() {
            mailService.sendMail(this.message)
                .then(mail => console.log(mail))
                .catch(err => console.log(err))
        },

    },
    computed: {

    },
}