export default {
    template:`
        <header class="app-header">
        <div class="header-container">
            <div @click="test" class="logo">
                <img  src="img/logo.png"/>
            </div>
            <nav class="nav-bar">
                <router-link to="/">Home</router-link>
                <router-link to="/note">Notes</router-link>
                <router-link to="/mail">Mail</router-link>
                <router-link to="/book">Books</router-link>
                
            </nav>
        </div>
        </header>
    `,
    methods: {
        test() {
            this.$router.push('/')
        }
    }
}