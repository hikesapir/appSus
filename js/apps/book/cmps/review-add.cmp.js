export default {
    template: `
        <section class="review-add">
            <button @click="close">X</button>
            <h1> Add new review! </h1>
        <form class="flex column" @submit.prevent="save">
            <label>Full Name</label>
            <input ref="nameInput" type="name" v-model="addReview.fullName">
            <label>When you read the book?</label>
            <input type="date" v-model="readDate">
            <label>Rate 1-5</label>
            <input type="number" v-model.number="addReview.rate" min="0" max="5">
            <label>Free Text </label>
            <textarea rows="4" cols="50" v-model="addReview.freeText">
            </textarea>
            <button>Add Review</button>
        </form>
        </section>
    `,
    data() {
        return {
            addReview: {
                id: null,
                fullName: 'Books Reader',
                date: new Date(Date.now()),
                rate: 0,
                freeText: ''
            }
        };
    },
    mounted() {
        this.$refs.nameInput.focus();
    },
    methods: {
        save() {

            this.$emit('save', { ...this.addReview });
            this.addReview = {
                id: null,
                fullName: 'Books Reader',
                date: new Date(Date.now()),
                rate: 0,
                freeText: ''
            };
        },
        close() {
            this.$emit('close');
        }
    },
    computed: {
        readDate() {
            var day = this.addReview.date.getDate();
            var month = this.addReview.date.getMonth() + 1;
            var year = this.addReview.date.getFullYear();
            const dayStr = (day < 10) ? '0' + day : day;
            const monthStr = (month < 10) ? '0' + month : month;
            return `${year}-${monthStr}-${dayStr}`;
        }
    },
};