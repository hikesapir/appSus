import { noteService } from "../services/note-service.js";


export default {
    props: ['note'],
    template: `
    
        <section class="note-edit">
            <span @click=""><i class="fa-solid fa-x"></i></span>
        <form @submit.prevent="editNote">

            <div class="edit-container"> 
                <input  type="text" placeholder="write some text.." v-model="editedNote.txt">
                <input v-if="note.type === 'note-todos'" type="text" placeholder="add label" v-model="editedNote.label">
                <input v-if="note.type === 'note-img'" type="text" placeholder="add url" v-model="editedNote.url">
                <input v-if="note.type === 'note-video'" type="text" placeholder="add video" v-model="editedNote.src">
                <button>EDIT</button>
             </div>

        </form>
            
        </section>
    `
    ,
    data() {
        return {
            editedNote: {
                label: null,
                txt: null,
                url: null,
                src: null
            }
        }
    },
    methods: {
        editNote() {
            if(this.note.info.txt) this.note.info.txt = this.editedNote.txt
            if(this.editedNote.label) {
                this.note.info.label = this.editedNote.label
                this.note.info.todos[0].txt = this.editedNote.txt
            }
            if(this.editedNote.url) {
                this.note.info.title = this.editedNote.txt
                this.note.info.url = this.editedNote.url
            }
            if(this.editedNote.src) {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = this.editedNote.src.match(regExp);
            
                const id = (match && match[2].length === 11) ? match[2] : null;
            
                const newSrc = `https://www.youtube.com/embed/${id}`;
                this.note.info.src = newSrc
                this.note.info.title = this.editedNote.txt
            }
            noteService.save(this.note)
        }
    },
    comptuted: {
        
    }
}