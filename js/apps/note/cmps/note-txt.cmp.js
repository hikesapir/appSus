import longTxt from "../cmps/long-text.cmp.js"

export default {
    props: ['info'],
    template: `
        <section class="note-txt">
            <p v-if="currWidth">{{info.txt}}</p>
            <long-txt v-else :txt="info.txt" />
        </section>
    `,
    components: {
        longTxt
    },
    data() {
        return {
            currWidth: false
        }
    },
    created() {
        window.addEventListener("resize", this.checkWidth);
      },
      destroyed() {
        window.removeEventListener("resize", this.checkWidth);
      },

    methods: {
        checkWidth() {

            if(window.innerWidth > 690) this.currWidth = true
            else this.currWidth = false
        }
    },
    computed: {

    }
}