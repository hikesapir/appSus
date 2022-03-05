import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
    <transition name="nav">
        <section v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </section>
    </transition>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 5000);
        }
    },
    unmounted() {
        this.unsubscribe();
    }
};