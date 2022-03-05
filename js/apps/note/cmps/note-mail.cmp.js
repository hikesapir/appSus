export default {
    props: ['info'],
    template: `
        <section class="note-mail">
        <span>{{formatDate(info.date)}}</span>
            <h3>{{info.subject}}</h3><span>{{info.from}}</span>
            <p>{{info.body}}</p>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('he-IL')
        },
    },
    computed: {

    }
}