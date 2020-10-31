'use strict';

import refs from './refs';
import contacts from '../contacts.json';

// Contacts List
import headerContactsListTemplate from '../templates/contactsList/headerContactsList.hbs';
import contactsListTemplate from '../templates/contactsList/contactsList.hbs';

// Contacts Details
import headerContactsDetailsTemplate from '../templates/contactsDetails/headerContactsDetails.hbs';
import contactsDetailsTemplate from '../templates/contactsDetails/contactsDetails.hbs';

// Contact Info
import headerContactInfoTemplate from '../templates/contactInfo/headerContactInfo.hbs';
import contactInfoTemplate from '../templates/contactInfo/contactInfo.hbs';

// Sync code

startingPage();

// Functions

function startingPage () {
  addClassVisuallyHidden(refs.contactInfo);
  buildContactsListMarkup(contacts, contactsListTemplate, headerContactsListTemplate, refs.contactsList);
  const contactsListItem = document.querySelectorAll('li.contactsList__item');
  contactsListItem.forEach(item => item.addEventListener("click", openContactsDetails));
};

function buildDetailsInfo (id) {
  clearMarkup(refs.contactInfo);
  addActiveClassToContact("li", id);

  const currentContact = findContactById(contacts, id);
  buildInfoMarkup(currentContact.details, contactInfoTemplate, headerContactInfoTemplate, refs.contactInfo);

  const closeButton = document.querySelector('button.contactInfo__item_button');
  closeButton.addEventListener('click', closeContactDetails);
};

// Build markup functions

function buildContactsListMarkup(contactItems, contactsTemplate, headerTemplate, element) {
  clearMarkup(element);
  const headerMarkup = headerTemplate();
  const mainMarkup = contactItems.map(contactItem => contactsTemplate(contactItem)).join('');
  const markup = headerMarkup + mainMarkup;
  element.insertAdjacentHTML('beforeend', markup);
};

function buildInfoMarkup (contactItem, contactsTemplate, headerTemplate, element) {
  removeClassVisuallyHidden(refs.contactInfo);
  const headerMarkup = headerTemplate();
  const mainMarkup = contactsTemplate(contactItem);
  const markup = headerMarkup + mainMarkup;
  element.insertAdjacentHTML('beforeend', markup);
};

// Event functions

function openContactsDetails(e) {
  e.preventDefault();
  const currentId = Number(e.currentTarget.dataset.id);
  if (!currentId) {
    return;
  };
  clearMarkup(refs.contactsList);
  buildContactsListMarkup(contacts, contactsDetailsTemplate, headerContactsDetailsTemplate, refs.contactsDetails);
  buildDetailsInfo(currentId);
  const contactsList = document.querySelectorAll('li.contactsDetailsList__item');
  contactsList.forEach(item => item.addEventListener("click", openContactsDetails));
};

function closeContactDetails(e) {
  e.preventDefault();
  clearMarkup(refs.contactInfo);
  clearMarkup(refs.contactsDetails);
  startingPage();
};

// Help functions

function clearMarkup(element) {
  element.innerHTML = '';
};

function addClassVisuallyHidden (element) {
  element.classList.add('visually-hidden');
};

function removeClassVisuallyHidden (element) {
  element.classList.remove('visually-hidden');
};

function addActiveClassToContact (elTag,id) {
  const activeContact = document.querySelector(`${elTag}[data-id="${id}"]`);
  activeContact.classList.add('active');
};

function findContactById(arr ,id) {
  return arr.find(item => item.id === id);
};





