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
        <search-bar @filter="filterBy" @sort="sort"/>
            <table>
                <thead class="thead">
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>starred</td>
                        <td><h1>subject</h1></td>
                        <td><h1>body</h1></td>
                        <td><h1>sentAt</h1></td>
                    </tr>
                </thead>
                <tbody>
                     <mail-preview v-for="mail in mailForDisplay" @starred="setStarred" @remove="removeMail" @setRead="setRead"  @select="seeDetails" :key="mail.id" :mail="mail" />
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
            filter: 'all',
            sortBy: 'date',
            mult: 1,
        }
    },
    created() {

    },

    methods: {
        filterBy(val) {
            this.filter = val
        },
        sort(sortBy, mult) {
            this.sortBy = sortBy;
            this.mult = mult;

            // console.log(this.mailForDisplay);
            // console.log('get it', sortBy, mult);

            // console.log(this.mailForDisplay);
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
        },
        setStarred(id) {
            mailService.get(id)
                .then(mail => {
                    mail.isStarred = !mail.isStarred
                    mailService.save(mail)
                        .then(() => this.$emit('opened'))
                })
        }
    },
    computed: {
        mailForDisplay() {
            var mails;
            if (this.filter === 'all') mails = this.mails
            else mails = this.mails.filter(mail => {
                if (this.filter === 'read') return mail.isRead
                else return !mail.isRead
            })
            if (this.sortBy === 'date') {
                mails.sort((a, b) => (a.sentAt - b.sentAt) * this.mult)
            } else if (this.sortBy === 'subject') {
                mails.sort((a, b) => (a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1) * this.mult)
            }
            return mails
        }
    },
}