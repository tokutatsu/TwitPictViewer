$('#submitLimit').click(() => {
    currentPage = 1;  // 切り替え時に現在のページを1ページ目にリセット
    let pageLimit = $('#pageLimit').val();
    if (pageLimit <= 0 || pageLimit > images.length) {
        pageLimit = 100;
        $('#pageLimit').val(pageLimit);
    }
    makePageNav(images, pageLimit);
});