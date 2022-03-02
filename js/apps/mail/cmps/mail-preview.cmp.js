'use strict';

import longText from "./long-text.cmp.js";

export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
        <!-- <section class="mail-preview"> -->
            <tr :class="openedMail">
                <input type="checkbox">
                <td>{{mail.id}}</td>
                <td> {{mail.subject}} </td>
                <td> <long-text :txt="mail.body"/></td>
                <td> {{sentAt}}</td>
            </tr>
        <!-- </section> -->
    `,
    components: {
        longText,
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
        sentAt() {
            const date = new Date(this.mail.sentAt)
            const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
            const month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            const year = date.getFullYear()
            const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
            const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
            const today = new Date(Date.now()).getDate()
            const display = (today === date.getDate()) ? `${hour}:${minutes}` : `${day}-${month}-${year}`

            return display

        },
        openedMail(){
            return (this.mail.isRead)? 'raed':'unread'
        }
    }
}