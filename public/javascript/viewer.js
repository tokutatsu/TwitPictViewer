$('#submitLimit').click(() => {
    let pageLimit = $('#pageLimit').val();
    if (pageLimit <= 0) {
        pageLimit = 100;
        $('#pageLimit').val(pageLimit);
    }
    makePageNav(images, pageLimit);
});