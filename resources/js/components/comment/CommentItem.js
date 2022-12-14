import React from 'react';
import UserIcon from '../users/UserIcon';

const CommentItem = ({ comment, loginUser }) => {
  return (
    <>
      {comment.deleted_at ? (
        <div className="card-header p-3 border-bottom-0 bg-white d-flex flex-column">
          <div className="d-flex flex-column text-right">
            <span className="text-secondary">{comment.created_at}</span>
          </div>
          <div className="text-secondary">このコメントは削除されました</div>
        </div>
      ) : (
        <div>
          <div
            className="
                    card-header
                    p-3
                    border-bottom-0
                    bg-white
                    d-flex
                    flex-row
                    justify-content-between"
          >
            <div className="d-flex flex-row">
              <div className="ml-2 d-flex flex-column justify-content-between">
                <UserIcon
                  profileImage={comment.user.profile_image}
                  iconSize={48}
                />
                <div className="ml-2 d-flex flex-column justify-content-between">
                  <p className="mb-0">{comment.user.name}</p>
                  <span className="text-secondary">
                    {comment.user.screen_name}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column text-right">
              {comment.user.id === loginUser.id && (
                <form>
                  <h5>
                    <i className="fas fa-trash"></i>
                  </h5>
                </form>
              )}
              <span className="text-secondary">{comment.created_at}</span>
            </div>
          </div>
          <div className="card-body p-3">{comment.text}</div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
