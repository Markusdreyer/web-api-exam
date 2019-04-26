const posts = []

function updatePosts(post) {
    posts.push(post)
}

function getPosts() {
    return posts
}

function getPosts(user) {
    let availablePosts = []
    posts.forEach(post => {
        if (user.id == post.author) {
            availablePosts.push(post)
        }
        if (user.friends.length != 0 && user.friends.includes(post.author)) {
            availablePosts.push(post)
        }
    });
    return availablePosts
}

module.exports = { posts, updatePosts, getPosts };
