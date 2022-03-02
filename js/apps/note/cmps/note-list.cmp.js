import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'


export default {
    
    props: ['notes'],
    template: `
        <section class="note-list">
            <div class="note-container">
                <div v-for="note in notes">
                <component id="component"
                            :is="note.type"
                           :info="note.info" 
                           @setTxt="setNote"/>

                           <div class="actions">
                <button @click="remove(note.id)">X</button>
                </div>
                </div>
 
            </div>
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    },
    methods: {
        setNote(text) {
            console.log(text)
        },
        remove(id) {
            this.$emit('remove', id);
        }
    },
    computed: {
    }
}