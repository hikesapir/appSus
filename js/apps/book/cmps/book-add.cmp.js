import { eventBus } from '../../../services/eventBus-service.js';
import { bookService } from '../services/books-service.js';


export default {
    template: `
        <section class="book-add">
            <div class="add-container">
                <h1>Search your favorite Book!</h1>
                <div class="search-container">
                    <input placeholder="Search.." type="text" v-model="search">
                        <span @click="searchBooks"><i class="fa-solid fa-magnifying-glass"></i></span>
                 </div>
            </div>
            <ul class="new-books" v-if="books">
                <li v-for="book in books">
                <div><p>{{book.volumeInfo.title}} </p><span @click="saveBook(book)"><i class="fa-solid fa-plus"></i></span></div>
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
                this.books = books
            })
        },
        saveBook(book) {
            bookService.saveNewBook(book)
            this.$router.push('/book')
            eventBus.emit('show-msg', 'Book saved')
        }
    },
    
    computed: {
        
    }
}