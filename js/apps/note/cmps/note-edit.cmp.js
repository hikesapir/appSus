export default {
    props: ['note'],
    template: `
    
        <section class="note-edit">
        <input type="text" v-model="text">
        </section>
    `
    ,
    comptuted: {
        text() {
            if(this.note.type === 'note-txt') return this.note.info.txt
        }
    }
}