import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CommentList from '../comment/CommentList';
import { useFetchLoginUser } from '../../hooks/useFetchLoginUser';
import { useFetchReview } from '../../hooks/useFetchReview';
import UserIcon from '../users/UserIcon';
import UserName from '../users/UserName';
import BookImage from './BookImage';
import BookInfo from './BookInfo';
import ReviewSpoiler from './ReviewSpoiler';
import ReviewEditButton from './ReviewEditButton';
import CommentButton from './CommentButton';
import CreatedAt from '../CreatedAt';
import FavoriteButton from './FavoriteButton';
import Loading from '../Loading';

const ReviewShow = () => {
  const { getReview, review } = useFetchReview();
  const { getLoginUser, loginUser } = useFetchLoginUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getLoginUser();
      await getReview();
    };
    getData();
    setLoading(false);
    return () => setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        review &&
        loginUser && (
          <div className="card shadow-sm mb-3">
            <div className="p-3 d-flex">
              {/* ユーザー情報 */}
              <UserIcon
                reviewUser={review.user}
                favoritesCount={1}
                reviewId={review.id}
                profileImage={review.user.profile_image}
                iconSize={48}
              />
              <UserName
                userName={review.user.name}
                screenName={review.user.screen_name}
              />
              <CreatedAt createdAt={review.created_at} />
            </div>

            <div className="card-body py-0 px-3">
              <div className="d-flex flex-row py-3 border-top border-bottom">
                <BookImage
                  imageUrl={review.image_url}
                  pageUrl={review.page_url}
                  bookImageSize={128}
                />
                <BookInfo
                  title={review.title}
                  author={review.author}
                  manufacturer={review.manufacturer}
                  category={review.category}
                  ratings={review.ratings}
                />
              </div>
            </div>

            {/* レビュー */}
            <div className="card-body border-bottom py-3 px-0 mx-3">
              <div className="d-inline text-blog font-weight-bold">
                レビュー <ReviewSpoiler spoiler={review.spoiler} />
              </div>
              <p className="mt-1 mb-0">{review.text || '未投稿'}</p>
            </div>

            <div className="card-footer pb-3 px-3 d-flex justify-content-end bg-white border-top-0">
              <div className="d-d-flex align-items-center">
                <ReviewEditButton
                  loginUser={loginUser.id}
                  reviewUser={review.user.id}
                  id={review.id}
                />
              </div>
              <div className="ml-sm-3 d-flex align-items-center">
                <CommentButton
                  id={review.id}
                  commentCount={review.comments_count}
                />
              </div>
              <div className="ml-3 ml-sm-4 mr-sm-3 d-flex align-items-center">
                <FavoriteButton review={review} loginUser={loginUser} />
              </div>
            </div>
            <CommentList comments={review.comments} loginUser={loginUser} />
          </div>
        )
      )}
    </>
  );
};

export default ReviewShow;

if (document.getElementById('reviewShow')) {
  ReactDOM.render(<ReviewShow />, document.getElementById('reviewShow'));
}
