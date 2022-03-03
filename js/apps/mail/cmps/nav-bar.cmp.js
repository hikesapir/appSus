'use strict';

export default {
    name: 'nav-bar',
    props: ['unread'],
    template: `
        <section class="nav-bar">
            <ul>
                <li @click="selected('compose')"> Compose</li>
                <li class="active"  @click="selected('inbox')"><i class="fa-solid fa-inbox"></i> Inbox ({{unread}})</li>
                <li><i class="fa-solid fa-star"></i> Starred</li>
                <li @click="selected('sent')"><i class="fa-solid fa-paper-plane"></i> Sent</li>
                <li><i class="fa-solid fa-file"></i> Drafts</li>
                <li><i class="fa-solid fa-trash-can"></i> Trash</li>
            </ul>
        </section>
    `,
    components: {
    },
    data() {
        return {
            isActive: true
        }
    },
    created() {

    },

    methods: {
        selected(nav) {
            this.$emit('selected', nav)
        }

    },
    computed: {

    },
}