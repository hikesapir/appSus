import { bookService } from '../services/books-service.js';
import { utilService } from '../../../services/util-service.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import readReviews from '../cmps/read-reviews.cmp.js';



export default {
    template: `
        <section v-if="book" class="book-details">
            <div>
            <router-link :to="'/book/'+book.prevBookId">Prev Book</router-link> | 
            <router-link to="/book">Go Back</router-link> |
            <router-link :to="'/book/'+book.nextBookId">Next Book</router-link>
            </div>
            <img :src="book.thumbnail">
            <h1>{{book.title}} | by: {{book.authors[0]}}<span>{{checkBookDate}}</span></h1>
            <h2>{{book.subtitle}}</h2>
            <h3>Categories: <span v-for="category in book.categories">{{category}}</span></h3>
            <p>Page count: {{book.pageCount}} <span>{{checkCount}}</span></p>
            <!-- <long-text :txt="book.description" /> -->
            <div class="price flex justify-center align-center">
            <h1 :class="checkPrice">Price: {{formattedPrice}} </h1> <img class="sale" v-if="checkSale" width="40" src="./images/sale.png">
            </div>
            <review-add v-if="addReview" @save="setReview" @close="addReview = !addReview"/>
            <read-reviews v-if="showReviews && book.reviews" :reviews="book.reviews" @remove="removeReview"/>
            <a @click="showReviews = !showReviews">Show Reviews</a> | <a @click="addReview = !addReview">Add Review</a>
        </section>
    `,
    components: {
        // longText,
        reviewAdd,
        readReviews
    },
    data() {
        return {
            book: null,
            showReviews: false,
            addReview: false
        };
    },
    created() {
        const { bookId } = this.$route.params;
        this.getBook(bookId);
    },
    watch: {
        '$route.params.bookId'(newBookId) {
            if(!newBookId) return
            this.getBook(newBookId);
        },
    },
    methods: {
        getBook(bookId) {
            bookService.get(bookId)
                .then(book => {
                    this.book = book;
                });
            },
            setReview(newReview) {
            if (!this.book.reviews) this.book.reviews = [];
            newReview.id = utilService.makeId();
            this.book.reviews.push(newReview);
            bookService.save(this.book)
                .then(book => {
                    // eventBus.emit('show-msg', { txt: 'Saved succesfully', type: 'success' });
                });
        },
        removeReview(id) {
            this.book = bookService.removeReview(id, this.book);
            // const idx = this.book.reviews.findIndex(review => review.id === id);
            // this.book.reviews.splice(idx, 1);
            bookService.save(this.book)
                .then(() => {
                    // eventBus.emit('show-msg', { txt: 'Removed succesfully', type: 'success' });
                });
        }
    },
    computed: {
        bookId() {

        },
        checkCount() {
            if (this.book.pageCount > 500) return ' - Long Reading';
            else if (this.book.pageCount > 200) return ' - Decent Reading';
            else if (this.book.pageCount < 100) return ' - Light Reading';
        },
        checkBookDate() {
            var currYear = new Date().getFullYear();
            if (currYear - this.book.publishedDate > 10) return ' - Veteran Book';
            else if (currYear - this.book.publishedDate < 1) return ' - New!';
        },
        formattedPrice() {
            return new Intl.NumberFormat(this.book.listPrice.currencyCode,
                { style: 'currency', currency: this.book.listPrice.currencyCode })
                .format(this.book.listPrice.amount);
        },
        checkPrice() {
            if (this.book.listPrice.amount > 150) return 'red';
            else if (this.book.listPrice.amount < 30) return 'green';
        },
        checkSale() {
            return this.book.listPrice.isOnSale;
        }
    }
};