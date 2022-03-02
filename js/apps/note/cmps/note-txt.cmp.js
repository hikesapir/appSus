export default {
    props: ['info'],
    template: `
        <section class="note-txt">
            <input type="text" v-model="info.txt" @input="changeTxt"/>
        </section>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        changeTxt() {
            this.$emit('setTxt', this.info.txt)
        }
    },
    computed: {}
}