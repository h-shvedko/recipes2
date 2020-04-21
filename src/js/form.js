let formErrors = [];

/**
 *
 * @type {string}
 */
const WEIBLICH_GESCHLECHT = 'weiblich';

/**
 *
 * @type {string}
 */
const MAENLICH_GESCHLECHT = 'maennlich';

/**
 *
 * @type {number}
 */
const ERGEBNIS_ZUNEHMEN = 1;

/**
 *
 * @type {number}
 */
const ERGEBNIS_ABNEHMEN = 2;

/**
 *
 * @type {number}
 */
const ERGEBNIS_BLEIBEN = 3;

/**
 *
 * @type {string}
 */
const AKTIVITAT_MANGEL = '1';

/**
 *
 * @type {string}
 */
const AKTIVITAT_MASSIGE = '2';

/**
 *
 * @type {string}
 */
const AKTIVITAT_MITTLERE = '3';

/**
 *
 * @type {string}
 */
const AKTIVITAT_SEHR_AKTIVE = '4';

/**
 *
 * @type {string}
 */
const AKTIVITAT_SPORTLER = '5';

/**
 *
 * @type {number}
 */
const FRUESTUEK_PROZENT = 30;

/**
 *
 * @type {number}
 */
const MITTAGESSEN_PROZENT = 50;

/**
 *
 * @type {number}
 */
const ABENDESSEN_PROZENT = 20;

/**
 *
 * @type {number}
 */
const MENU_300 = 300;

/**
 *
 * @type {number}
 */
const MENU_500 = 500;

/**
 *
 * @type {number}
 */
const MENU_800 = 800;

/**
 *
 * @type {string}
 */
const FRUESTUEK_NAME = 'fruestuek';

/**
 *
 * @type {string}
 */
const MITTAGESSEN_NAME = 'mittagessen';

/**
 *
 * @type {string}
 */
const ABENDESSEN_NAME = 'abendessen';

if (formElement) {
    /**
     *
     */
    formElement.addEventListener('reset', function (event) {
        let ergebnis = document.getElementsByClassName('ergebnis-container')[0];
        let speiseplanAbgrage = document.getElementsByClassName('speiseplan-anfrage')[0];
        let speiseplan = document.getElementsByClassName('menu-container')[0];
        let listErgebnis = document.querySelector('.list-of-products');

        if (ergebnis) {
            ergebnis.style.display = 'none';
            speiseplanAbgrage.style.display = 'none';
            speiseplan.style.display = 'none';
            listErgebnis.style.display = 'none';
        }
    });

    /**
     *
     */
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let formValid = validateForm(formElement);
        let formData = prepareFormData(event.target.elements);

        if (formValid) {
            kalories = calculateCalories(formData);
        }

        let ergebnissKalorien = document.querySelector('.ergebnis-container') || null;
        let speiseplanAnfrage = document.querySelector('.speiseplan-anfrage') || null;

        if (ergebnissKalorien !== null) {
            let name = formData['vorname'];

            if (kalories < 1200) {
                ergebnissKalorien.getElementsByClassName('result-text')[0].innerHTML = name + ', Sie sollen mindestens <strong>1200</strong> Kalorien pro Tag essen! Aber villeicht haben Sie etwas falsch eingegeben.'
            } else {
                ergebnissKalorien.getElementsByClassName('result-text')[0].innerHTML = name + ', Sie sollen maximal <strong>' + kalories + '</strong> Kalorien pro Tag essen!'
            }

            ergebnissKalorien.style.display = 'block';
            speiseplanAnfrage.style.display = 'block';

            let menuErgebniss = document.querySelector('.menu-container') || null;
            if(menuErgebniss !== null){
                menuErgebniss.style.display = 'none';
            }

            let einkaufsList = document.querySelector('.list-of-products') || null;
            if(einkaufsList !== null){
                einkaufsList.style.display = 'none';
            }
        }

        return false;
    });
}

/**
 * Form validation method
 * @param form - form javascript object
 * @returns {boolean}
 */
validateForm = function (form) {
    let res = true;

    return res;
};

/**
 *
 * @param aktivitaet
 * @returns {number}
 */
getAktivitaet = function (aktivitaet) {

    switch (aktivitaet) {
        case AKTIVITAT_MANGEL:
            return 1.2;
        case AKTIVITAT_MASSIGE:
            return 1.375;
        case AKTIVITAT_MITTLERE:
            return 1.55;
        case AKTIVITAT_SEHR_AKTIVE:
            return 1.725;
        case AKTIVITAT_SPORTLER:
            return 1.9;
    }
};

/**
 * Calculation of calories
 * @param formData
 * @returns {number}
 */
calculateCalories = function (formData) {
    let res = 0,
        bmr = 0,
        a, b, c, d, amr;
    let geschlecht = formData['geschlecht'] || null;
    let gewicht = formData['gewicht'] || 0;
    let alter = formData['alter'] || 0;
    let grosse = formData['grosse'] || 0;
    let aktivitaet = formData['aktivitaet'] || 0;
    let ergebnis = parseInt(formData['ergebnis']) || 0;

    if (geschlecht !== null) {
        if (geschlecht === WEIBLICH_GESCHLECHT) {
            a = 447.593;
            b = 9.247;
            c = 3.098;
            d = 4.33;
        } else {
            a = 88.362;
            b = 13.397;
            c = 4.799;
            d = 5.677;
        }

        let koeff = 1;
        switch (ergebnis) {
            case ERGEBNIS_ZUNEHMEN:
                koeff = 1.2;
                break;
            case ERGEBNIS_ABNEHMEN:
                koeff = 0.8;
                break;
        }

        bmr = (a + b * gewicht + c * grosse - d * alter) * koeff;
        amr = getAktivitaet(aktivitaet);

        res = Math.round(bmr * amr);
    }

    return res;
};

/**
 * Preparing data drom form
 * @param formElements
 * @returns {Array}
 */
prepareFormData = function (formElements) {
    let data = [];

    if (formElements) {
        let dataName, dataValue;

        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].hasAttribute('name')) {
                if (formElements[i].hasAttribute('type') && formElements[i].getAttribute('type') === 'radio'
                    && formElements[i].checked) {
                    dataName = formElements[i].getAttribute('name');
                    dataValue = formElements[i].value;
                } else if (formElements[i].hasAttribute('type') && formElements[i].getAttribute('type') !== 'radio' && formElements[i].tagName !== 'select') {
                    dataName = formElements[i].getAttribute('name');
                    dataValue = formElements[i].value;
                } else if (formElements[i].tagName.toLocaleLowerCase() === 'select') {
                    dataValue = formElements[i].options[formElements[i].selectedIndex].value;
                    dataName = formElements[i].getAttribute('name');
                }
                data[dataName] = dataValue;
            }
        }
    }

    return data;
};

/**
 * Get content from recipes files
 */
loadGerichten = function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            recipes = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "./recipes.json", false);
    xhttp.send();
};

/**
 * Generates menu table
 */
generateMenu = function () {
    fruestuckKalorien = Math.floor(kalories * FRUESTUEK_PROZENT / 100);
    mittagessenKalorien = Math.floor(kalories * MITTAGESSEN_PROZENT / 100);
    abendessenKalorien = Math.floor(kalories * ABENDESSEN_PROZENT / 100);

    let ergebnisContainer = document.getElementsByClassName('ergebnis-container')[0];
    let menuAnfrage = document.getElementsByClassName('speiseplan-anfrage')[0];

    if (ergebnisContainer) {
        let tage = menuAnfrage.querySelectorAll('.tage');
        let nummerTage = 3;

        if (tage) {
            tage.forEach(function (elem) {
                if (elem.checked) {
                    nummerTage = elem.value
                }
            });
        }
        let menuObject = getMenuObject(nummerTage);

        let htmlElement = generateHtmlForMenu(menuObject);
        let htmlElementForPrint = generateHtmlForPrintMenu(menuObject);
        let tableMenu = document.getElementsByClassName('menu-container')[0];

        if(tableMenu){
            tableMenu.style.display = 'block';
            let ergebnis = tableMenu.querySelector('.result-text.display');
            if(ergebnis){
                ergebnis.innerHTML = htmlElement.outerHTML;
                ergebnis.scrollIntoView({block: "start", behavior: "smooth"});
                addEventListenrsForMenus();
            }

            let ergebnisPrint = tableMenu.querySelector('.result-text.print');
            if(ergebnisPrint){
                ergebnisPrint.innerHTML = htmlElementForPrint.outerHTML;
            }

            attachEventsToGerichtElements();
            attachEventListenerToAddButton();
        }
    }
};

/**
 *
 * @param nummerTage
 */
getMenuObject = function (nummerTage) {
    let res = [];

    let usedNumbers;
    for (let i = 1; i <= nummerTage; i++) {
        let tmpTag = [];
        let tmpRes = [];
        for (let j = 1; j <= 9; j++) {
            let recipeObject = recipes;
            let nummerVonGerichte = recipeObject.dishes.length - 1;
            let gerichteNummer = getRandomGerichtNummer(1, nummerVonGerichte);

            tmpTag[j] = recipeObject.dishes[gerichteNummer];
        }

        usedNumbers = [];
        tmpRes['fruestueck1'] = tmpTag[1];
        tmpRes['fruestueck2'] = tmpTag[2];
        tmpRes['fruestueck3'] = tmpTag[3];
        tmpRes['mittag1'] = tmpTag[4];
        tmpRes['mittag2'] = tmpTag[5];
        tmpRes['mittag3'] = tmpTag[6];
        tmpRes['abend1'] = tmpTag[7];
        tmpRes['abend2'] = tmpTag[8];
        tmpRes['abend3'] = tmpTag[9];

        res.push(tmpRes);
    }

    menuObject = res;

    return res;
};

/**
 *
 * @param min
 * @param max
 * @returns {*}
 */
getRandomNummer = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param min
 * @param max
 * @returns {*}
 */
getRandomGerichtNummer = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let nummer = Math.floor(Math.random() * (max - min + 1)) + min;

    //TODO increase number of dishes and activate this again
    // if(usedNumbers.includes(nummer)){
    //     nummer = getRandomGerichtNummer(min, max);
    // }
    //
    // usedNumbers.push(nummer);

    return nummer;
};

if (menuCalculate) {
    /**
     *
     */
    menuCalculate.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let einkaufsList = document.querySelector('.list-of-products') || null;
        if(einkaufsList !== null){
            einkaufsList.style.display = 'none';
        }

        loadGerichten();

        generateMenu();

        return false;
    });
}

/**
 *
 * @param gerichtObject - рецепт одного блюда берется из json
 * @param type
 * @returns {number}
 */
window.getGerichteWeight = function (gerichtObject, type) {
    let weight = 0;

    /**
     * подсчет коефициента на каждый прием пищи
     * кол-во каллорий на завтрак = дневная норма каллорий умноженная на процент необходимый для завтрака (30%)
     */
    let frueschtuek = kalories * FRUESTUEK_PROZENT / 100;
    let mittag = kalories * MITTAGESSEN_PROZENT / 100;
    let abend = kalories * ABENDESSEN_PROZENT / 100;

    //Кол-во каллорий на одну порцию
    let kaloriesProPorzionGramm = gerichtObject.calories;

    //рассчитываем коэфициент для каждого приема пищи, для корректировки веса одной порции блюда
    let koefficientFruestuek = frueschtuek / kaloriesProPorzionGramm;
    let koefficientMittag = mittag / kaloriesProPorzionGramm;
    let koefficientAbend = abend / kaloriesProPorzionGramm;

    //расчитывем вес одной порции блюда в зависимости от коэфициента веса и время приема пищи
    switch (type) {
        case FRUESTUEK_NAME:
            weight = Math.round(gerichtObject.weight * koefficientFruestuek);
            break;
        case ABENDESSEN_NAME:
            weight = Math.round(gerichtObject.weight * koefficientAbend);
            break;
        case MITTAGESSEN_NAME:
            weight = Math.round(gerichtObject.weight * koefficientMittag);
            break;
    }

    return weight;
};

