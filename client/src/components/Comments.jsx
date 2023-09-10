/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const commentSchema = Yup.object().shape({
  body: Yup.string(),
});

const Comments = ({ socket, selectedUserId }) => {
  const [comments, setComments] = useState([]);
  const initialValues = {
    body: "",
  };

  const sendComment = async (values) => {
    const result = await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: values.body, authorId: selectedUserId }),
    });
    const comment = await result.json();
    setComments((prevComments) => [...prevComments, comment]);
  };

  useEffect(() => {
    socket.on("new-comment", ({ comment }) => {
      if (comment.author.id !== selectedUserId) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    });

    return () => {
      socket.off("new-comment");
    };
  }, [socket, selectedUserId]);

  return (
    <div className="Comments">
      <div className="Comments-title">
        {comments.length === 1 ? `1 comment` : `${comments.length} comments`}
      </div>

      <div className="Comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isYou={selectedUserId === comment.authorId}
          />
        ))}
      </div>
      <div className="Comments-box">
        <Formik
          initialValues={initialValues}
          validationSchema={commentSchema}
          onSubmit={(values, { resetForm }) => {
            sendComment(values);
            resetForm();
          }}
        >
          <Form>
            <Field
              type="text"
              name="body"
              as="textarea"
              className="Comments-box__input"
            />
            <ErrorMessage
              name="body"
              component="div"
              className="Comments-error"
            />
            <button
              type="submit"
              disabled={!selectedUserId}
              className="Comments-box__btn"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Comments;
