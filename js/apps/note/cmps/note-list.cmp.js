import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'


export default {
    
    props: ['notes'],
    template: `
        <section class="note-list">
                <component :is="note.type"
                           v-for="note in notes"
                           :info="note.info" 
                           @setTxt="setNote"/>

        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos
    },
    methods: {
        setNote(text) {
            console.log(text)
        }
    },
    computed: {
    }
}