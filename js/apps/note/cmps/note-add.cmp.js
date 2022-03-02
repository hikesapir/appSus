export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote">
            <input type="text" placeholder="test" v-model="newNote.info.txt">
        <button>Add new note</button>
        </form>
        </section>
    `,
    data() {
        return {
            newNote: {
                type: 'note-txt',
                info: {
                    txt: ''
                }
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