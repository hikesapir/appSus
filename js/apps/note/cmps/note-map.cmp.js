import { noteService } from "../services/note-service.js";

export default {
    props: ['info'],
    template: `
        <section class="note-map">
        <h1>{{info.title}}</h1>
        <div id="map" style="width: 100%; height: 200px;"></div>
        </section>
    `,
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        noteService.connectGoogleApi().then(() => {
            this.map = new google.maps.Map(document.querySelector("#map"), {
                center: { lat: 32.08799196933822, lng: 34.803077759806804 },
                zoom: 20,
            });
            this.addMarker({ lat: 32.08799196933822, lng: 34.803077759806804 })
            // this.map.addListener('click', (e) => {
            //     onMoveLocation(e.latLng);
            // });
        });
    },
    methods: {
        addMarker(loc) {
            var marker = new google.maps.Marker({
                position: loc,
                map: this.map,
                title: 'Coding Academy'
            });
            return marker;
        }
    }
};