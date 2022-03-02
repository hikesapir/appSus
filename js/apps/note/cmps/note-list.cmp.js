import notTxt from '../cmps/note-txt.cmp.js'


export default {
    
    props: ['notes'],
    template: `
        <section class="note-list">
        <ul>
            <li v-for="note in notes" :key="note.id">
                <note-txt :info="note.info"/>
            </li>
        </ul>
        </section>
    `,
    components: {
        notTxt
    },
    methods: {

    },
    computed: {}
}