
export default {
    props: ['info'],
    template: `
        <section class="note-todos">
            <h1>{{info.label}}</h1>
            <ul>
                <li @click="onTodoTask(todo)" :class="{ done: todo.doneAt }" v-for="todo in info.todos">
                <p :class="{ flow: currWidth }" >{{todo.txt}} <span v-if="todo.doneAt">{{formatDate(todo.doneAt)}}</span></p>
                </li>
            </ul>
        </section>
    `,
    components: {
    },
    data() {
        return {
            currWidth: false
        }
    },
    methods: {
        formatDate(date) {
            return `(בוצע ב: ${new Date(date).toLocaleDateString('he-IL')})`
        },
        onTodoTask(todo) {
            this.$emit('done', todo)
        },
        checkWidth() {
            if(window.innerWidth < 690) this.currWidth = true
            else this.currWidth = false
        }
    },
    created() {
        window.addEventListener("resize", this.checkWidth);
      },
      destroyed() {
        window.removeEventListener("resize", this.checkWidth);
      },
    computed: {

    }
}