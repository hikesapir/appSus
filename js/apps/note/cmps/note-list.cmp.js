import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import { noteService } from "../services/note-service.js";

import noteEdit from '../../note/cmps/note-edit.cmp.js';

export default {

    props: ['notes'],
    template: `
        <section class="note-list">
            <div class="note-container">
                <div class="current-note" :style="{ backgroundColor: note.info.backgroundColor }" v-for="note in notes">
                    <span :style="{ opacity: note.isPinned ? 1 : 0 }" class="pin"><i class="fa-solid fa-thumbtack"></i></span>
                    <component  id="component"
                                 :is="note.type"
                                :info="note.info" 
                                 @setTxt="setNote"
                                 />

                           <ul class="actions">
                             <li @click="pin(note)"><i class="fa-solid fa-thumbtack"></i></li>
                             <li @click="remove(note.id)"><i class="fa-solid fa-trash-can"></i></li>
                             <li @click="edit(note)"><i class="fa-solid fa-pen-to-square"></i></li>
                             <li @click="openPalette"><i class="fa-solid fa-palette"></i></li>
                                       <div class="palette-container" v-if="onColor">
                                           <button class="red" @click="switchColor(note, 'red')"></button>
                                           <button class="yellow" @click="switchColor(note, 'yellow')"></button>
                                           <button class="blue" @click="switchColor(note, 'blue')"></button>
                                           <button class="green" @click="switchColor(note, 'green')"></button>
                                        </div>
                            </ul>
                 </div>
        
            </div>
            <note-edit :note="currNote" v-if="openEdit"/>
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteEdit,
        noteService
    },
    data() {
        return {
            openEdit: false,
            currNote: null,
            onColor: false
        };
    },
    methods: {
        setNote(text) {
            console.log(text);
        },
        remove(id) {
            this.$emit('remove', id);
        },
        edit(note) {
            this.currNote = note
            console.log(this.currNote);
            this.openEdit = true;
            // this.$emit('edit', id)
        },
        openPalette() {
            this.onColor = !this.onColor
        },
        onRed(note) {
            note.info.backgroundColor = 'red'
        },
        switchColor(note, color) {
            if(color === 'blue') note.info.backgroundColor = 'blue'
            else if (color === 'red') note.info.backgroundColor = 'red'
            else if (color === 'yellow') note.info.backgroundColor = 'yellow'
            else if (color === 'green') note.info.backgroundColor = 'green'
            noteService.save(note)
        },
        pin(note) {
            this.$emit('pin', note)
        }

    },
    computed: {
    }
};