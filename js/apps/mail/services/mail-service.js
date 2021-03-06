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
    sendMail,
    createDraft,
};

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    return storageService.query(MAILS_KEY);
}


function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (mail.isTrashed) {
                return storageService.remove(MAILS_KEY, mailId);
            }
            mail.isChecked = false
            console.log('not check enymore', mail.id, mail.isChecked);
            mail.isTrashed = true
            return save(mail)
                .then(mail => {
                    console.log('is saved', mail)
                    return mail
                })
        })


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
    const mail = _createMail(message.subject, message.body, Date.now(), 'me', message.to, true, false)
    console.log(mail.subject);
    return storageService.post(MAILS_KEY, mail);
}

function createDraft(message) {
    const draft = _createMail(message.subject, message.body, Date.now(), 'me', message.to, false, false, true)
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

function getEmptyMail(subject = '', body = '', sentAt = '', from = '', to = '', isRead = false, isInbox = true, isDraft = false, isStarred = false) {
    return {
        id: '',
        subject,
        body,
        sentAt,
        from,
        to,
        isRead,
        isInbox,
        isStarred,
        isTrashed: false,
        isDraft,
        isChecked: false
    };
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = [];
        mails.push(_createMail('Finding the undercover practitioner', 'Matan please expose who we need to be watched from!!!!', 1646510182408, 'The students', 'Matan', true, false, false, false));
        mails.push(_createMail('For Rotem', 'Thank you for giving us motivation and support during the sprint! much love!', 1646509608992, 'Roy & Sapir', 'Rotem', false, true, false, true));
        mails.push(_createMail('Sprint 3', '???? ??????????????????????!!!!!!!!!!1', 1646509658992,  'Furman', 'Roy & Sapir',true, true, false, true));
        mails.push(_createMail('For Roy ', ' You did really good job!! YOU ARE THE BEST CO that I could ask for ????  ', 1646352375050, 'Me', 'me'));
        mails.push(_createMail('Check your McAfee report now!', 'Your protection at work This is your monthly security report Thank you for letting us keep you safe.', 1646273854871, 'McAfee', 'me'));
        mails.push(_createMail('Sign in to CSSBattle', 'We received a request to sign in to CSSBattle using this email address. If you want to sign in with your user@appsus.com account, click this link: Sign in to CSSBattle If you did not request this link, you can safely ignore this email. Thanks, Your CSSBattle team', 1646215582260, 'CSSBattle', 'me'));
        mails.push(_createMail('New messages from Matan Crispel', ' hey, We deleted your folders in Dropbox by Thursday. please don\'t forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX', 1646215512260, 'DROPBOX', 'me'));
        mails.push(_createMail('CSSBattle', 'please join me to CSSBattle ???????????? \n Roy ', 1646215512260, 'Roy', 'me'));
        mails.push(_createMail('Your acceptance on order google API', 'Order Number:6424-7519-71   Subtotal:130$ for useing google maps API ', 1646215512260, 'GoogleAPI', 'me'));
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

function _createMail(subject, body, sentAt, from, to, isRead, isInbox, isDraft, isStarred) {
    const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, isInbox, isDraft, isStarred)
    mail.id = utilService.makeId()
    return mail;
}
