function cardComponent(data) {
    // card
    const card = document.createElement('div');
    card.className = "card";
    // video in card
    const video = document.createElement('video');
    video.className = "video";
    video.setAttribute('controls', '')
    video.src = data.videos.large.url;
    // add card image, card body , card footer to card
    card.appendChild(video);

    return card;
}

let displayData = (response) => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
    for (let photo of response.data.hits) {
        container.appendChild(cardComponent(photo));
    }
}

let errorRequest = (error) => console.error("Error request", error);
let saveKeyword = () => localStorage.setItem('searchKey', searchKeyword);
let loardKeyword = () => {
    let keyword = localStorage.getItem('searchKey');
    if (keyword === null) return 
    document.querySelector('#search').value = keyword;
    clearSearch.style.display = "";
}

let searchPhoto = (event) => {
    let keyword = document.querySelector('#search').value;
    if (keyword === "") return
    searchKeyword = keyword;

    // save
    saveKeyword();

    const key = "14001068-da63091f2a2cb98e1d7cc1d82";
    const url = "https://pixabay.com/api/videos/?key=" + key + "&q=" + keyword;
    axios(url)
        .then(displayData)
        .catch(errorRequest)

}

window.onload = () => {
    searchPhoto();
}

let removeSearchKeyWord = () => {
    localStorage.removeItem('searchKey');
    location.reload();
    clearSearch.style.display = "none";
}

// global 
let searchKeyword = "";

// container
const container = document.createElement('div');
container.className = "container";
document.body.appendChild(container);

const clearSearch = document.querySelector('#clearSearch');
clearSearch.addEventListener('click', removeSearchKeyWord);
clearSearch.style.display = "none";
const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', searchPhoto);

document.addEventListener('keyup', event => {
    clearSearch.style.display = "";
    if (event.key === "Enter") searchPhoto();
});
// loard key word

loardKeyword();