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