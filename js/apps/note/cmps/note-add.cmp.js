export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote">
            <select v-model="newNote.type">
                <option disabled value="">Please select one</option>
                <option value="note-txt">Text</option>
                <option value="note-img">Image</option>
                <option value="note-todos">Todo</option>

            </select>
            <input type="text" placeholder="test" v-model="newNote.txt">
            <input type="text" placeholder="label" v-model="newNote.label">
            <input type="text" placeholder="url" v-model="newNote.url">
        <button>Add new note</button>
        </form>
        </section>
    `,
    data() {
        return {
            newNote: {
                type: null,
                label: null,
                txt: null,
                url: null
            }
        }
    },
    methods: {
        addNote() {
            this.$emit('add', {...this.newNote})
        }
    },
    computed: {}
}