export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h1>{{info.title}}</h1>
            <iframe width="300" height="250" :src="info.src" title="YouTube video player" frameborder="0"></iframe>

        </section>
    `,
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date)
        }
    },
    computed: {

    }
}