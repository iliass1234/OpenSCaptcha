let direction_img = document.querySelector('.direction-img');
let figure_img = document.querySelector('.figure-img');
let directions_links = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
let figure_links = ['1', '2', '3', '4', '5', '6'];
let currentIndex = 0;
let fig_index = 0;

function putImg(imgElement, name){
    imgElement.src = direction_img.src.replace(/p.\.JPG/i, `${name}.JPG`)
}

function left(){
    currentIndex--
    if(currentIndex < 0) currentIndex = 5;
    putImg(direction_img, directions_links[currentIndex]);
}

function right(){
    currentIndex++
    if(currentIndex >= 6) currentIndex = 0;
    putImg(direction_img, directions_links[currentIndex]);
}
function randomize(){
    fig_index = Math.round(Math.random() * 5);
    putImg(figure_img, figure_links[fig_index])
}

function validate(){
    let fig = figure_links[fig_index];
    let direction = directions_links[currentIndex];
    console.log(fig, direction);
    if(fig == direction[1]) alert('valid');
    else alert('wrong');
    randomize()
}


function initCaptcha (captchaDiv = 'captcha-container', init_h3_text = 'match the hand to the direction of the object and click submit:'){
    let rootDiv = document.getElementById(captchaDiv);


    // init big containers elements;
    let initialisation_section = document.createElement('div');
    let captcha_section = document.createElement('div');
    let figure_section = document.createElement('div');
    let direction_section = document.createElement('div');
    let btns_container = document.createElement('div');

    // ======================== adding clases to containers =========
    initialisation_section.classList.add('initialisation-section');
    captcha_section.classList.add('captcha-section');
    figure_section.classList.add('figure-section');
    direction_section.classList.add('direction-section');
    btns_container.classList.add('btns-container');

    // init big containers elements for validation section;
    let captcha_validation_section = document.createElement('div');
    // ================ adding classes for validation section =======
    captcha_validation_section.classList.add('captcha-validation-container');

    // elements
    let i_s_h3 = document.createElement('h3');
    i_s_h3.innerText = init_h3_text;
    let f_s_img = document.createElement('img');
    let d_s_img = document.createElement('img');
    let left_btn = document.createElement('button');
    let right_btn = document.createElement('button');
    // =================== adding clases to elements ===============
    f_s_img.classList.add('figure');
    d_s_img.classList.add('direction');
    left_btn.classList.add('direction-btn');
    left_btn.innerText = 'left';
    right_btn.classList.add('direction-btn');
    right_btn.innerText = 'right';


    // validation section btns;
    let submit_btn = document.createElement('button');
    let randomize_btn = document.createElement('button');

}

function init_imgs(){
    let figureImg = document.querySelector('.figure-section figure');
    let directionImg = document.querySelector('.direction-section direction');

    
}