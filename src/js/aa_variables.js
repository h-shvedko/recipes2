window.onload = function () {
/**
 *
 * @type {HTMLElement}
 */
let formElement = document.getElementById('form');

/**
 *
 * @type {HTMLElement}
 */
let menuCalculate = document.getElementById('menu-calculate');

/**
 *
 * @type {Element}
 */
let modal = document.querySelector('.modal');

/**
 *
 * @type {Element}
 */
let lightbox = document.querySelector('.lightbox');

/**
 *
 * @type {Element}
 */
let closeModalButton = document.querySelector('.hide-modal');

/**
 *
 * @type {number}
 */
let kalories = 0;

/**
 *
 * @type {number}
 */
let fruestuckKalorien = 0;

/**
 *
 * @type {number}
 */
let mittagessenKalorien = 0;

/**
 *
 * @type {number}
 */
let abendessenKalorien = 0;

/**
 *
 */
let recipes;

/**
 *
 * @type {Array}
 */
let usedNumbers = [];

/**
 *
 */
let menuItems;

/**
 *
 * @type {HTMLElement}
 */
let listGenerate = document.getElementById('list-generation');

/**
 *
 * @type {HTMLElement}
 */
let menuPrint = document.getElementById('menu-print');

/**
 *
 * @type {HTMLElement}
 */
let listePrint = document.getElementById('liste-print');

/**
 *
 * @type {Array}
 */
let menuObject = [];
