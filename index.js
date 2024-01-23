const textValues = [
    {
        title: "Michael",
        description: "I was born and raised Closter, NJ. I graduated from NYU."
    },
    {
        title: "a Product Manager",
        description: 'I\'ve worked at Meta, <span id=wm>WorkMarket</span>, Namely, and Ultimate Software. <a href="https://www.linkedin.com/in/michaelrothbaum/" target="_blank">Check out my Linked<span id="in">in</span></a>'
    },
    {
        title: "a father",
        description: "I have a beautiful baby girl whom I love with all my heart."
    },
    {
        title: "a husband",
        description: "I've been married to the love of my life for over 3 years."
    },
    {
        title: "a brother",
        description: "I'm the youngest of 3, with an older brother and an older sister."
    },
    {
        title: "a son",
        description: "I have two loving and supportive parents who have been married for 43 years."
    },
];

let currentIndex = 0;
const introduction = document.getElementById("intro");
const greeting = document.getElementById("greeting");
const clickableText = document.getElementById("clickable-text");
const seeMore = document.getElementById("more");
const infoText = document.getElementById("information-text");
const goBackSection = document.getElementById("go-back-section");
const backArrow = document.getElementById("back-arrow");
const allOptions = document.getElementById("all-options");
const showAndHide = document.getElementById("show-and-hide")
const period = document.getElementById("period")
const arrayOfOptions = [];

const changeText = function () {
    currentIndex = (currentIndex + 1) % textValues.length;
    clickableText.innerHTML = textValues[currentIndex].title;
};

const changeTextUp = function () {
    currentIndex = (currentIndex - 1 + textValues.length) % textValues.length;
    clickableText.innerHTML = textValues[currentIndex].title;

};

clickableText.addEventListener('click', changeText)

const goUp = function (e) {
    if (e.key === "ArrowUp") {
        changeTextUp();
    }
}

const goDown = function (e) {
    if (e.key === "ArrowDown") {
        changeText();
    }
}

document.addEventListener('keydown', goDown);

document.addEventListener('keydown', goUp);

let descriptionShown = false

const showDescription = function () {
    const addedDescription = document.createElement("p");
    addedDescription.innerHTML = textValues[currentIndex].description;
    addedDescription.id = "added-description";
    infoText.appendChild(addedDescription);
    clickableText.removeEventListener('click', changeText);
    seeMore.style.cursor = 'default';
    infoText.style.backgroundImage = 'linear-gradient(to bottom right, #ffeeed, #fff8f7)';
    addedDescription.style.margin = '16px'
    /*infoText.style.animationName = 'GFG';
    infoText.style.animationDuration = '0.3s';
    infoText.style.animationFillMode = 'forwards';
    infoText.style.fontSize = '2px';
    infoText.style.boxShadow = '3px 3px red'
    infoText.style.border = '2px solid black'*/
    backArrow.innerHTML = '<i class="bi bi-arrow-left-circle-fill"></i>';
    seeMore.removeEventListener('click', showDescription);
    document.removeEventListener('keydown', enterDescription)
    descriptionShown = true
    document.removeEventListener('keydown', goUp);
    document.removeEventListener('keydown', goDown);
};

const enterDescription = function (e) {
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
        showDescription();
    }
}

seeMore.addEventListener('click', showDescription);
document.addEventListener('keydown', enterDescription)
let namesDisplayed = false;

const toggleNames = function () {
    if (namesDisplayed) {
        const allOptions = document.getElementById('all-options');
        allOptions.innerHTML = '';
        namesDisplayed = false;
        showAndHide.innerHTML = '<i class="bi bi-arrow-down-circle-fill">';
    } else {
        const namesList = document.createElement('ul');
        textValues.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = item.title;
            listItem.addEventListener('click', () => {
                if (descriptionShown) {
                    currentIndex = index;
                    updateClickableText(item.title);
                    goBack();
                    showDescription(item.title);
                    currentIndex = index;

                } else {
                    updateClickableText(item.title);
                    currentIndex = index;
                }

            });
            namesList.appendChild(listItem);
        });
        const container = document.getElementById('all-options');
        container.appendChild(namesList);
        namesDisplayed = true;
        showAndHide.innerHTML = '<i class="bi bi-arrow-up-circle-fill">';
    }
};

function updateClickableText(newText) {
    clickableText.innerHTML = newText;
}

showAndHide.addEventListener('click', toggleNames);

const goBack = function () {
    infoText.innerHTML = '';
    backArrow.innerHTML = '';
    infoText.style.backgroundImage = '';
    infoText.style.boxShadow = '';
    infoText.style.border = '';
    seeMore.addEventListener('click', showDescription);
    clickableText.addEventListener('click', changeText)
    descriptionShown = false
    document.addEventListener('keydown', goDown);
    document.addEventListener('keydown', goUp);
    document.addEventListener('keydown', enterDescription)
};

const escClear = function (e) {
    if (e.key === 'Escape') {
        goBack();
        if (namesDisplayed) { toggleNames(); }
    }

}

const leftArrowBack = function (e) {
    if (e.key === 'ArrowLeft') {
        goBack();
    }

}

backArrow.addEventListener('click', goBack);
document.addEventListener('keydown', escClear)
document.addEventListener('keydown', leftArrowBack)

console.log("Pardon any quirks, I'm a newbie who built this from scratch myself :)")