import { noteService } from '../../note/services/note-service.js';
import noteList from '../../note/cmps/note-list.cmp.js';
import noteAdd from '../../note/cmps/note-add.cmp.js';
import noteFilter from '../../note/cmps/note-filter.cmp.js'
// import noteEdit from '../../note/cmps/note-edit.cmp.js';

export default {
    template: `
        <section class="note-app">
            <div class="main-layout">
            <note-filter @filtered="setFilter"/>
            <note-add @add="addNote" />
            <note-list :notes="notesToShow" @remove="removeNote" @edit="editNote" @pin="pinNote"/>
            <!-- <note-edit  v-if="openEdit"/> -->
        </div>
        </section>
    `,
    components: {
        noteList,
        noteAdd,
        noteFilter,
        // noteEdit
    },
    data() {
        return {
            notes: null,
            filterBy: null,
            openEdit: false
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
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
        },
        editNote(id) {
            this.openEdit = true
        },
        pinNote(note) {
            note.isPinned = !note.isPinned
            this.notes.sort((n1, n2) => n2.isPinned - n1.isPinned)
            noteService.saveAllNotes(this.notes)
            noteService.save(note)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy || !this.filterBy.byType) return this.notes
            console.log(this.filterBy)
            const regex = new RegExp(this.filterBy.byTitle, 'i');
            return this.notes.filter(note => {
                return regex.test(note.info.title || note.info.label || note.info.txt) &&
                note.type === this.filterBy.byType

                });

        }
    },

};