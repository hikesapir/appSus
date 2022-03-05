import { noteService } from '../../note/services/note-service.js';
import { eventBus } from '../../../services/eventBus-service.js';
import noteList from '../../note/cmps/note-list.cmp.js';
import noteAdd from '../../note/cmps/note-add.cmp.js';
import noteFilter from '../../note/cmps/note-filter.cmp.js';

export default {
    template: `
        <section class="note-app">
            <div class="main-layout">
            <note-filter @filtered="setFilter"/>
            <note-add @add="addNote" />
            <note-list :notes="notesToShow" @remove="removeNote" @edit="editNote" @pin="pinNote" @copy="copyNote"/>
        </div>
        </section>
    `,
    components: {
        noteList,
        noteAdd,
        noteFilter,
    },
    data() {
        return {
            notes: null,
            filterBy: {
                byTitle: '',
                byType: ''
            },
            openEdit: false,
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
                        .then(notes => {
                            this.notes = notes.sort((n1, n2) => n2.isPinned - n1.isPinned);
                            noteService.saveAllNotes(this.notes);
                        });

                });
        },
        editNote(id) {
            this.openEdit = true;
        },
        pinNote(note) {
            note.isPinned = !note.isPinned;
            this.notes.sort((n1, n2) => n2.isPinned - n1.isPinned);
            noteService.saveAllNotes(this.notes);
            noteService.save(note);
        },
        copyNote(note) {
            const noteIdx = this.notes.findIndex(currNote => currNote.id === note.id);
            noteService.duplicateNote(note, noteIdx)
                .then(() => {
                    noteService.query()
                        .then(notes => this.notes = notes);
                });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        saveMailAsNote(mail) {
            this.mailNote = {
                type: "note-mail",
                isPinned: true,
                info: {
                    backgroundColor: 'white',
                    from: mail.from,
                    subject: mail.subject,
                    body: mail.body,
                }
            }
            return noteService.mailNote(this.mailNote)
                .then(mail => {
                    return noteService.query()
                        .then(notes => {
                            this.notes = notes
                            this.$router.push('/note');
                            return notes
                        })

                })
        }
    },
    computed: {
        notesToShow() {
            if (!this.notes) return
            const regex = new RegExp(this.filterBy.byTitle, 'i');
            if (!this.filterBy.byType) return this.notes.filter(note => regex.test(note.info.title || note.info.label || note.info.txt))

            return this.notes.filter(note => {
                return regex.test(note.info.title || note.info.label || note.info.txt) &&
                    note.type === this.filterBy.byType
            });

        },

    },
    computed: {
        notesToShow() {
            if (!this.notes) return;
            const regex = new RegExp(this.filterBy.byTitle, 'i');
            if (!this.filterBy.byType) return this.notes.filter(note => regex.test(note.info.title || note.info.label || note.info.txt));

            return this.notes.filter(note => {
                return regex.test(note.info.title || note.info.label || note.info.txt) &&
                    note.type === this.filterBy.byType;
            });

        },

    },
    watch: {
        '$route.query': {
            handler() {
                const mail = this.$route.query;
                if (Object.keys(mail).length === 0) return
                this.saveMailAsNote(mail)
                eventBus.emit('show-msg', { txt: 'Added mail note!', type: 'success' });
            },
            immediate: true
        }
    }

};