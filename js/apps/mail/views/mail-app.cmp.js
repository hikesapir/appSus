'use strict';
import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/mail-list.cmp.js";
import navBar from "../cmps/nav-bar.cmp.js";

export default {
    name: 'mail-app',
    template:`
        <section class="mail-app">
            <nav-bar></nav-bar>
               <router-view></router-view>
        </section>
    `,
    components: {
        mailList,
        navBar,
      },    
    data() {
        return{
            mails: null,

        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails);
    },

    methods: {
        
    },
    computed: {
        mailsForDisplay() {
            return this.mails;
            // if (!this.filterBy) return this.cars;
            // const regex = new RegExp(this.filterBy.vendor, 'i');
            // return this.cars.filter(car => regex.test(car.vendor));
        }

    },
}