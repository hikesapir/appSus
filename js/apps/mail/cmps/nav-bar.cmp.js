'use strict';

export default {
    name: 'nav-bar',
    props: ['unread'],
    template: `
        <section class="nav-bar">
            <ul>
                <li class="compose" @click="selected('compose')"> <i class="fa-solid fa-plus"></i>Compose</li>
                <li :class="{ active: select === 'inbox'}" @click="selected('inbox')"><i class="fa-solid fa-inbox"></i> Inbox ({{unread}})</li>
                <li :class="{ active: select === 'starred'}" @click="selected('starred')" ><i class="fa-solid fa-star"></i> Starred</li>
                <li :class="{ active: select === 'sent'}" @click="selected('sent')"><i class="fa-solid fa-paper-plane"></i> Sent</li>
                <li :class="{ active: select === 'drafts'}" @click="selected('drafts')"><i class="fa-solid fa-file"></i> Drafts</li>
                <li :class="{ active: select === 'trash'}" @click="selected('trash')"><i class="fa-solid fa-trash-can"></i> Trash</li>
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
            this.select = nav
            this.$router.push(`/mail`)
            this.$emit('selected', nav)
        }

    },
    computed: {

    },
}