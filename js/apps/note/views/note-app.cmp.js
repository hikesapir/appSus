import { noteService } from '../../note/services/note-service.js';
import noteList from '../../note/cmps/note-list.cmp.js';

export default {
    template:`
        <section class="note-app">
            <h3>note app</h3>
            <note-list :notes="notes"/>
        </section>
    `,
    components: {
        noteList
    },
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.query()
        .then(notes=> this.notes = notes)
    }
}