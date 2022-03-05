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
    getEvPos
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
        console.log('ger here');
        currNote = _createVidNote(note.src, note.txt);
    } else console.log('error');

    currNote.id = utilService.makeId();
    currNote.info.backgroundColor = utilService.getRandomClr();
    currNote.isPinned = false;
    return storageService.post(NOTES_KEY, currNote);
}

function duplicateNote(note, noteIdx) {
    var duplicateNote = { ...note };
    duplicateNote.id = utilService.makeId();
    return storageService.duplicatePost(NOTES_KEY ,duplicateNote, noteIdx);
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
                    backgroundColor: "lightgreen",
                    label: "משימות",
                    todos: [
                        { txt: "ללמד canvas כמה שעות לפני הספרינט", doneAt: 312312312313 },
                        { txt: "ללמד vue.js בשבוע אחד", doneAt: null },
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
                    backgroundColor: "lightpink",
                    txt: 'My life since coding academy',
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
                    backgroundColor: "lightsalmon",
                    src: "https://www.youtube.com/embed/Z3TIhMGQ_8k",
                    title: ""
                }
            },
            {
                id: "n104",
                type: "note-img",
                isPinned: false,
                info: {
                    backgroundColor: "lightpink",
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
                        { txt: "בקערה קטנה מערבבים את חומרי התיבול ומניחים בצד", doneAt: 312312312313 },
                        { txt: " מחממים את השמן במחבת גדולה ומוסיפים בצל ופלפל חריף. ...", doneAt: null },
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
                    src: 'js/apps/note/services/test.mp3',
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

function getEvPos(ev) {

    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
        xMovement: ev.movementX,
        yMovement: ev.movementY
    }
    return pos
}