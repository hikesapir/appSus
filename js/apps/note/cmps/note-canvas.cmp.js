import { noteService } from "../services/note-service.js";

export default {
    props: ['info'],
    template: `
        <section class="note-canvas">
            <h1>{{info.txt}}</h1>
            <canvas style="background-color: white" height="230" id="canvas"></canvas>
        </section>
    `,
    components: {
        noteService
    },
    data() {
        return {
            canvas: null,
            ctx: null,
            isDraw: false,
            startPos: null
        }
    },
    mounted() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");  
            this.canvas.addEventListener('mousemove', this.onMove);
            this.canvas.addEventListener('mousedown', this.onDown);
            this.canvas.addEventListener('mouseup', this.onUp);    
            var img = new Image();
            img.src = this.info.canvas;
            img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }

            setInterval(()=> {
                const imgCanvas = this.canvas.toDataURL()
                this.$emit('canvas', imgCanvas)
            },10000)
        },
        methods: {
            
        onMove(ev) {
            if (!this.isDraw) return;
            this.draw(ev);
        
        },

        onDown(ev) {
            this.isDraw = true;
            this.startPos = noteService.getEvPos(ev);
            this.draw(ev);
        },
        onUp() {
            this.isDraw = false;
        },
        draw(ev) {
            const pos = noteService.getEvPos(ev)
            this.drawLine(this.startPos.x, this.startPos.y, pos.x, pos.y);
                    this.startPos = pos;
        },
        drawLine(x, y, xEnd = 250, yEnd = 250) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(xEnd, yEnd);
            this.ctx.strokeStyle = 'black'
            this.ctx.stroke();
        }

    },
    computed: {

    }
}