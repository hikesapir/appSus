import { noteService } from '../../note/services/note-service.js';
import noteList from '../../note/cmps/note-list.cmp.js';
import noteAdd from '../../note/cmps/note-add.cmp.js';

export default {
    template: `
        <section class="note-app main-layout">
            <note-add @add="addNote" />
            <note-list :notes="notes" @remove="removeNote"/>
        </section>
    `,
    components: {
        noteList,
        noteAdd
    },
    data() {
        return {
            notes: null
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes);
    },
    methods: {
        removeNote(id) {
            noteService.remove(id)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === id);
                    this.notes.splice(idx, 1);
                });
        },
        addNote(note) {
            noteService.newNote(note)
                .then(() => {
                    noteService.query()
                        .then(notes => this.notes = notes);
                });
        }
    }

};