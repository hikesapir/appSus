
export default {
    props: ['info'],
    template: `
        <section class="note-todos">
            <h1>{{info.label}}</h1>
            <ul>
                <li @click="onTodoTask(todo)" :class="{ done: todo.doneAt }" v-for="todo in info.todos">
                <p>{{todo.txt}} <span v-if="todo.doneAt">{{formatDate(todo.doneAt)}}</span></p>
                </li>
            </ul>
        </section>
    `,
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        formatDate(date) {
            return `(בוצע ב: ${new Date(date).toLocaleDateString('he-IL')})`
        },
        onTodoTask(todo) {
            this.$emit('done', todo)
        },
    },

    computed: {

    }
}