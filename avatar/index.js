import md5 from 'js-md5';

/**
 * Returns the Avatar URL to be used for the participant.
 *
 * @param {string} [participant.avatarID] - Participant's avatar ID.
 * @param {string} [participant.email] - Participant's e-mail address.
 * @param {string} [participant.id] - Participant's ID.
 * @param {string} [avatarService.urlPrefix] - URL Prefix of the avatar service.
 * @param {string} [avatarService.urlSuffix] - URL Suffix of the avatar service.
 * @returns {string} - Avatar URL.
 */
export function getAvatarURL({ avatarID, email, id },
    { urlPrefix, urlSuffix } = {
        urlPrefix: 'https://abotars.jitsi.net/meeple/',
        urlSuffix: ''
    }) {
    return getGravatarURL(email)
        || generateAvatarURL(avatarID || id, urlPrefix, urlSuffix);
}

/**
 * Returns the Avatar URL generated from the given avatar service.
 *
 * @param {string} key - Key using which avatar has to be generated.
 * @param {string} urlPrefix - URL Prefix of the avatar service to be used.
 * @param {string} urlSuffix - URL Suffix of the avatar service to be used.
 * @returns {string}
 */
function generateAvatarURL(key, urlPrefix, urlSuffix) {
    return urlPrefix + md5.hex(key.trim().toLowerCase()) + urlSuffix;
}

/**
 * Returns the Gravatar URL of a given email id.
 *
 * @param {string} email - Email id for which we need gravatar url.
 * @returns {string} - Gravatar URL.
 */
function getGravatarURL(email) {
    const urlPrefix = 'https://www.gravatar.com/avatar/';
    const urlSuffix = '?d=wavatar&size=200';

    // If email is valid, return gravatar url.
    if (isValidEmail(email)) {
        return generateAvatarURL(email, urlPrefix, urlSuffix);
    }
}

/**
 * Returns if the email id is valid.
 *
 * @param {string} email - Email id to be checked.
 * @returns {boolean}
 */
function isValidEmail(email) {
    return email && email.indexOf('@') > 0;
}
