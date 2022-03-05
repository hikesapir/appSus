import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';

_createNotes();

export const noteService = {
    query,
    get,
    save,
    remove,
    newNote,
    saveAllNotes,
    duplicateNote,
    getEvPos,
};

function saveAllNotes(notes) {
    return utilService.saveToStorage(NOTES_KEY, notes);
}

function query() {
    return storageService.query(NOTES_KEY);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}

function newNote(note) {
    var currNote = null;
    if (note.type === 'note-txt') {
        currNote = _createTxtNote(note.txt);
    } else if (note.type === 'note-img') {
        currNote = _createImgNote(note.url, note.txt);
    } else if (note.type === 'note-todos') {
        currNote = _createTodoNote(note.label, note.txt);
    } else if (note.type === 'note-video') {
        currNote = _createVidNote(note.src, note.txt);
    } else if(note.type === 'note-canvas') {
        currNote = _createCanvasNote(note.txt)
        currNote.canvasId = utilService.makeId();
    } else console.log('error');

    currNote.id = utilService.makeId();
    if(note.type === 'note-canvas') currNote.info.canvasId = currNote.id
    currNote.info.backgroundColor = utilService.getRandomClr();
    currNote.isPinned = false;
    return storageService.post(NOTES_KEY, currNote);
}

function duplicateNote(note, noteIdx) {
    var duplicateNote = { ...note };
    duplicateNote.id = utilService.makeId();
    return storageService.duplicatePost(NOTES_KEY, duplicateNote, noteIdx);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n107",
                type: "note-img",
                isPinned: true,
                info: {
                    backgroundColor: "lightcoral",
                    url: "https://s7.gifyu.com/images/65eibq.gif",
                    title: ""
                },
            },
            {
                id: "n101",
                type: "note-todos",
                isPinned: false,
                info: {
                    backgroundColor: "#ffdc72",
                    label: "משימות",
                    todos: [
                        { txt: "ללמד canvas כמה שעות לפני הספרינט", doneAt: 1644911032000 },
                        { txt: "ללמד vue.js בשבוע אחד", doneAt: 1646120632000 },
                        { txt: "לתת חצי שעה לתרגול", doneAt: null },
                    ]
                }
            },

            {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                info: {
                    backgroundColor: "#ffdc72",
                    txt: "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לפרומי בלוף־קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה ש”יצמה ברורק“. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. ושבעגט לבם סולגק. בראיט ולחת צורק מונחף, בגורמי מג׳מש. תרבנך וסתעד לכנו סתשם השמה – לתכי מורגם בורק? לתיג ישבעס."

                }
            },

            {
                id: "n115",
                type: "note-canvas",
                isPinned: true,
                info: {
                    backgroundColor: "lightsalmon",
                    canvasId: 'n115',
                    title: 'My life since coding academy',
                    canvas: "data:image/png;base64,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"
                }
            },

            {
                id: "n103",
                type: "note-video",
                isPinned: false,
                info: {
                    backgroundColor: "#0dcaf0",
                    src: "https://www.youtube.com/embed/nhBVL41-_Cw",
                    title: ""
                }
            },

            {
                id: "n105",
                type: "note-video",
                isPinned: false,
                info: {
                    backgroundColor: "#0dcaf0",
                    src: "https://www.youtube.com/embed/Z3TIhMGQ_8k",
                    title: ""
                }
            },
            {
                id: "n104",
                type: "note-img",
                isPinned: false,
                info: {
                    backgroundColor: "lightcoral",
                    url: "https://i0.wp.com/www.tals-cooking.com/wp-content/uploads/2008/06/DSC3843-3-scaled.jpg?resize=1024%2C683&ssl=1",
                    title: "במיה ברוטב עגבניות"
                },

            },
            {
                id: "n106",
                type: "note-todos",
                isPinned: false,
                info: {
                    backgroundColor: "#ffdc72",
                    label: "מתכון לשקשוקה",
                    todos: [
                        { txt: "בקערה קטנה מערבבים את חומרי התיבול ומניחים בצד", doneAt: 1641714232000 },
                        { txt: " מחממים את השמן במחבת גדולה ומוסיפים בצל ופלפל חריף. ...", doneAt: 1643183032000 },
                        { txt: "  חוצים את העגבניות שרי, מוסיפים למחבת ומערבבים.", doneAt: null },
                        { txt: " מוסיפים את תערובת התבלינים, מערבבים ושוברים פנימה את הביצים אחת אחת.", doneAt: null },
                        { txt: " לפני ההגשה מתבלים את החלמון במעט מלח ופלפל ומפזרים פטרוזיליה קצוצה", doneAt: null },
                        { txt: " מגישים עם לחם טרי.", doneAt: null }
                    ]
                }
            },
            {
                id: "n108",
                type: "note-audio",
                isPinned: false,
                info: {
                    backgroundColor: "lightgreen",
                    src: 'audio/lorem.mp3',
                    title: 'LOREM IPSUM SONG'


                },

            },


        ];
    }
    utilService.saveToStorage(NOTES_KEY, notes);
    return notes;
}

function _createTxtNote(txt) {
    return {
        type: "note-txt",
        info: {
            txt
        }
    };
}

function _createImgNote(url, title) {
    return {
        type: "note-img",
        info: {
            url,
            title
        }
    };
}

function _createTodoNote(label, txt) {
    return {
        type: "note-todos",
        info: {
            label,
            todos: [
                { txt, doneAt: null }
            ]
        }
    };
}

function _createVidNote(src, title) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = src.match(regExp);

    const id = (match && match[2].length === 11) ? match[2] : null;

    const newSrc = `https://www.youtube.com/embed/${id}`;

    return {
        type: "note-video",
        info: {
            src: newSrc,
            title
        }
    };
}

function _createCanvasNote(title) {
    return {
        type: "note-canvas",
        info: {
            canvasId: null,
            title,
            canvas: null,
        }
    };
}

function getEvPos(ev) {

    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
        xMovement: ev.movementX,
        yMovement: ev.movementY
    };
    return pos;
};






