let $captcha_direction_img_prefix = null;
let $captcha_figure_img_prefix = null;
let $captcha_curr_index = 0;

let $captcha_figure_imgs_list = [];


function changeCaptchaDirectionImg(imgPrefix, imgNum){
    document.querySelector('.captcha-container .direction-img').src = $captcha_direction_img_prefix+imgNum+'.jpg';
}

function captcha_left(){
    $captcha_curr_index--
    if($captcha_curr_index < 0) $captcha_curr_index = 5;
    changeCaptchaDirectionImg($captcha_direction_img_prefix, $captcha_curr_index);
}

function captcha_right(){
    $captcha_curr_index++
    if($captcha_curr_index >= 6) $captcha_curr_index = 0;
    changeCaptchaDirectionImg($captcha_direction_img_prefix, $captcha_curr_index);
}
function randomize(){
    fig_index = Math.round(Math.random() * 5);
    changeCaptchaDirectionImg(figure_img, figure_links[fig_index])
}

function validate(){
    let fig = figure_links[fig_index];
    let direction = directions_links[$captcha_curr_index];
    console.log(fig, direction);
    if(fig == direction[1]) alert('valid');
    else alert('wrong');
    randomize()
}



function initCaptchaV1 (captchaDiv = 'captcha-root', init_h3_text = 'match the hand to the direction of the object and click submit:'){

    let rootDiv = document.getElementById(captchaDiv);


    // init big containers elements;
    let captcha_inner_container = document.createElement('div');
    let initialisation_section = document.createElement('div');
    let captcha_section = document.createElement('div');
    let figure_section = document.createElement('div');
    let direction_section = document.createElement('div');
    let btns_container = document.createElement('div');

    // ======================== adding clases to containers =========
    captcha_inner_container.classList.add('captcha-container');
    initialisation_section.classList.add('initialisation-section');
    captcha_section.classList.add('captcha-sections');
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
    f_s_img.classList.add('figure-img');
    d_s_img.classList.add('direction-img');
    left_btn.classList.add('direction-btn');
    left_btn.innerText = 'left';
    right_btn.classList.add('direction-btn');
    right_btn.innerText = 'right';


    // validation section btns;
    let submit_btn = document.createElement('button');
    submit_btn.innerText = 'Submit';
    submit_btn.classList.add('validation-section-btn');


    // adding events ===============================================
    left_btn.addEventListener('click', captcha_left);
    right_btn.addEventListener('click', captcha_right);
    submit_btn.addEventListener('click', submitButtonHandler);


    // adding elements to containers :
    initialisation_section.appendChild(i_s_h3);

    figure_section.appendChild(f_s_img);
    btns_container.append(left_btn, right_btn)
    direction_section.append(d_s_img, btns_container);


    captcha_section.append(figure_section, direction_section);


    captcha_validation_section.append(submit_btn);
    captcha_inner_container.append(initialisation_section, captcha_section);

    rootDiv.append(captcha_inner_container, captcha_validation_section);

    init_imgs();
}

function submitButtonHandler(){
    fetch('http://127.0.0.1:3000/check_captcha', {
        method: 'POST', 
        body: JSON.stringify({firstImg: 'hello.jpg', secondImg: 'welcome.jpg'}),
        mode: 'cors'    
    }).then(res => res.json())
    .then(data => console.log(data))
}


initCaptchaV1();

function init_imgs(){
    let figureImg = document.querySelector('.figure-section .figure-img');
    let directionImg = document.querySelector('.direction-section .direction-img');

    let randImgNum1 = 5 ;// Math.round(Math.random() * 5);
    let randImgNum2 = Math.round(Math.random() * 5);

    $captcha_curr_index = randImgNum1;

    fetch('../../dummyEndPoint.json')
    .then(res => res.json())
    .then(data => {

        $captcha_direction_img_prefix = data.initDirectionsImgPrefix;
        $captcha_figure_imgs_list = data.initFigureImgsList;

        directionImg.src = data.initDirectionsImgPrefix+randImgNum1+'.jpg';
        figureImg.src = data.initFigureImgsPath + data.initFigureImgsList[randImgNum2]+'.jpg';
    });
}