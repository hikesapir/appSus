import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteAudio from '../cmps/note-audio.cmp.js';
import { noteService } from "../services/note-service.js";

import noteEdit from '../../note/cmps/note-edit.cmp.js';

export default {

    props: ['notes'],
    template: `
        <section class="note-list">
            <div class="note-container">
                <!-- <transition name="fade" mode="out-in"> -->
                <div class="current-note" :style="{ backgroundColor: note.info.backgroundColor }" v-for="note in notes">
                    <span :style="{ opacity: note.isPinned ? 1 : 0 }" class="pin"><i class="fa-solid fa-thumbtack"></i></span>
                    <component  id="component"
                    :is="note.type"
                    :info="note.info" 
                    @setTxt="setNote"
                    @done="doneAt($event, note)"
                    />
                    
                    <ul class="actions">
                        <li @click="remove(note.id)"><i class="fa-solid fa-trash-can"></i></li>
                        <li @click="pin(note)"><i class="fa-solid fa-thumbtack"></i></li>
                        <li @click="copy(note)"><i class="fa-solid fa-copy"></i></li>
                        <li @click="edit(note)"><i class="fa-solid fa-pen-to-square"></i></li>
                        <li @click="openPalette"><i class="fa-solid fa-palette"></i></li>
                        <div @mouseleave="openPalette" class="palette-container" v-if="onColor">
                            <button class="red" @click="switchColor(note, 'red')"></button>
                            <button class="yellow" @click="switchColor(note, 'yellow')"></button>
                            <button class="blue" @click="switchColor(note, 'blue')"></button>
                            <button class="green" @click="switchColor(note, 'green')"></button>
                        </div>
                    </ul>
                </div>
            </div>
        <!-- </transition> -->
            <note-edit :note="currNote" v-if="openEdit" @done="doneAt($event, note)" @close="closeModal"/>
        </section>
    `,
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteAudio,
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
            this.openEdit = true;
            // this.$emit('edit', id)
        },
        closeModal() {
            this.openEdit = false
        },
        doneAt(todo, note) {
            if (todo.doneAt) todo.doneAt = null
            else todo.doneAt = Date.now()
            noteService.save(note)
        },
        openPalette() {
            this.onColor = !this.onColor
        },
        switchColor(note, color) {
            if(color === 'blue') note.info.backgroundColor = '#0dcaf0'
            else if (color === 'red') note.info.backgroundColor = 'lightpink'
            else if (color === 'yellow') note.info.backgroundColor = '#ffdc72'
            else if (color === 'green') note.info.backgroundColor = 'lightgreen'
            noteService.save(note)
        },
        pin(note) {
            this.$emit('pin', note)
        },
        copy(note) {
            this.$emit('copy', note)
        }

    },
    computed: {
    }
};