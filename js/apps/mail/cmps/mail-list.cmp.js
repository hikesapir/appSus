'use strict';

import mailPreview from "./mail-preview.cmp.js";
import { mailService } from "../services/mail-service.js";
import searchBar from "../cmps/search-bar.cmp.js";

export default {
    name: 'mail-list',
    props: ['mails'],
    template: `
        <section v-if="mails" class="mail-list">
        <search-bar @openNavBar="openNavBar" @filter="filterBy" @sort="sort"/>
        <hr>
            <table>
                <colgroup>
                    <col class="checkbox-col" >
                    <col class="star-col">
                    <col class="from-col">
                    <col class="subject-col">
                    <col class="body-co">
                    <col class="time-col">
                </colgroup>
                <thead class="thead">
                    <tr>
                        <th class="checkbox-col" style="text-align: center;"></th>
                        <th class="star-col" style="text-align: center;"></th>
                        <th class="from-col"><h1>From</h1></th>
                        <th class="subject-col"><h1>Subject</h1></th>
                        <th class="body-col"><h1>Message</h1></th>
                        <th class="time-col"><h1>
                        <i v-if="someChecked" @click="removeMails" class="fa-solid fa-trash-can" title="Remove"></i>
                        </h1></th>
                    </tr>
                </thead>
                <tbody>
                     <mail-preview v-for="mail in mailForDisplay" @restore="restore" @check="check" @starred="setStarred" @remove="removeMail" @setRead="setRead"  @select="seeDetails" :key="mail.id" :mail="mail" />
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
        },
        sort(sortBy, mult) {
            this.sortBy = sortBy;
            this.mult = mult;
        },
        seeDetails(id) {
            mailService.get(id)
                .then(mail => {
                    if (mail.isDraft) {
                        this.$emit('darft',mail)
                        return mail
                    }
                    mail.isRead = true
                    mailService.save(mail)
                        .then(() => {
                            this.$router.push(`/mail/${id}`)
                            this.$emit('recount')
                        })
                })
        },
        removeMail(id) {
            mailService.remove(id)
                .then(() => {
                    this.$emit('recount')
                })
        },
        removeMails() {
            this.mails.forEach(mail => {
                if (mail.isChecked) {
                    console.log('remove', mail.id);
                    mailService.remove(mail.id)
                }
            })
            this.$emit('recount')
        },
        setRead(id) {
            mailService.get(id)
                .then(mail => {
                    mail.isRead = !mail.isRead
                    mailService.save(mail)
                        .then(() => this.$emit('recount'))
                })
        },
        setStarred(id) {
            mailService.get(id)
                .then(mail => {
                    mail.isStarred = !mail.isStarred
                    mailService.save(mail)
                        .then(() => this.$emit('recount'))
                })
        },
        check(mail) {
            mailService.save(mail)
        },
        openNavBar() {
            this.$emit('openNavBar')
        },
        restore(mail) {
            mail.isTrashed = false
            mailService.save(mail)
                .then(() => this.$emit('recount'))
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
            } else if (this.sortBy === 'from') {
                mails.sort((a, b) => (a.from.toUpperCase() > b.from.toUpperCase() ? 1 : -1) * this.mult)
            }
            return mails
        },
        someChecked() {
            return (this.mails.some(mail => mail.isChecked)) ? true : false
        }
    },
}