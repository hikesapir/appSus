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
                <router-link  v-for="mail in mails" :key="mail.id" to="'/mail/'+mail.id" class="list-table" >                        
                      
                         <mail-preview :mail="mail" />
                       
                    </router-link>
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

    },
    computed: {

    },
}