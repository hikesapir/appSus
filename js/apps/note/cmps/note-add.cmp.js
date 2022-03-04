export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote">

                <div class="input-container">
                    <transition name="fade">
                    <input v-if="newNote.type === 'note-todos'" type="text" placeholder="add label" v-model="newNote.label">
                </transition>
                <transition name="fade">
                    <input v-if="newNote.type === 'note-img'" type="text" placeholder="add url" v-model="newNote.url">
                    </transition>
                    <transition name="fade">
                    <input v-if="newNote.type === 'note-video'" type="text" placeholder="add video" v-model="newNote.src">
                    </transition>
                    
                    <input  type="text" placeholder="write some text.." v-model="newNote.txt">
                    <button><i class="fa-solid fa-plus"></i></button>
                    <!-- <button><i class="fa-solid fa-magnifying-glass"></i> -->
                     <ul class="options">
                    <li @click="newNote.type = 'note-txt'"><i class="fa-solid fa-font"></i></li>
                    <li @click="newNote.type = 'note-img'"><i class="fa-solid fa-image"></i></li>
                    <li @click="newNote.type = 'note-todos'"><i class="fa-solid fa-list"></i></li>
                    <li @click="newNote.type = 'note-video'"><i class="fa-brands fa-youtube"></i></li>
        </ul>
                 </div>
        
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
            if(!this.newNote.txt) return
            this.$emit('add', {...this.newNote})
        },
        
    },
    computed: {
        
    }
}