'use strict';

import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mailsDB';
// const SENT_MAILS_KEY = 'sentMailsDB';
_createMails();

export const mailService = {
    query,
    remove,
    save,
    get,
    getEmptyMail,
    sendMail,
    createDraft,
    // querySentMails,
};

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    return storageService.query(MAILS_KEY);
}

// function querySentMails(){
//     return storageService.query(SENT_MAILS_KEY);
// }

function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (mail.isTrashed) {
                return storageService.remove(MAILS_KEY, mailId);
            }
            mail.isTrashed = true
            console.log(mail);
            save(mail)
        })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
        .then(mail => {
            return _setNextPrevMailId(mail)
        })
}

function save(mail) {
    // console.log('saved');
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
}

function sendMail(message) {
    // console.log(message.subject);
    const mail = _createMail(message.subject, message.body, Date.now(), message.to, true, false)
    console.log(mail.subject);
    return storageService.post(MAILS_KEY, mail);
}

function createDraft(message) {
    const draft = _createMail(message.subject, message.body, Date.now(), message.to, false, false, true)
    return storageService.post(MAILS_KEY, draft);
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAILS_KEY).then(mails => {
        const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
        mail.nextMailId = (mails[mailIdx + 1]) ? mails[mailIdx + 1].id : mails[0].id
        mail.prevMailId = (mails[mailIdx - 1]) ? mails[mailIdx - 1].id : mails[mails.length - 1].id
        return mail
    })
}

function getEmptyMail(subject = '', body = '', sentAt = '', to = '', isRead = false, isInbox = true, isDraft = false) {
    return {
        id: '',
        subject,
        body,
        sentAt,
        to,
        isRead,
        isInbox,
        isStarred: false,
        isTrashed: false,
        isDraft,
    };
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [];
        mails.push(_createMail('asubject1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet rem nulla sit consequatur odit nobis vel libero! Repellendus, quidem alias est officia veritatis, ex laudantium eius, facere excepturi impedit quaerat.', 1646215512260));
        mails.push(_createMail('csubject2', 'body2', 1646215512260));
        mails.push(_createMail('bsubject3', 'body3', 1646215512260));
        mails.push(_createMail('fsubject4', 'body4', 1646215512260));
        mails.push(_createMail('esubject5', 'body5', 1646273854871));
        mails.push(_createMail('dsubject6', 'body6', 1616211177545));
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

function _createMail(subject, body, sentAt, to, isRead, isInbox, isDraft) {
    const mail = getEmptyMail(subject, body, sentAt, to, isRead, isInbox, isDraft)
    mail.id = utilService.makeId()
    return mail;
}
