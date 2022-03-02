export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote">

            <ul class="options">
                    <li @click="newNote.type = 'note-txt'"><i class="fa-solid fa-font"></i></li>
                    <li @click="newNote.type = 'note-img'"><i class="fa-solid fa-image"></i></li>
                    <li @click="newNote.type = 'note-todos'"><i class="fa-solid fa-list"></i></li>
                </ul>
            <input  type="text" placeholder="write some text.." v-model="newNote.txt">
            <input v-if="newNote.type === 'note-todos'" type="text" placeholder="add label" v-model="newNote.label">
            <input v-if="newNote.type === 'note-img'" type="text" placeholder="add url" v-model="newNote.url">
        <button>Add new note</button>
        </form>
        </section>
    `,
    data() {
        return {
            newNote: {
                type: 'note-txt',
                label: null,
                txt: null,
                url: null
            }
        }
    },
    methods: {
        addNote() {
            this.$emit('add', {...this.newNote})
        },
        
    },
    computed: {
        checkType() {
            
        }
    }
}