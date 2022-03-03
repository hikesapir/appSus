'use strict';

import longText from "./long-text.cmp.js";

export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
        <!-- <section class="mail-preview"> -->
            <tr :class="openedMail">
                <td class="checkbox"> <input type="checkbox"></td>  
                <td v-if="!mail.isStarred" class="star"><i @click="starred" class="fa-regular fa-star"></i></td>
                <td v-if="mail.isStarred" class="star"><i @click="starred" class="fa-solid fa-star"></i></td>
                <td @click="select"> {{mail.subject}} </td>
                <td @click="select"> <long-text :txt="mail.body"/></td>
                <td @mouseover="mouseOver" v-if="!isHover"> {{sentAt}}</td>
                <td class="actions" v-if="isHover" @mouseleave="mouseOver">
                    <i @click="removeMail" class="fa-solid fa-trash-can"></i>
                    <i v-if="!mail.isRead" @click="setRead" class="fa-solid fa-envelope"></i>
                    <i v-if="mail.isRead" @click="setRead" class="fa-solid fa-envelope-open"></i>
                </td>
            </tr>
        <!-- </section> -->
    `,
    components: {
        longText,
    },
    data() {
        return {
            isHover:false,
            isStarred:false,
            // isRead:false,
        }
    },
    created() {

    },
    methods: {
        mouseOver(){
            this.isHover = !this.isHover;   
        },
        select(){
            this.$emit('select', this.mail.id)
        },
        removeMail() {
            this.$emit('remove', this.mail.id)
        },
        starred(){
            this.$emit('starred', this.mail.id)
            // this.isStarred =!this.isStarred
        },
        setRead(){
            console.log('clicked');
            this.$emit('setRead', this.mail.id)
        }
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