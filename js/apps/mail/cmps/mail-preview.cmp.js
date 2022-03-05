'use strict';

import longText from "./long-text.cmp.js";

export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
            <tr  @mouseover="mouseOver"  @mouseleave="mouseLeve" :class="[openedMail, checked]">
                <td  class="checkbox-col checkbox"> <input @change="check" v-model="mail.isChecked" type="checkbox" title="Select"></td>  
                <td v-if="!mail.isStarred" title="Not starred" @click="starred" class="star-col star"><i  class="fa-regular fa-star"></i></td>
                <td v-if="mail.isStarred" class="star-col star"><i @click="starred" class="fa-solid fa-star"></i></td>
                <td @click="select" class="from-col"> {{mail.from}} </td>
                <td @click="select" class="subject-col"> {{mail.subject}} </td>
                <td @click="select" class="body-col"> <long-text :txt="mail.body"/></td>
                <td  v-if="!isHover" class="time-col"> {{sentAt}}</td>
                <td class="time-col actions" v-if="isHover">
                    <i  @click="removeMail" class="fa-solid fa-trash-can" title="Remove"></i>
                    <i v-if="mail.isTrashed" @click="restoreMail" class="fa-solid fa-trash-can-arrow-up" title="Restore"></i>
                    <i v-if="!mail.isRead" @click="setRead" class="fa-solid fa-envelope" title="Mark as unread"></i>
                    <i v-if="mail.isRead" @click="setRead" class="fa-solid fa-envelope-open" title="Mark as read"></i>
                    <router-link :to="{ path: '/note', query: { from:mail.from,date:mail.sentAt ,subject:mail.subject, body:mail.body}}">
                        <i @click="saveAsNote" class="fa-solid fa-paper-plane" title="Mark as read"></i>
                    </router-link>
                </td>
            </tr>
    `,
    components: {
        longText,
    },
    data() {
        return {
            isHover: false,
            isStarred: false,
        }
    },
    created() {

    },
    methods: {
        mouseOver() {
            this.isHover = true
        },
        mouseLeve() {
            this.isHover = false
        },
        select() {
            this.$emit('select', this.mail.id)
        },
        removeMail() {
            this.$emit('remove', this.mail.id)
        },
        starred() {
            this.$emit('starred', this.mail.id)
        },
        setRead() {
            this.$emit('setRead', this.mail.id)
        },
        check() {
            this.$emit('check', this.mail)
        },
        restoreMail(){
            this.$emit('restore', this.mail)
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
        openedMail() {
            return (this.mail.isRead) ? 'raed' : 'unread'
        },
        checked() {
            return (this.mail.isChecked) ? 'checked' : ''

        },
    }
}