export default {
    props: ['info'],
    template: `
        <section class="note-img">
            <h1>{{info.title}}</h1>
            <img :src="info.url"/>
        </section>
    `,
    data() {
        return {
            
        }
    },
    methods: {
    },
    computed: {}
}