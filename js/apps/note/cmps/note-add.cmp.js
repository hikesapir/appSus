export default {
    template: `
        <section class="note-add">
        <form @submit.prevent="addNote" @key.enter>

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
                    
                    <input  type="text" :placeholder="checkType" v-model="newNote.txt">
                    <button title="Add your note!" ><i class="fa-solid fa-plus"></i></button>
                    <!-- <button><i class="fa-solid fa-magnifying-glass"></i> -->
                     <ul class="options">
                    <li title="Text note" @click="newNote.type = 'note-txt'"><i class="fa-solid fa-font"></i></li>
                    <li title="Image note" @click="newNote.type = 'note-img'"><i class="fa-solid fa-image"></i></li>
                    <li title="Todo note" @click="newNote.type = 'note-todos'"><i class="fa-solid fa-list"></i></li>
                    <li title="Video note" @click="newNote.type = 'note-video'"><i class="fa-brands fa-youtube"></i></li>
                    <li title="Canvas note" @click="newNote.type = 'note-canvas'"><i class="fa-solid fa-pencil"></i></li>
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
        checkType() {
            if(this.newNote.type === 'note-canvas') return 'Title for your canvas!'
            else if(this.newNote.type === 'note-img') return 'Title for your image!'
            else if(this.newNote.type === 'note-video') return 'Title for your video!'
            else if(this.newNote.type === 'note-todos') return "What's your task?"
            else return 'Write some text   :)'
        }
    }
}