const posts = []

function updatePosts(post) {
    posts.push(post)
}

function getPosts() {
    return posts
}

module.exports = { posts, updatePosts, getPosts };
