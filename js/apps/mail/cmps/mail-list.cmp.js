'use strict';

import mailPreview from "./mail-preview.cmp.js";
import { mailService } from "../services/mail-service.js";
import searchBar from "../cmps/search-bar.cmp.js";

export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section v-if="mails" class="mail-list">
        <search-bar @filter="filterBy" @sort="sort"/>
        <hr>
            <table>
                <thead class="thead">
                    <tr>
                        <th style="text-align: center;"><input type="checkbox"></th>
                        <th style="text-align: center;">starred</th>
                        <th><h1>subject</h1></th>
                        <th><h1>body</h1></th>
                        <th><h1>sentAt</h1></th>
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
            inputSearch: '',
            sortBy: 'date',
            mult: -1,
        }
    },
    created() {

    },

    methods: {
        filterBy(filter, inputSearch) {
            this.filter = filter
            this.inputSearch = inputSearch
            console.log(this.inputSearch);

        },
        sort(sortBy, mult) {
            this.sortBy = sortBy;
            this.mult = mult;
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
            const regex = new RegExp(this.inputSearch, 'i');
            if (this.filter === 'all') mails = this.mails.filter(mail => regex.test(mail.subject))
         
            else mails = this.mails.filter(mail => {
                if (this.filter === 'read') return mail.isRead && regex.test(mail.subject)
                else return !mail.isRead && regex.test(mail.subject)
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