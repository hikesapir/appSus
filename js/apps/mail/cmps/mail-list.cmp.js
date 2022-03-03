'use strict';

import mailPreview from "./mail-preview.cmp.js";
import { mailService } from "../services/mail-service.js";
import searchBar from "../cmps/search-bar.cmp.js";

export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section v-if="mails" class="mail-list">
            <!-- <pre>{{mails}}</pre> -->
        <search-bar @filter="filterBy" @sort="sortBy"/>
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
                     <mail-preview v-for="mail in mailForDisplay" @remove="removeMail" @setRead="setRead"  @select="seeDetails" :key="mail.id" :mail="mail" />
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
            filter: 'all'
        }
    },
    created() {
  
    },

    methods: {
        filterBy(val) {
            this.filter = val
        },
        sortBy(sortBy, mult) {
            if (sortBy === 'date') {
                this.mails.sort((a, b) => (a.sentAt - b.sentAt) * mult)
            } else if (sortBy === 'subject') {
                this.mails.sort((a, b) => (a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1) * mult)
            }

        },
        seeDetails(id) {
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
                })
        },
        setRead(id) {
            mailService.get(id)
                .then(mail => {
                    mail.isRead = !mail.isRead
                    mailService.save(mail)
                        .then(() => this.$emit('opened'))
                })
        }
    },
    computed: {
        mailForDisplay() {
            if (this.filter === 'all') return this.mails
            else return this.mails.filter(mail => {
                if (this.filter === 'read') return mail.isRead
                else return !mail.isRead
            })
        }
    },
}