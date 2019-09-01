const LIMIT = 100;
let currentPage = 1;
let maxPage, images;

const makePageNav = (_images) => {
    images = _images;

    $("#pagenav").empty();
    $("#imagescount").text(`${images.length}枚の画像`);
    if (images.length == 0) { return; }
    maxPage = Math.floor(images.length / LIMIT);
    if (images.length % LIMIT != 0) { maxPage++ };

    $("#pagenav").append(`
        <li class="page-item" id="firstpage">
            <a class="page-link" href="#" aria-label="First" onclick="setPage('first')">
                <span aria-hidden="true">最初</span>
            </a>
        </li>
        <li class="page-item" id="prevpage">
            <a class="page-link" href="#" aria-label="Previous" onclick="setPage('prev')">
                <span aria-hidden="true">&lt;</span>
            </a>
        </li>
    `)

    for (let i = 1; i <= maxPage; i++) {
        if (i == currentPage) {
            $("#pagenav").append(`<li class="page-item disabled"><a class="page-link" href="#" id="pagenum">${i}</a></li>`)
        } else {
            $("#pagenav").append(`<li class="page-item"><a class="page-link" href="#" id="pagenum" onclick="setPage(${i})">${i}</a></li>`)
        }
    }

    $("#pagenav").append(`
        <li class="page-item" id="nextpage">
            <a class="page-link" href="#" aria-label="Next" onclick="setPage('next')">
                <span aria-hidden="true">&gt;</span>
            </a>
        </li>
        <li class="page-item" id="lastpage">
            <a class="page-link" href="#" aria-label="Last" onclick="setPage('last')">
                <span aria-hidden="true">最後</span>
            </a>
        </li>
    `)

    if (currentPage >= maxPage) {
        $('#nextpage').addClass("disabled");
        $('#lastpage').addClass("disabled");
    } else {
        $('#nextpage').removeClass("disabled");
        $('#lastpage').removeClass("disabled");
    }
    if (currentPage == 1) {
        $('#prevpage').addClass("disabled");
        $('#firstpage').addClass("disabled");
    } else {
        $('#prevpage').removeClass("disabled");
        $('#firstpage').removeClass("disabled");
    }
    changeView();
};

const setPage = (page) => {
    switch (page) {
        case "first": currentPage = 1; break;
        case "last": currentPage = maxPage; break;
        case "prev": currentPage--; break;
        case "next": currentPage++; break;
        default: currentPage = page; break;
    }

    makePageNav(images);
    changeView();
};

const changeView = () => {
    $("#images").empty();
    dispImages = images.slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
    for (let image of dispImages) {
        $("#images").append(`
            <a href="${image}" class="luminous">
                <img src="${image}" class="view" alt="画像">
            </a>
        `)
    }
    setLuminous();
};