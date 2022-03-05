export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h1>{{info.title}}</h1>
            <audio controls>
            <source :src="info.src" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
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