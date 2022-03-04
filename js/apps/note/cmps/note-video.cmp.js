export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h1>{{info.title}}</h1>
            <iframe height="250" :src="info.src" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        </section>
    `,
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {

    }
}