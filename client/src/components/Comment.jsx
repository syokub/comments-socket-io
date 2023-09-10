import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";
import PropTypes from "prop-types";

function formatDate(dateStr) {
  const date = parseISO(dateStr);
  return formatDistance(date, new Date(), { addSuffix: true });
}

const Comment = ({ comment, isYou }) => {
  console.log(comment, isYou);

  return (
    <div className="Comment">
      <div className="Comment-header">
        <div className="Comment-avatar">
          <img src={comment?.author?.avatar} alt={comment?.author?.name} />
        </div>
        <span className="Comment-author">
          {isYou ? "You" : comment.author?.name}
        </span>
        <span className="Comment-time">{formatDate(comment?.insertedAt)}</span>
      </div>

      <div className="Comment-body">{comment.body}</div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  comment: PropTypes.any,
  isYou: PropTypes.any,
};
