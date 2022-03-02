function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail);
    };
    window.addEventListener(eventName, callListener);
    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBus = { on, emit };


export function showErrorMsg(txt) {
    eventBus.emit('show-msg', { txt, type: 'error' });
}
export function showSuccessMsg(txt) {
    eventBus.emit('show-msg', { txt, type: 'success' });
}







eventBus.on('puk', (data)=>{
    console.log('Puk happened', data);
})
// eventBus.on('puk', (data)=>{
//     console.log('Mee too:', data);
// })
// eventBus.emit('puk', {level: 3})
