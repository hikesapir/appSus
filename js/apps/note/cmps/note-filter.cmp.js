export default {
    template: `
        <section class="note-filter">
            <label>
            Search By Title
            <input type="text" v-model="filterBy.byTitle" @input="setFilter">
            </label>
            <input type="radio" id="all" value="" v-model="filterBy.byType">
            <label for="all">All</label>
            <input type="radio" id="txt" value="note-txt" v-model="filterBy.byType">
            <label for="txt">txt</label>
            <br>
            <input type="radio" id="img" value="note-img" v-model="filterBy.byType">
            <label for="img">img</label>
            <input type="radio" id="todos" value="note-todos" v-model="filterBy.byType">
            <label for="todos">todos</label>
            <input type="radio" id="video" value="note-video" v-model="filterBy.byType">
            <label for="video">video</label>
        <pre>{{filterBy.byTitle}}</pre>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byTitle: '',
                byType: ''

            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', {...this.filterBy});
        }
    }
}