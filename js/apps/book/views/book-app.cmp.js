import { bookService } from '../services/books-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';

export default {
    template: `
        <section class="book-app">
            <book-filter @clear="onClear"  @filtered="setFilter" />
            <book-list  :books="booksToShow" />
        </section>
    `,
    components: {
        bookFilter,
        bookList,
    },
    data() {
        return {
            books: null,
            filterBy: null
        };
    },
    created() {
       bookService.query()
       .then(books => this.books = books)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        onClear() {
            this.filterBy = null
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.byName, 'i');
            return this.books.filter(book => {
                return regex.test(book.title) &&
                    book.listPrice.amount > this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice;
            });
        }
    },
};
