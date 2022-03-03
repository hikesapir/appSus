export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote">

                <div class="input-container"> 
                      <input  type="text" placeholder="write some text.." v-model="newNote.txt">
                       <input v-if="newNote.type === 'note-todos'" type="text" placeholder="add label" v-model="newNote.label">
                        <input v-if="newNote.type === 'note-img'" type="text" placeholder="add url" v-model="newNote.url">
                     <input v-if="newNote.type === 'note-video'" type="text" placeholder="add video" v-model="newNote.src">
                     <button><i class="fa-solid fa-plus"></i></button>
                 </div>
        <ul class="options">
                    <li @click="newNote.type = 'note-txt'"><i class="fa-solid fa-font"></i></li>
                    <li @click="newNote.type = 'note-img'"><i class="fa-solid fa-image"></i></li>
                    <li @click="newNote.type = 'note-todos'"><i class="fa-solid fa-list"></i></li>
                    <li @click="newNote.type = 'note-video'"><i class="fa-brands fa-youtube"></i></li>
        </ul>
        </form>
        </section>
    `,
    data() {
        return {
            newNote: {
                type: 'note-txt',
                label: null,
                txt: null,
                url: null,
                src: null
            }
        }
    },
    methods: {
        addNote() {
            this.$emit('add', {...this.newNote})
        },
        
    },
    computed: {
        
    }
}