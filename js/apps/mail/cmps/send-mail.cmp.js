'use strict';
import { mailService } from "../services/mail-service.js";

export default {
    name: 'send-mail',
    props: [],
    template: `
        <section class="send-mail">
        <form @submit.prevent="send" >
            <div class="header">
                <h1>New Message</h1>
                <button @click="close">X</button>
            </div>
           
            <div class="body">
                    <input v-model=message.to type="email"  placeholder="To" required>
                    <input v-model=message.subject type="text" placeholder="Subject">
                    <textarea v-model=message.body name="body" id="body" cols="30" rows="14" placeholder="Your message">
                    </textarea>
                <div class="send-btn-container">
                    <button class="send">send</button>
                    <button class="trash" @click="removeMail" title="Trash" ><i class="fa-solid fa-trash-can"></i></button>
                </form>
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

                // id: '',
                // subject,
                // body,
                // sentAt,
                // to,
                // isRead,
                // isInbox,
                // isStarred: false,
                // isTrashed: false,
                // isDraft,
            },
            interval: null,

        }
    },
    created() {
        mailService.createDraft(this.message)
            .then(mail => {
                mail.isTrashed = true
                this.message = mail
                console.log(this.message);
            })

        this.interval = setInterval(() => {
            mailService.save(this.message)
            console.log('save?');
        }, 5000);
    },
    unmounted() {
        // it will return true for strings containing only whitespace
        String.prototype.isEmpty = function () {
            return (this.length === 0 || !this.trim());
        };
        console.log(' '.isEmpty());
        if (this.message.to.isEmpty() || this.message.subject.isEmpty() || this.message.body.isEmpty) {
            mailService.remove(this.message.id)
        }
        // console.log(' '.isEmpty());
        clearInterval(this.interval)
    },
    methods: {
        send() {
            mailService.sendMail(this.message)
                .then(() => this.close())
                .catch(err => console.log(err))
        },
        close() {
            this.$emit('close')
        },
        removeMail() {
            console.log(this.message.id);
            mailService.remove(this.message.id)
                .then(() => {
                    // this.$emit('opened')
                    this.close()
                })
        },
    },
    computed: {

    },
}