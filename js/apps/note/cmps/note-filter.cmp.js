export default {
    template: `
        <section class="note-filter">
            <input type="text" v-model="filterBy.byTitle" @input="setFilter" placeholder="Search your note..">
            <input type="radio" id="all" value="" v-model="filterBy.byType" @change="setFilter">
            <label style="font-weight: bold" for="all">All</label> | 
            <input type="radio" id="txt" value="note-txt" v-model="filterBy.byType" @change="setFilter">
            <label for="txt"><i class="fa-solid fa-t"></i></label> |
            <input type="radio" id="img" value="note-img" v-model="filterBy.byType" @change="setFilter">
            <label for="img"><i class="fa-solid fa-image"></i></label> |
            <input type="radio" id="todos" value="note-todos" v-model="filterBy.byType" @change="setFilter">
            <label for="todos"><i class="fa-solid fa-list"></i></label> |
            <input type="radio" id="video" value="note-video" v-model="filterBy.byType" @change="setFilter">
            <label for="video"><i class="fa-brands fa-youtube"></i></label> |
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