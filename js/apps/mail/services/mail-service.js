'use strict';

import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mailsDB';
_createMails();

export const mailService = {
    query,
    remove,
    save,
    get,
    getEmptyMail,
};

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    return storageService.query(MAILS_KEY);
}

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


function _setNextPrevMailId(mail) {
    return storageService.query(MAILS_KEY).then(mails => {
        const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
        mail.nextMailId = (mails[mailIdx + 1]) ? mails[mailIdx + 1].id : mails[0].id
        mail.prevMailId = (mails[mailIdx - 1]) ? mails[mailIdx - 1].id : mails[mails.length - 1].id
        return mail
    })
}

function getEmptyMail(subject = '', body = '', sentAt = '') {
    return {
        id: '',
        subject,
        body,
        isRead: false,
        sentAt,
        // to
    };
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [];
        mails.push(_createMail('subject1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet rem nulla sit consequatur odit nobis vel libero! Repellendus, quidem alias est officia veritatis, ex laudantium eius, facere excepturi impedit quaerat.', 1646215512260));
        mails.push(_createMail('subject2', 'body2', 1646215512260));
        mails.push(_createMail('subject3', 'body3', 1646215512260));
        mails.push(_createMail('subject4', 'body4', 1646215512260));
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

function _createMail(subject, body, sentAt) {
    const mail = getEmptyMail(subject, body, sentAt)
    mail.id = utilService.makeId()
    return mail;
}
