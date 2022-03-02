
export default {
    props: ['info'],
    template: `
        <section class="note-todos">
            <label>{{info.label}}
            <ul>
                <li v-for="todo in info.todos">
                <p>{{todo.txt}}</p><p  v-if="todo.doneAt">{{formatDate(todo.doneAt)}}</p>
                </li>
            </ul>
            </label>
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