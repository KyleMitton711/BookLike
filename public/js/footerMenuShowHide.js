let currentPosition = 0;
let lastPosition = 0;

const onScroll = () => {
  'use strict';
  const footerMenu = document.getElementById('footer-menu');
  // フッターメニューを表示しないときは処理を中止
  if (!footerMenu) return;
  const footerHeight = footerMenu.clientHeight;

  // 下にスクロールしたらfooterMenuを非表示に
  if (currentPosition > footerHeight && currentPosition > lastPosition) {
    footerMenu.classList.add('footer-menu-hidden');
  }
  // 上にスクロールしたらfooterMenuを再表示
  if (currentPosition < footerHeight || currentPosition < lastPosition) {
    footerMenu.classList.remove('footer-menu-hidden');
  }
  // lastPositionを更新
  lastPosition = currentPosition;
};

window.addEventListener('scroll', () => {
  // スクロールするごとにcurrentPositionを更新
  currentPosition = window.scrollY;

  onScroll();
});
