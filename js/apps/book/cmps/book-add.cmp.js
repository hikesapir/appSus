import { bookService } from '../services/books-service.js';


export default {
    template: `
        <section style="min-height: 70vh" class="book-add">
            <h1>Search Book</h1>
            <input type="text" v-model="search"><button @click="searchBooks">Search</button>
            <ul v-if="books">
                <li v-for="book in books">
                <p>{{book.volumeInfo.title}}</p><button @click="saveBook(book)">+</button>
                </li>

            </ul>
        </section>
    `,
    data() {
        return {
            books: null,
            search: null
        };
    },

    created() {

    },
    components: {
    },
    methods: {
        searchBooks() {
            bookService.getNewBooks(this.search)
            .then(books => {
                console.log(books);
                this.books = books
            })
        },
        saveBook(book) {
            bookService.saveNewBook(book)
            this.$router.push('/book')
        }
    },
    
    computed: {
        
    }
}