const api = 'http://localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Authorization': 'tempAuth'
};

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);


export const getPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json());


export const getPost = (post_id) =>
    fetch(`${api}/posts/${post_id}`, {headers})
        .then(res => res.json());


export const getComments = (post_id) =>
    fetch(`${api}/posts/${post_id}/comments`, {headers})
        .then(res => res.json());


export const savePost = (body) =>
    fetch(`${api}/posts`,
        {headers, body})
        .then(res => res.json());
