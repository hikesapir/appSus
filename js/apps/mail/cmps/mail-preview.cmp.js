'use strict';

export default {
    name: 'mail-preview',
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <td> {{mail.id}}</td>
            <td> {{mail.subject}}</td>
            <td> {{mail.body}}</td>
            <td> {{mail.sentAt}}</td>

        </section>
    `,
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