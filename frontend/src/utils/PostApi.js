const api = 'http://localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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
        {method: 'POST',
            headers, body})
        .then(res => res.json());


export const votePost = (post_id, body) =>
    fetch(`${api}/posts/${post_id}`,
        {method: 'POST',
         headers,
         body
        })
        .then(res => res.json());


export const voteComment = (comment_id, body) =>
    fetch(`${api}/comments/${comment_id}`,
        {method: 'POST',
            headers,
            body
        })
        .then(res => res.json());


export const addComment = (body) =>
    fetch(`${api}/comments`,
        {method: 'POST',
            headers,
            body
        })
        .then(res => res.json());
