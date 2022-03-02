'use strict';

import mailPreview from "./mail-preview.cmp.js";
import { mailService } from "../services/mail-service.js";
import searchBar from "../cmps/search-bar.cmp.js";

export default {
    name: 'mail-list',
    // props: ['mails'],
    template: `
        <section v-if="mails" class="mail-list">
        <search-bar></search-bar>
            <table>
                <thead class="thead">
                    <tr>
                        <td>id</td>
                        <td><h1>subject</h1></td>
                        <td><h1>body</h1></td>
                        <td><h1>sentAt</h1></td>
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
        searchBar,
    },
    data() {
        return {
            mails: null,

        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
    },

    methods: {
        seeDetails(id) {
            this.$router.push(`/mail/${id}`)
        }
    },
    computed: {

    },
}