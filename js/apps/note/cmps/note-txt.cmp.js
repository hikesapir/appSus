export default {
    props: ['info'],
    template: `
        <section class="note-txt">
            <input type="text" v-model v-model="val" @input="changeTxt"/>
        </section>
    `,
    data() {
        return {
            val: info.txt
        }
    },
    methods: {
        changeTxt() {
            this.$emit('setTxt', this.val)
        }
    },
    computed: {}
}