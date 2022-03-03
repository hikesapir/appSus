'use strict';

import mailPreview from "./mail-preview.cmp.js";
import { mailService } from "../services/mail-service.js";
import searchBar from "../cmps/search-bar.cmp.js";

export default {
    name: 'mail-list',
    // props: ['mails'],
    template: `
        <section v-if="mails" class="mail-list">
        <search-bar @filter="filterBy"/>
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
                     <mail-preview v-for="mail in mails" @remove="removeMail" @setRead="setRead" :key="mail.id" @select="seeDetails" :mail="mail" />
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
        filterBy(val) {
            console.log('i was here');
            mailService.query()
            .then(mails => {
                if (val==='all') this.mails = mails
                else this.mails = mails.filter(mail=>{
                    if (val==='read') return mail.isRead
                    else return !mail.isRead
                })
            });
            console.log(this.mails);
        },
        seeDetails(id) {
            console.log(id);
            mailService.get(id)
                .then(mail => {
                    mail.isRead = true
                    mailService.save(mail)
                        .then(() => {
                            this.$router.push(`/mail/${id}`)
                            this.$emit('opened')
                        })
                })
        },
        removeMail(id) {
            mailService.remove(id)
                .then(() => {
                    this.$emit('opened')
                    mailService.query()
                        .then(mails => this.mails = mails);
                })
        },
        setRead(id) {
            mailService.get(id)
                .then(mail => {
                    console.log('get', mail);
                    mail.isRead = !mail.isRead
                    mailService.save(mail)
                        .then((mails) => {
                            this.$emit('opened')
                            console.log(mails);
                            // this.mails = mails
                        })
                })
        }
    },
    computed: {

    },
}