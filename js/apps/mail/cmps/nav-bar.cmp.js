'use strict';

export default {
    name: 'nav-bar',
    props: ['unread'],
    template: `
        <section class="nav-bar">
            <h1>nav -bar</h1>
            <ul>
                <li @click="selected('compose')"> Compose</li>
                <li class="active"><i class="fa-solid fa-inbox"></i> Inbox ({{unread}})</li>
                <li><i class="fa-solid fa-star"></i> Starred</li>
                <li><i class="fa-solid fa-paper-plane"></i> Sent</li>
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