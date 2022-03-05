export default {
    template: `
        <section class="note-filter">


        
            <input type="text" v-model="filterBy.byTitle" @input="setFilter" placeholder="Search your note..">

            

        <div class="type-options"> |
            <input type="radio" id="all" value="" v-model="filterBy.byType" @change="setFilter">
            <label title="All Notes" style="font-weight: bold" for="all">All</label> | 
            <input type="radio" id="txt" value="note-txt" v-model="filterBy.byType" @change="setFilter">
            <label title="All text notes" for="txt"><i class="fa-solid fa-t"></i></label> |
            <input type="radio" id="img" value="note-img" v-model="filterBy.byType" @change="setFilter">
            <label title="All images" for="img"><i class="fa-solid fa-image"></i></label> |
            <input type="radio" id="todos" value="note-todos" v-model="filterBy.byType" @change="setFilter">
            <label title="All todos" for="todos"><i class="fa-solid fa-list"></i></label> |
            <input type="radio" id="video" value="note-video" v-model="filterBy.byType" @change="setFilter">
            <label title="All videos" for="video"><i class="fa-brands fa-youtube"></i></label> |
            <input type="radio" id="mp3" value="note-audio" v-model="filterBy.byType" @change="setFilter">
            <label title="All audios" for="mp3"><i class="fa-solid fa-headphones-simple"></i></label> |
            <input type="radio" id="canvas-filter" value="note-canvas" v-model="filterBy.byType" @change="setFilter">
            <label title="All canvas" for="canvas-filter"><i class="fa-solid fa-pencil"></i></label> |
            <input type="radio" id="map-filter" value="note-map" v-model="filterBy.byType" @change="setFilter">
            <label title="All maps" for="map-filter"><i class="fa-solid fa-map-location"></i></label> |
    </div>
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