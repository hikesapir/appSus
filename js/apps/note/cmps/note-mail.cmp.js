export default {
    props: ['info'],
    template: `
        <section class="note-mail">
            <h3>{{info.subject}}</h3><span>{{info.from}}</span>
            <p>{{info.body}}</p>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {

    }
}