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
        currNote = _createTodoNote(note.url, note.txt)
    } else console.log('error')

    currNote.id = utilService.makeId();
    return storageService.post(NOTES_KEY, currNote);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [{
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
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
    }
}

function _createImgNote(url, title) {
    return {
        type: "note-img",
        info: {
            url,
            title
        }
    }
}

function _createTodoNote(label,txt) {
    return {
        type: "note-todos",
        info: {
            label,
            todos: [
                {txt, doneAt: new Date(Date.now())}
            ]
        }
    }
}