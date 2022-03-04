// id: null,
// fullName: 'Books Reader',
// date: new Date(Date.now()),
// rate: 0,
// freeText: ''

export default {
    props: ['reviews'],
    template: `
        <section class="read-reviews">
        <ul>
            <li v-for="review in reviews">
                <h1>Name: {{review.fullName}}</h1>
                <h1>Read the book at: {{review.date}}</h1>
                <h1>Rate: {{review.rate}}</h1>
                <p>{{review.freeText}}</p>
                <button @click="remove(review.id)">Delete Review</button>
            </li>
            </ul>
        </section>
    `,
    data() {
        return {

        };
    },
    methods: {
        remove(id) {
            this.$emit('remove', id)
        }
    },
    created() {
 
    },
    computed: {
 
            }
}