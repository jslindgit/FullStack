const dummy = (blogs) => {
  return 1;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  return blogs.reduce((prev, current) => {
    const prevBlogs = blogs.filter((x) => x.author === prev.author).length;
    const currentBlogs = blogs.filter(
      (x) => x.author === current.author
    ).length;
    if (prevBlogs > currentBlogs) {
      return {
        author: prev.author,
        blogs: prevBlogs,
      };
    } else {
      return {
        author: current.author,
        blogs: currentBlogs,
      };
    }
  });
};

const mostLikes = (blogs) => {
  const totalLikes = (author) => {
    return blogs
      .filter((x) => x.author === author)
      .reduce((accumulator, object) => {
        return accumulator + object.likes;
      }, 0);
  };
  return blogs.reduce((prev, current) => {
    if (totalLikes(prev.author) > totalLikes(current.author)) {
      return {
        author: prev.author,
        likes: totalLikes(prev.author),
      };
    } else {
      return {
        author: current.author,
        likes: totalLikes(current.author),
      };
    }
  });
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((accumulator, object) => {
    return accumulator + object.likes;
  }, 0);
  return sum;
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};
