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
    return storageService.remove(MAILS_KEY, mailId);
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
        .then(mail => {
            return _setNextPrevMailId(mail)
        })
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
}

function sendMail(message) {
    const mail = _createMail(message.subject, message.body, Date.now(), message.to, false)
    return storageService.post(MAILS_KEY, mail);
}


function _setNextPrevMailId(mail) {
    return storageService.query(MAILS_KEY).then(mails => {
        const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
        mail.nextMailId = (mails[mailIdx + 1]) ? mails[mailIdx + 1].id : mails[0].id
        mail.prevMailId = (mails[mailIdx - 1]) ? mails[mailIdx - 1].id : mails[mails.length - 1].id
        return mail
    })
}

function getEmptyMail(subject = '', body = '', sentAt = '', to = '', isInbox = true) {
    return {
        id: '',
        subject,
        body,
        sentAt,
        to,
        isRead: false,
        isInbox,
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

function _createMail(subject, body, sentAt, to, isInbox) {
    const mail = getEmptyMail(subject, body, sentAt, to, isInbox)
    mail.id = utilService.makeId()
    return mail;
}
