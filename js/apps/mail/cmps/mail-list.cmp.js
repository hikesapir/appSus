'use strict';

import mailPreview from "./mail-preview.cmp.js";

export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section class="mail-list">
            <h1>mail-list</h1>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>subject</td>
                        <td>body</td>
                        <td>sentAt</td>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="mail in mails" :key="mail.id" @click="seeDetails(mail.id)">             
                     <mail-preview :mail="mail" />
                    </tr>
                </tbody>
            </table>
        </section>
    `,
    components: {
        mailPreview,
    },
    data() {
        return {

        }
    },
    created() {

    },

    methods: {
        seeDetails(id) {
            console.log(id);
            this.$router.push(`/mail/${id}`)
        }
    },
    computed: {

    },
}