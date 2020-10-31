
import contacts from '../contacts.json';

// Contacts List Templates
import contactsListHeaderTemplate from '../templates/contactsList/contactsListHeader.hbs';
import contactsListTemplate from '../templates/contactsList/contactList.hbs';

// Contacts Details Templates
import headerContactsDetailsTemplate from '../templates/contactsDetails/headerContactsDetails.hbs';
import contactsDetailsTemplate from '../templates/contactsDetails/contactsDetails.hbs';

// Contact Info Templates
import headerContactInfoTemplate from '../templates/contactInfo/headerContactInfo.hbs';
import contactInfoTemplate from '../templates/contactInfo/contactInfo.hbs'

$(document).ready(function () {
  startingPage();
});

// Functions

function startingPage() {
  $('#contactInfo').hide()
  buildContactsListMarkup(contacts, contactsListTemplate, contactsListHeaderTemplate, '#contactsList');
  $('tr.contactsList__item').on('click', openContactsDetails);

};

function buildDetailsInfo (id) {
  clearMarkup("#contactInfo");
  addActiveClassToElement('li', id);

  const currentContact = findContactById(contacts, id);
  buildInfoMarkup(currentContact.details, contactInfoTemplate, headerContactInfoTemplate, "#contactInfo")
  $('button.contactInfo__item_button').on('click', closeContactDetails)
};

// Build markup functions

function buildContactsListMarkup (contactItems, contactsTemplate, headerTemplate, selector) {
  clearMarkup(selector);
  const headerMarkup = headerTemplate();
  const mainMarkup = contactItems.map(contactItem => contactsTemplate(contactItem)).join('');
  const markup = headerMarkup + mainMarkup;
  insertMarkup(selector, markup);
};

function buildInfoMarkup (contactItem, contactsTemplate, headerTemplate, selector) {
  $(selector).show()
  const headerMarkup = headerTemplate();
  const mainMarkup = contactsTemplate(contactItem);
  const markup = headerMarkup + mainMarkup;
  insertMarkup(selector, markup);
};

// Event functions

function openContactsDetails(e) {
  e.preventDefault();
  const currentId = Number($(this).attr('data-id'));
  if (!currentId) {
    return;
  };
  clearMarkup($('#contactsList'));
  buildContactsListMarkup(contacts, contactsDetailsTemplate, headerContactsDetailsTemplate, '#contactsDetails');
  buildDetailsInfo(currentId);
  $('li.contactsDetailsList__item').on('click', openContactsDetails)
};

function closeContactDetails(e) {
  e.preventDefault();
  clearMarkup("#contactInfo");
  clearMarkup("#contactsDetails");
  startingPage();
};

// Help functions

function clearMarkup(selector) {
  $(selector).empty();
};

function insertMarkup(selector, markup) {
  $(selector).html(markup);
};

function addActiveClassToElement (elementTag, id) {
  const element = $(`${elementTag}[data-id="${id}"]`)
  element.addClass('active')
}

function findContactById(arr ,id) {
  return arr.find(item => item.id === id);
};

