import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';

import noteEdit from '../../note/cmps/note-edit.cmp.js';

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
                <button @click="edit(note)">Edit</button>
                            </div>
                 </div>
        
            </div>
            <note-edit :note="currNote" v-if="openEdit"/>
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteEdit
    },
    data() {
        return {
            openEdit: false,
            currNote: null
        };
    },
    methods: {
        setNote(text) {
            console.log(text);
        },
        remove(id) {
            this.$emit('remove', id);
        },
        edit(note) {
            this.currNote = note
            console.log(this.currNote);
            this.openEdit = true;
            // this.$emit('edit', id)
        },

    },
    computed: {
    }
};