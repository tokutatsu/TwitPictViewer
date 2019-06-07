const luminousTrigger = document.querySelectorAll('.luminous');

const galleryOpts = {
    arrowNavigation: true  //方向キーでの画像切り替えオプション
};

if (luminousTrigger !== null) {
    new LuminousGallery(luminousTrigger, galleryOpts);
}