const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let byAuthor
            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                byAuthor = await Book.find({ author: author.id })
            } else {
                byAuthor = await Book.find({})
            }
            return args.genre
                ? byAuthor.filter((b) =>
                      b.genres
                          .map((g) => g.toLowerCase())
                          .includes(args.genre.toLowerCase())
                  )
                : byAuthor
        },
        allAuthors: async () => {
            const allAuthors = await Author.find({})
            return allAuthors
        },
        allGenres: async () => {
            const books = await Book.find({})
            let genres = []
            books.forEach((b) => {
                b.genres.forEach((g) => {
                    if (!genres.includes(g.toLowerCase())) {
                        genres = genres.concat(g.toLowerCase())
                    }
                })
            })
            return genres
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        bookCount: async (root) => {
            const books = await Book.find({ author: root.id })
            return books.length
        },
        id: (root) => root.id,
    },
    Book: {
        author: async (root) => {
            const a = await Author.findById(root.author)
            return a
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context || !context.currentUser) {
                throw new GraphQLError('Current User undefined')
            }

            let author
            const matchingAuthor = await Author.findOne({ name: args.author })
            if (!matchingAuthor) {
                const newAuthor = new Author({ name: args.author })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new GraphQLError('Saving Author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error,
                        },
                    })
                }
                author = newAuthor
            } else {
                author = matchingAuthor
            }
            const book = new Book({ ...args, author: author })

            try {
                await book.save()
                console.log('New Book saved:', book)
            } catch (error) {
                console.log(error)
                throw new GraphQLError('Saving Book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            if (!context || !context.currentUser) {
                throw new GraphQLError('Current User undefined')
            }

            const author = await Author.findOne({ name: args.name })
            if (author) {
                author.born = args.setBornTo
                try {
                    author.save()
                } catch (error) {
                    throw new GraphQLError('Saving Author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.setBornTo,
                            error,
                        },
                    })
                }
                return author
            }
            return null
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user.id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers
