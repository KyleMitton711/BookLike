import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useFetchLoginUser } from '../../hooks/useFetchLoginUser';
import ReviewList from './ReviewList';
import Loading from '../Loading';
import ReviewSearchCriteriaAndWord from './ReviewSearchCriteriaAndWord';
import CategoryList from './CategoryList';
import ReviewsSort from './ReviewsSort';
import ReviewSearchForm from './ReviewSearchForm';
import ReviewSearchFormModal from './ReviewSearchFormModal';
import { changeSelectBox } from '../../functions/changeSelectBox';
import { hideModal } from '../../functions/hideModal';

const ReviewIndex = React.memo(() => {
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState('');
  const [criteria, setCriteria] = useState('title');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const { loginUser } = useFetchLoginUser();

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      const newReviews = await axios
        .get('/api/reviews', {
          params: {
            criteria: criteria,
            search: searchWord,
            category: category,
            sort: sort,
            page: page,
          },
        })
        .then((res) => {
          page < res.data.links.last_page && setHasMore(true);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      setReviews((prev) => [...prev, ...newReviews]);
      setLoading(false);
    };
    loadReviews();
  }, [page, category, searchWord, sort]);

  // 検索条件を選択
  const selectCriteria = (e) => {
    const searchBooks =
      document.getElementById('searchBooks') ||
      document.getElementById('modalSearchBooks');
    const selectedIndex = e.target.selectedIndex;
    const selectedCriteria = e.target.options[selectedIndex].label;
    searchBooks.placeholder = `${selectedCriteria}で検索...`;
    modalSearchBooks.placeholder = `${selectedCriteria}で検索...`;
    setHasMore(false);
    setCriteria(e.target.options[selectedIndex].value);
  };

  // 検索ワード入力時の処理
  const searchSubmit = (e) => {
    e.preventDefault();
    const searchBooks = document.getElementById('searchBooks');
    // フォーカスを外す
    searchBooks.blur();
    // 検索ワードに変化がなければ何もしない
    if (searchBooks.value === searchWord || '') return;

    setReviews([]);
    setPage(1);
    setHasMore(false);
    setSearchWord(searchBooks.value);
  };

  // 検索ワード入力時の処理（スマホ用）
  const modalSearchSubmit = (e) => {
    e.preventDefault();
    const modalSearchBooks = document.getElementById('modalSearchBooks');

    // モーダルを非表示にする
    hideModal();

    // 検索ワードに変化がなければ処理を終了する
    if (modalSearchBooks.value === searchWord || '') {
      return;
    }

    setReviews([]);
    setPage(1);
    setHasMore(true);
    setSearchWord(modalSearchBooks.value);
  };

  // セレクトボックスを操作またはアンカーテキストをクリックしたときの処理
  const changeCategory = useCallback((e) => {
    const selectedValue = document.getElementById('categorySelector').value;
    const clickedCategory = e.target.dataset.category;
    const selectedCategory = clickedCategory || selectedValue;

    // クリックしたカテゴリーが選択中のカテゴリーと同じならなにもしない
    if (clickedCategory === selectedValue) return;

    changeSelectBox(selectedCategory);
    setReviews([]);
    setCategory(selectedCategory);
    setPage(1);
    setHasMore(false);
  });

  // 一覧の並び替え
  const sortChange = useCallback(() => {
    const selectedSort = document.getElementById('selectSort').value;
    setSort(selectedSort);
    setReviews([]);
    setPage(1);
    setHasMore(false);
  });

  // 一定量スクロールしたら投稿をさらに読み込み(無限スクロール)
  const body = document.getElementById('body');
  body.onscroll = () => {
    const scrollAmount = window.scrollY;
    const clientHeight =
      document.getElementById('reviewsComponent').clientHeight;

    if (hasMore && clientHeight - scrollAmount < 1200) {
      setPage((prev) => prev + 1);
      setHasMore(false);
    }
    return;
  };

  return (
    <>
      {/* 投稿検索フォーム */}
      <ReviewSearchForm
        selectCriteria={selectCriteria}
        searchSubmit={searchSubmit}
      />

      {/* スマホ用検索モーダル */}
      <ReviewSearchFormModal
        selectCriteria={selectCriteria}
        modalSearchSubmit={modalSearchSubmit}
      />

      {/* 検索ワードの表示 */}
      <ReviewSearchCriteriaAndWord
        criteria={criteria}
        searchWord={searchWord}
      />

      {/* カテゴリー選択とレビュー一覧の並び替え */}
      <div className="form-group d-flex flex-wrap justify-content-between pt-2 pb-0 bg-body category-selector">
        <CategoryList changeCategory={changeCategory} />
        <ReviewsSort sortChange={sortChange} setSort={setSort} />
      </div>

      {/* 投稿一覧 */}
      <div id="reviewsComponent">
        <ReviewList
          reviews={reviews}
          loginUser={loginUser}
          changeCategory={changeCategory}
        />
      </div>

      {/* Loading Spinner */}
      <div className="text-center">
        {loading && <Loading />}
        {!loading &&
          reviews.length === 0 &&
          '該当する投稿は見つかりませんでした'}
      </div>
    </>
  );
});

export default ReviewIndex;

if (document.getElementById('reviewIndex')) {
  ReactDOM.render(<ReviewIndex />, document.getElementById('reviewIndex'));
}
