import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul class="book-list-container flex wrap justify-center align-center clean-list">
                <router-link v-for="book in books" :key="book.id" :to="/book/+book.id">
                <li class="book-container flex justify-center">
                <book-preview :book="book"/>
                </li>
                </router-link>
            </ul>
        </section>
    `,
    components:{
        bookPreview
    },
    methods: {
    },
    computed: {}
}