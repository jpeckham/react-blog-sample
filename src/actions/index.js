import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import { FETCH_POSTS } from '../reducers';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();

};

export const fetchPosts = () => async (dispatch /*, getState */) => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

/* memoized version ******
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import { FETCH_POSTS } from '../reducers';

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: FETCH_POSTS, payload: response.data });
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
});

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

export const memoizedFetchUser = _.memoize(fetchUser);

*/