import { combineReducers } from 'redux';
import posts from './postsReducer';
import users from './usersReducer';

export const FETCH_POSTS = 'FETCH_POSTS';

export default combineReducers({ posts, users });