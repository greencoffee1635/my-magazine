import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { firestore } from "../../shared/firebase";

import moment from "moment";


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어 둡시다.
const initialPost = {
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
    };
    // 잘 만들어졌나 확인해보세요!!
    console.log(_post);

    postDB.add({...user_info, ..._post}).then((doc) => {
        // 아이디를 추가해요!
        let post = {user_info, ..._post, id: doc.id};
				console.log(post);
    }).catch((err) => {
        console.log('post 작성 실패!', err);
    });
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB
      .get()
      .then((docs) => {
        let post_list = [];

        docs.forEach((doc) => {
          let _post = doc.data();
          let post = {
            id: doc.id,
            user_info: {
              user_name: _post.user_name,
              user_profile: _post.user_profile,
              user_id: _post.user_id,
            },
            contents: _post.contents,
            image_url: _post.image_url,
            comment_cnt: _post.comment_cnt,
            insert_dt: _post.insert_dt,
          };

          post_list.push(post);
        });

        // 리스트 확인하기!
        console.log(post_list);

        dispatch(setPost(post_list));
      })
      .catch((error) => console.error(error));
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {}),

    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
};

export { actionCreators };
