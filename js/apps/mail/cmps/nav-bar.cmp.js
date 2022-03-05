'use strict';

export default {
    name: 'nav-bar',
    props: ['unread','open'],
    template: `
        <section class="nav-bar" :class="open">
            <ul>
                <li class="compose" @click="selected('compose')"> <i class="fa-solid fa-plus"></i>Compose</li>
                <li :class="{ active: select === 'inbox'}" @click="selected('inbox')" title="Inbox" ><i class="fa-solid fa-inbox"></i> Inbox ({{unread}})</li>
                <li :class="{ active: select === 'starred'}" @click="selected('starred')" title="Starred" ><i class="fa-solid fa-star"></i> Starred</li>
                <li :class="{ active: select === 'sent'}" @click="selected('sent')" title="Sent" ><i class="fa-solid fa-paper-plane"></i> Sent</li>
                <li :class="{ active: select === 'drafts'}" @click="selected('drafts')" title="Drafts" ><i class="fa-solid fa-file"></i> Drafts</li>
                <li :class="{ active: select === 'trash'}" @click="selected('trash')" title="Trash" ><i class="fa-solid fa-trash-can"></i> Trash</li>
            </ul>
        </section>
    `,
    components: {
    },
    data() {
        return {
            isActive: true,
            select: 'inbox'
        }
    },
    created() {

    },

    methods: {
        selected(nav) {
           if (nav !=='compose') this.select = nav
            this.$router.push(`/mail`)
            this.$emit('selected', nav)
        }

    },
    computed: {

    },
}