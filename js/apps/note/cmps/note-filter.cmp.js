export default {
    template: `
        <section class="note-filter">
            <label>
            Search By Title
            <input type="text" v-model="filterBy.byTitle" @input="setFilter">
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byTitle: '',

            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', {...this.filterBy});
        }
    }
}