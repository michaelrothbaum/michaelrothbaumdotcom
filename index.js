// index.js
(() => {
  'use strict';

  // Anniversary helper
  const anniversaryDate = new Date('2020-08-09');
  function getAnniversaryDescription() {
    const now = new Date();
    const month = anniversaryDate.getMonth(),
          day   = anniversaryDate.getDate();
    const thisYr = new Date(now.getFullYear(), month, day);
    let last, next;
    if (now >= thisYr) {
      last = thisYr;
      next = new Date(now.getFullYear()+1, month, day);
    } else {
      last = new Date(now.getFullYear()-1, month, day);
      next = thisYr;
    }
    const years = last.getFullYear() - anniversaryDate.getFullYear();
    const halfMs = (next - last)/2;
    return (next - now <= halfMs)
      ? `I've been married to the love of my life for almost ${years+1} years.`
      : `I've been married to the love of my life for over ${years} years.`;
  }

const parentsAnniversaryDate = new Date('1980-03-30');

function getParentsYearsMarried() {
  const now = new Date();
  let years = now.getFullYear() - parentsAnniversaryDate.getFullYear();

  // If today is before this year’s anniversary, subtract one
  const thisYearAnniv = new Date(
    now.getFullYear(),
    parentsAnniversaryDate.getMonth(),
    parentsAnniversaryDate.getDate()
  );
  if (now < thisYearAnniv) {
    years--;
  }

  return years;
}

// Usage:
const yearsMarried = getParentsYearsMarried();

  // Data
  const textValues = [
    { title:"Michael",           description:"I was born and raised in Closter, NJ. I graduated from NYU." },
    { title:"a Product Manager", description:'I\'m currently a Senior Product Manager at Thoropass. <a href="https://www.linkedin.com/in/michaelrothbaum/" target="_blank">Check out my Linked<span id="in">in</span></a>' },
    { title:"a father",          description:"I have a beautiful baby girl whom I love with all my heart." },
    { title:"a husband",         description:getAnniversaryDescription() },
    { title:"a brother",         description:"I'm the youngest of 3, with an older brother and an older sister." },
    { title:"a son",               description: `I have two loving and supportive parents who've been married ${yearsMarried} years.`
 }
  ];

  // Refs
  let currentIndex = 0;
  const introTextEl   = document.getElementById('intro-text');
  const toggleListBtn = document.getElementById('toggle-list');
  const infoBtn       = document.getElementById('info');
  const descEl        = document.getElementById('description');
  const optionsList   = document.getElementById('options-list');

  // Helpers
  function setTitle() {
    introTextEl.textContent = textValues[currentIndex].title;
  }
  function setDescription() {
    descEl.innerHTML = textValues[currentIndex].description;
  }
  function hideDescription() {
    descEl.hidden = true;
  }
  function hideList() {
    optionsList.classList.remove('expanded');
    toggleListBtn.innerHTML = '<i class="bi bi-arrow-down-circle-fill"></i>';
  }

  // Actions
  function goNext() {
    currentIndex = (currentIndex + 1) % textValues.length;
    setTitle();
    if (!descEl.hidden) {
      setDescription();
    } else {
      hideList();
    }
  }
  function goPrev() {
    currentIndex = (currentIndex - 1 + textValues.length) % textValues.length;
    setTitle();
    if (!descEl.hidden) {
      setDescription();
    } else {
      hideList();
    }
  }
  function toggleList() {
    hideDescription();
    const isExpanded = optionsList.classList.toggle('expanded');
    toggleListBtn.innerHTML = isExpanded
      ? '<i class="bi bi-arrow-up-circle-fill"></i>'
      : '<i class="bi bi-arrow-down-circle-fill"></i>';
  }
  function toggleDescription() {
    if (descEl.hidden) {
      hideList();
      setDescription();
      descEl.hidden = false;
    } else {
      hideDescription();
    }
  }

  // Wire up
  introTextEl.addEventListener('click', goNext);
  toggleListBtn.addEventListener('click', toggleList);
  infoBtn.addEventListener('click', toggleDescription);

  optionsList.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      currentIndex = Array.from(optionsList.children).indexOf(e.target);
      setTitle();
      toggleDescription();
    }
  });

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowRight': goNext();       break;
      case 'ArrowLeft':  goPrev();       break;
      case 'Enter':      toggleDescription(); break;
      case 'Escape':
        hideDescription();
        hideList();
        break;
    }
  });

  // Init
  setTitle();
  hideDescription();
  hideList();
})();
