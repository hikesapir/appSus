import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';

_createNotes();

export const noteService = {
    query,
    get,
    save,
    remove,
    newNote
};

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
        currNote = _createTodoNote(note.url, note.txt);
    } else if (note.type === 'note-video') {
        console.log('ger here');
        currNote = _createVidNote(note.src, note.txt);
    } else console.log('error');

    currNote.id = utilService.makeId();
    return storageService.post(NOTES_KEY, currNote);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-todos",
                info: {
                    label: "משימות",
                    todos: [
                        { txt: "ללמד canvas כמה שעות לפני הספרינט", doneAt: 312312312313 },
                        { txt: "ללמד vue.js בשבוע אחד", doneAt: null },
                        { txt: "", doneAt: null },
                    ]
                }
            },
            
            {
                id: "n102",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לפרומי בלוף־קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה ש”יצמה ברורק“. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. ושבעגט לבם סולגק. בראיט ולחת צורק מונחף, בגורמי מג׳מש. תרבנך וסתעד לכנו סתשם השמה – לתכי מורגם בורק? לתיג ישבעס."
                    
                }
            },
            {
                id: "n103",
                type: "note-video",
                info: {
                    src: "https://www.youtube.com/embed/nhBVL41-_Cw",
                    title: ""
                }
            },

            {
                id: "n104",
                type: "note-img",
                info: {
                    url: "https://i0.wp.com/www.tals-cooking.com/wp-content/uploads/2008/06/DSC3843-3-scaled.jpg?resize=1024%2C683&ssl=1",
                    title: "במיה ברוטב עגבניות"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n105",
                type: "note-video",
                info: {
                    src: "https://www.youtube.com/embed/Z3TIhMGQ_8k",
                    title: ""
                }
            },
            {
                id: "n106",
                type: "note-todos",
                info: {
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


            }
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
                { txt, doneAt: new Date(Date.now()) }
            ]
        }
    };
}

// _createVidNote('https://www.youtube.com/watch?v=ozj4T5M5GTk&ab_channel=KitchenNightmares', 'meow')

function _createVidNote(src, title) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = src.match(regExp);

    const id = (match && match[2].length === 11) ? match[2] : null;

    const newSrc = `https://www.youtube.com/embed/${id}`;
    console.log(newSrc);

    return {
        type: "note-video",
        info: {
            src: newSrc,
            title
        }
    };
}