import { noteService } from "../services/note-service.js";


export default {
    props: ['note'],
    template: `
    
        <section v-if="modal" :style="{ backgroundColor: note.info.backgroundColor }" class="note-edit">
            <span  class="exit" @click="openModal"><i class="fa-solid fa-x"></i></span>
        <form @submit.prevent="editNote">

            <div class="edit-container">
                <textarea ref="input" v-if="note.type === 'note-txt'" cols="25" rows="20" v-model="editedNote.textarea"></textarea>
                <input class="title" ref="input" v-else type="text" placeholder="write some text.." v-model="editedNote.txt">
                <div v-if="note.type === 'note-todos'" v-for="todo in note.info.todos">
                <textarea class="todos" type="text" v-model="todo.txt"></textarea><span @click="onTodoTask(todo, note)"><i class="fa-solid fa-circle-check"></i></span>
                </div>
                <input class="url" v-if="note.type === 'note-img'" type="text" placeholder="Add here image url" v-model="editedNote.url">
                <input class="url" v-if="note.type === 'note-video'" type="text" placeholder="Add here youtube video" v-model="editedNote.src">
                <button>SAVE</button>
             </div>

        </form>
        </section>
    `
    ,
    data() {
        return {
            editedNote: {
                todos: null,
                txt: this.note.info.title || this.note.info.label,
                url: null,
                src: null,
                textarea:  this.note.info.txt
            },
            modal: true
        }
    },
    methods: {
        editNote() {
            if(this.note.type === 'note-txt') this.note.info.txt = this.editedNote.textarea
            else if (this.note.type === 'note-img') {
                this.note.info.title = this.editedNote.txt
                this.note.info.url = this.editedNote.url
            } else if(this.note.type === 'note-todos') {
                this.note.info.label = this.editedNote.txt
            } else if (this.note.type === 'note-video') {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = this.editedNote.src.match(regExp);
            
                const id = (match && match[2].length === 11) ? match[2] : null;
            
                const newSrc = `https://www.youtube.com/embed/${id}`;
                this.note.info.src = newSrc
                this.note.info.title = this.editedNote.txt
            }
            this.modal = this.openModal()
            noteService.save(this.note)
        },
        onTodoTask(todo, note) {
            // console.log(note)
            console.log('child todo:', todo)
            this.$emit('done', todo, note)
        },
        openModal() {
            this.$emit('close')
        }
    },
    comptuted: {
        
    },
    mounted() {
        this.$refs.input.focus();
    }
}