import React from 'react';

const ReviewSpoiler = ({ spoiler }) => {
  const isSpoiler = spoiler === 1 ? true : false;
  return (
    <>
      {isSpoiler ? (
        <span className="badge badge-danger badge-pill pt-1">ネタバレあり</span>
      ) : (
        <span className="badge badge-info badge-pill pt-1">ネタバレなし</span>
      )}
    </>
  );
};

export default ReviewSpoiler;
