export default {
    template: `
        <header class="app-header">
        <div class="header-container">
            <div @click="homeNav" class="logo">
                <img  src="img/logo.png"/>
            </div>
            <nav class="nav-bar">
            <span @click="openNav = !openNav" class="nav-button"><i class="fa-solid fa-bars"></i></span>
            <transition name="nav">
            <div class="router-nav" :class="opennav">
            <!-- <div v-if="openNav" class="router-nav"> -->
                <router-link to="/">Home</router-link>
                <router-link to="/note">Notes</router-link>
                <router-link to="/mail">Mail</router-link>
                <router-link to="/book">Books</router-link>
            </div>
            </transition>
            </nav>
        </div>
        </header>                

    `,
    data() {
        return {
            openNav: false
        }
    },
    methods: {
        homeNav() {
            this.$router.push('/')
        }
    },
    computed: {
        opennav() {
            return (this.openNav) ? 'open ' : ''
        }
    }
}