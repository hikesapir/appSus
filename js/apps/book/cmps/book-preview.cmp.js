export default {
    props: ['book'],
    template: `
        <section class="book-preview">
                <img :src="book.thumbnail">
                <div class="cover-details"><h3>{{book.title}}</h3>
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
        formattedPrice() {
            return new Intl.NumberFormat(this.book.listPrice.currencyCode,
                { style: 'currency', currency: this.book.listPrice.currencyCode })
           .format(this.book.listPrice.amount)
        }
    }
}