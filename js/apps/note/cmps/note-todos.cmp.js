
export default {
    props: ['info'],
    template: `
        <section class="note-todos">
            <h1>{{info.label}}</h1>
            <ul>
                <li v-for="todo in info.todos">
                <p>{{todo.txt}}</p><p  v-if="todo.doneAt">{{formatDate(todo.doneAt)}}</p>
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
            return new Date(date)
        }
    },
    computed: {

    }
}