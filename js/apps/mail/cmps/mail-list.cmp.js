'use strict';

import mailPreview from "./mail-preview.cmp.js";

export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section class="mail-list">
            <h1>mail-list</h1>
            <tbody>
                <tr v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" />
                </tr>
            </tbody>
            <!-- <tbody class="books-table"> </tbody>
            <ul>
                <li v-for="mail in mails" :key="mail.id" >
                    <h1>{{mail.id}}</h1>
                    <mail-preview :mail="mail" />
                </li>
            </ul> -->
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

    },
    computed: {

    },
}