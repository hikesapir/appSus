'use strict';

export default {
    name: 'nav-bar',
    props: [],
    template: `
        <section class="nav-bar">
            <h1>nav -bar</h1>
            <ul>
                <li> Compose</li>
                <li><i class="fa-solid fa-inbox"></i> Inbox</li>
                <li><i class="fa-solid fa-star"></i> Starred</li>
                <li>Sent</li>
                <li>Drafts</li>
                <li>Trash</li>
            </ul>
        </section>
    `,
    components: {
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
   
    },
}