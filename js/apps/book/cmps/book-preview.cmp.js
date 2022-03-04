export default {
    props: ['book'],
    template: `
        <section class="book-preview">
                <img :src="book.thumbnail">
                <div class="cover-details"><h3>{{formattedTitle}}</h3>
                <p>Price: {{formattedPrice}}</p></div>
        </section>
    `,
        data(){
            return{
            }
        },
    components: {
    },
    methods: {

    },
    computed: {
        formattedTitle() {
            return this.book.title.charAt(0).toUpperCase() + this.book.title.slice(1);
        },
        formattedPrice() {
            return new Intl.NumberFormat(this.book.listPrice.currencyCode,
                { style: 'currency', currency: this.book.listPrice.currencyCode })
           .format(this.book.listPrice.amount)
        }
    }
}