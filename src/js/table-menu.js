/**
 *
 * @param photoId
 * @returns {HTMLElement}
 */
window.createImg = function (photoId) {
    let image = document.createElement('img');
    image.setAttribute('src', './img/image' + photoId + '.jpg');
    image.setAttribute('alt', 'image' + photoId);
    image.classList.add('img-fluid');
    return image;
};

/**
 *
 * @returns {HTMLElement}
 * @param text
 */
window.createHeadline = function (text) {
    let headline = document.createElement('h4');
    headline.innerHTML = text;
    return headline;
};

/**
 *
 * @returns {HTMLElement}
 * @param hmtl
 */
window.createBlock = function (hmtl) {
    let blockElement = document.createElement('div');
    blockElement.innerHTML = hmtl;
    return blockElement;
};

/**
 *
 * @returns {HTMLElement}
 * @param text
 */
window.createHeadlineH2 = function (text) {
    let headline = document.createElement('h2');
    let span = document.createElement('span');
    span.innerHTML = text;
    headline.appendChild(span);
    headline.classList.add('headline');
    headline.classList.add('headline--dotted');
    return headline;
};

/**
 *
 * @returns {HTMLElement}
 * @param text
 */
window.createText = function (text) {
    let textTag = document.createElement('p');
    textTag.innerHTML = text;
    return textTag;
};

/**
 *
 * @param object - рецепт одного блюда берется из json
 * @returns {HTMLElement}
 */
window.createBeschreibung = function (object, isPrint) {
    let popover = document.createElement('div');
    let popoverHeader = document.createElement('h3');
    let popoverBody = document.createElement('div');
    let ingredientElement = document.createElement('div');
    let ingredients = object.ingredients;
    let ingredientsHtml = '';
    let image = createImg(object.photoId);

    if (!isPrint) {
        popover.classList.add("popover");
        popover.classList.add("fade");
    } else {
        popover.classList.add("popover-print");
    }

    popoverHeader.classList.add('popover-header');

    popoverBody.classList.add('popover-body');

    popover.appendChild(popoverHeader);
    popover.appendChild(popoverBody);

    popoverHeader.innerText = object.name;

    ingredientElement.classList.add('mt-3');
    ingredientElement.classList.add('mb-3');
    ingredientElement.classList.add('ingredients');
    ingredientElement.classList.add('text-right');

    let weight = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(object, FRUESTUEK_NAME) + " g");
    weight.classList.add('d-inline');
    weight.classList.add('mr-3');

    let kallorien = createText("<i class=\"fas fa-fire-alt\"></i> " + object.relative_calories + " kcal pro 100 g");
    kallorien.classList.add('d-inline');
    kallorien.classList.add('mr-3');

    let zeit = createText("<i class=\"fas fa-hourglass-start\"></i> " + object.time + " min");
    zeit.classList.add('d-inline');
    zeit.classList.add('mr-3');

    let buttonAdd = createText("<button class='btn btn-success wunschlist-button' data-name='" + object.name + "'>Hinfügen zu Wunschlist</button>");
    buttonAdd.classList.add('d-inline');
    buttonAdd.classList.add('mr-3');

    let infoElement = createBlock(weight.outerHTML + kallorien.outerHTML + zeit.outerHTML + buttonAdd.outerHTML);
    infoElement.classList.add('mt-3');
    infoElement.classList.add('mb-3');
    infoElement.classList.add('text-center');

    let zutatenElement = createText("Zutaten");
    zutatenElement.classList.add('popover-headline');

    ingredientsHtml += zutatenElement.outerHTML;

    if (ingredients.length > 0) {
        for (let i = 0; i < ingredients.length; i++) {
            let measure = '';
            if (ingredients[i].measure !== 'n/a') {
                measure = ingredients[i].measure;
            }

            let quantity = '';
            if (ingredients[i].quantity !== 'n/a') {
                quantity = ingredients[i].quantity;
            }
            ingredientsHtml += createText(quantity + " " + measure + " " + ingredients[i].name).outerHTML;
        }
    }

    ingredientElement.innerHTML = ingredientsHtml;

    let zubereitungElement = createText("Zubereitung");
    zubereitungElement.classList.add('popover-headline');

    //object.process - процесс в рецепте, уже заисанный в HTML
    popoverBody.innerHTML = image.outerHTML + infoElement.outerHTML + ingredientElement.outerHTML + zubereitungElement.outerHTML + object.process;

    return popover;
};

/**
 *
 * @param object
 * @returns {HTMLElement}
 */
window.generateGerichtElement = function (object) {
    let image1 = createImg(object.photoId);

    let headline1 = createBlock(object.name);
    headline1.classList.add('headline');

    let process = createBeschreibung(object, false);

    let weight = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(object, FRUESTUEK_NAME) + " g");

    let kallorien = createText("<i class=\"fas fa-fire-alt\"></i> " + object.relative_calories + " kcal pro 100 g");

    let zeit = createText("<i class=\"fas fa-hourglass-start\"></i> " + object.time + " min");

    let div = createBlock(image1.outerHTML + zeit.outerHTML + weight.outerHTML + kallorien.outerHTML + headline1.outerHTML);
    div.classList.add('info-wrapper');

    let divWrapper = createBlock(div.outerHTML + process.outerHTML);
    divWrapper.classList.add('gericht');
    divWrapper.setAttribute('data-name', object.name.replace('\"', '\''));

    return divWrapper;
};

/**
 *
 * @param menuObject
 * @returns {HTMLElement}
 */
window.generateHtmlForMenu = function (menuObject) {
    let block = document.createElement('div');
    if (menuObject.length > 0) {

        let blockCol = document.createElement('div');
        let table = document.createElement('table');

        block.classList.add('row');
        block.classList.add('table');

        blockCol.classList.add('col');
        blockCol.classList.add('col-12');

        table.classList.add('table');
        table.classList.add('w-100');

        block.appendChild(blockCol);
        blockCol.appendChild(table);

        let thead = document.createElement('thead');
        let tr = document.createElement('tr');

        thead.appendChild(tr);

        let theadCell1 = tr.insertCell(0);
        theadCell1.innerHTML = "";

        let theadCell2 = tr.insertCell(1);
        theadCell2.innerHTML = "Fruhstück";
        theadCell2.classList.add('font-weight-bold');
        theadCell2.classList.add('text-center');

        let theadCell3 = tr.insertCell(2);
        theadCell3.innerHTML = "Mittagessen";
        theadCell3.classList.add('font-weight-bold');
        theadCell3.classList.add('text-center');

        let theadCell4 = tr.insertCell(3);
        theadCell4.innerHTML = "Abensessen";
        theadCell4.classList.add('font-weight-bold');
        theadCell4.classList.add('text-center');

        table.appendChild(thead);

        let tbody = document.createElement('tbody');

        let trBody;
        for (let i = 0; i < menuObject.length; i++) {
            let tag = i + 1;

            trBody = document.createElement('tr');

            let cell0 = trBody.insertCell(0);
            let cell1 = trBody.insertCell(1);
            let cell2 = trBody.insertCell(2);
            let cell3 = trBody.insertCell(3);

            let gericht1 = generateGerichtElement(menuObject[i].fruestueck1);
            let gericht2 = generateGerichtElement(menuObject[i].fruestueck2);
            let gericht3 = generateGerichtElement(menuObject[i].fruestueck3);

            let gericht4 = generateGerichtElement(menuObject[i].mittag1);
            let gericht5 = generateGerichtElement(menuObject[i].mittag2);
            let gericht6 = generateGerichtElement(menuObject[i].mittag3);

            let gericht7 = generateGerichtElement(menuObject[i].abend1);
            let gericht8 = generateGerichtElement(menuObject[i].abend2);
            let gericht9 = generateGerichtElement(menuObject[i].abend3);

            cell0.innerHTML = "Tag " + (tag);
            cell0.classList.add('w-10');
            cell0.classList.add('font-weight-bold');
            cell0.classList.add('text-center');

            //TODO replace with different dishes
            cell1.innerHTML = gericht1.outerHTML + gericht2.outerHTML + gericht3.outerHTML;
            cell1.classList.add('w-30');
            cell1.classList.add('menu-item');
            cell1.classList.add('fruestuek');

            cell2.innerHTML = gericht4.outerHTML + gericht5.outerHTML + gericht6.outerHTML;
            cell2.classList.add('w-30');
            cell2.classList.add('menu-item');
            cell2.classList.add('mittag');

            cell3.innerHTML = gericht7.outerHTML + gericht8.outerHTML + gericht9.outerHTML;
            cell3.classList.add('w-30');
            cell3.classList.add('menu-item');
            cell3.classList.add('abend');

            tbody.appendChild(trBody);
        }

        table.appendChild(tbody);

    }


    return block;
};

/**
 *
 * @param menuObject
 * @returns {HTMLElement}
 */
window.generateHtmlForPrintMenu = function (menuObject) {
    let block = document.createElement('div');
    if (menuObject.length > 0) {

        let blockCol = document.createElement('div');
        let table = document.createElement('table');

        block.classList.add('row');
        block.classList.add('table');

        blockCol.classList.add('col');
        blockCol.classList.add('col-12');

        table.classList.add('table');
        table.classList.add('w-100');

        block.appendChild(blockCol);
        blockCol.appendChild(table);

        let tbody = document.createElement('tbody');

        let trBody;
        for (let i = 0; i < menuObject.length; i++) {
            let tag = i + 1;

            trBody = document.createElement('tr');

            let cell0 = trBody.insertCell(0);

            let innerTable = document.createElement('table');

            for (let zeitName in menuObject[i]) {
                let innerTr = document.createElement('tr');
                let innerCell0 = innerTr.insertCell(0);
                let innerCell1 = innerTr.insertCell(1);

                let innerImage = createImg(menuObject[i][zeitName].photoId);
                let innerHeadline = createHeadline(menuObject[i][zeitName].name);
                let innerWeight = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(menuObject[i][zeitName], zeitName) + " g");
                let innerKallorien = createText("<i class=\"fas fa-fire-alt\"></i> " + menuObject[i][zeitName].relative_calories + " kcal pro 100 g");
                let innerZeit = createText("<i class=\"fas fa-hourglass-start\"></i> " + menuObject[i][zeitName].time + " min");
                let innerProcess = createBeschreibung(menuObject[i][zeitName], true);

                let title = "Fruhstück";

                switch (zeitName) {
                    case "fruestueck":
                        title = 'Fruhstück';
                        break;
                    case "abend":
                        title = 'Abendessen';
                        break;
                    case "mittag":
                        title = 'Mittagessen';
                        break;
                }

                innerCell0.innerHTML = title + '<br>' + 'Tag ' + tag;
                innerCell0.classList.add('title-print');
                innerCell0.classList.add('font-weight-bold');
                innerCell0.classList.add('text-center');

                innerCell0.classList.add('w-20');
                innerCell1.innerHTML = innerImage.outerHTML + innerHeadline.outerHTML + innerWeight.outerHTML + innerKallorien.outerHTML + innerZeit.outerHTML + innerProcess.outerHTML;
                innerCell1.classList.add('w-80');
                innerCell1.classList.add('menu-item');
                innerCell1.classList.add('fruestuek');

                innerTable.appendChild(innerTr);
            }

            cell0.innerHTML = innerTable.outerHTML;


            tbody.appendChild(trBody);
        }

        table.appendChild(tbody);

    }


    return block;
};

/**
 *
 * @param event
 */
window.showBeschreibung = function (event) {

    return false;
    let element = event.currentTarget;

    let popover = element.querySelector('.popover');

    if (popover) {
        popover.classList.add('show');
    }

    return true;
};

/**
 *
 * @param event
 */
window.hideBeschreibung = function (event) {
    return false;
    let element = event.currentTarget;

    let popover = element.querySelector('.popover');

    if (popover) {
        popover.classList.remove('show');
    }

    return true;
};

/**
 *
 */
window.addEventListenrsForMenus = function () {
    let menuItems = document.querySelectorAll('.menu-item');

    if (menuItems) {
        menuItems.forEach(function (element) {
            element.addEventListener('mouseover', showBeschreibung);
            element.addEventListener('mouseleave', hideBeschreibung);
        })
    }
};

if (menuPrint) {
    menuPrint.addEventListener('click', function (event) {
        event.preventDefault();

        window.print();

        return false;
    });
}

if (listePrint) {
    listePrint.addEventListener('click', function (event) {
        event.preventDefault();

        document.querySelector('.menu-container').style.display = 'none';
        document.querySelector('#show-menu').style.display = 'block';
        window.print();

        return false;
    });
}

let menuShow = document.getElementById('show-menu');

if (menuShow) {
    menuShow.addEventListener('click', function (event) {
        event.preventDefault();

        document.querySelector('.menu-container').style.display = 'block';
        document.querySelector('#show-menu').style.display = 'none';

        return false;
    });
}

if (listGenerate) {
    listGenerate.addEventListener('click', function (event) {
        event.preventDefault();

        if (menuObject && menuObject.length > 0) {
            let fruestuek = [];
            let mittag = [];
            let abend = [];

            for (let i = 0; i < menuObject.length; i++) {
                fruestuek.push(menuObject[i].fruestueck);
                mittag.push(menuObject[i].mittag);
                abend.push(menuObject[i].abend);
            }

            let listWrapper = document.createElement('div');
            let listWrapperCol = document.createElement('div');

            listWrapper.classList.add('row');
            listWrapperCol.classList.add('col-12');

            listWrapper.appendChild(listWrapperCol);

            let tmpList;
            tmpList = fruestuek.concat(mittag);
            tmpList = tmpList.concat(abend);

            let listOfProducts;
            listOfProducts = getListOfProducts(tmpList);

            if (listOfProducts) {
                for (let name in listOfProducts) {
                    let quantity = listOfProducts[name]['quantity'] ? listOfProducts[name]['quantity'] : '';
                    let element = createText("<span class='mr-3 custom-control-input'></span>" + name + ": " + quantity + " " + listOfProducts[name]['measure']);
                    element.classList.add('custom-control');
                    listWrapperCol.appendChild(element);
                }

                let listErgebnis = document.querySelector('.list-of-products');

                if (listErgebnis) {
                    let textContainer = listErgebnis.getElementsByClassName('result-text')[0];

                    if (textContainer) {
                        textContainer.innerHTML = listWrapper.outerHTML;
                        listErgebnis.style.display = 'block';
                        listErgebnis.scrollIntoView({block: "start", behavior: "smooth"});
                    }
                }
            }
        }
        return false;
    });
}

/**
 *
 * @param object
 * @returns {Array}
 */
window.getListOfProducts = function (object) {
    let listOfProducts = [];
    if (object.length > 0) {
        for (let i = 0; i < object.length; i++) {
            if (object[i].ingredients && object[i].ingredients.length > 0) {
                let ingredients = object[i].ingredients;
                for (let j = 0; j < ingredients.length; j++) {

                    if (ingredients[j]['name'] in listOfProducts) {
                        listOfProducts[ingredients[j]['name']] = {
                            'quantity': parseInt(ingredients[j]['quantity']) + parseInt(listOfProducts[ingredients[j]['name']]['quantity']),
                            'measure': ingredients[j]['measure']
                        };
                    } else {
                        listOfProducts[ingredients[j]['name']] = {
                            'quantity': parseInt(ingredients[j]['quantity']),
                            'measure': ingredients[j]['measure']
                        };
                    }
                }
            }
        }
    }

    return listOfProducts;
};

/**
 *
 */
window.attachEventsToGerichtElements = function () {
    let gerichtElements = document.querySelectorAll('.gericht');

    if (gerichtElements.length > 0) {
        gerichtElements.forEach(function (element, key) {
            element.addEventListener('click', function (event) {
                let htmlTitle = element.querySelector('.popover-header').outerHTML;
                let htmlContent = element.querySelector('.popover-body').outerHTML;
                let popupWindow = document.querySelector('.remodal-wrapper') || null;
                let lightbox = document.querySelector('.remodal-overlay') || null;
                if (popupWindow !== null && lightbox !== null) {
                    popupWindow.querySelector('.modal-title').innerHTML = htmlTitle;
                    popupWindow.querySelector('.content').innerHTML = htmlContent;
                    popupWindow.style.display = 'block';
                    lightbox.style.display = 'block';
                }
            });
        });
    }
};

/**
 *
 * @param elementToAttach
 */
window.attachEventListenerForPopUp = function (elementToAttach) {
    elementToAttach.addEventListener('click', function (event) {
        let element = event.target;

        let parent = element.closest('.remodal') || null;

        if (parent === null || event.target.classList.contains('remodal-close')) {
            let popupWindow = document.querySelector('.remodal-wrapper') || null;
            let lightbox = document.querySelector('.remodal-overlay') || null;
            if (popupWindow !== null && lightbox !== null) {
                popupWindow.style.display = 'none';
                lightbox.style.display = 'none';
            }
        }
    });
};


let remodalWrapper = document.querySelector('.remodal-wrapper') || null;

if (remodalWrapper !== null) {
    attachEventListenerForPopUp(remodalWrapper);
}

let remodalClose = document.querySelector('.remodal-close') || null;
if (remodalClose !== null) {
    attachEventListenerForPopUp(remodalClose);
}

/**
 *
 */
window.attachEventListenerToAddButton = function () {
    let addButtons = document.querySelectorAll('.wunschlist-button');

    if(addButtons.length > 0){
        addButtons.forEach(function (buttonElement, key) {
            buttonElement.addEventListener('click', function (event) {
                let element = event.currentTarget;
                let name = element.getAttribute('data-name');
                console.log(name);
                console.log(window.btoa(name));
            });
        });
    }
};

}

