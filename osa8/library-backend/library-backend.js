const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongDB:', error.message)
    })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
	addBook(
		title: String!
        published: Int!
		author: String!		
		genres: [String!]!
	): Book
	editAuthor(
		name: String!
		setBornTo: Int!
	): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }
`

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
            } catch (error) {
                throw new GraphQLError('Saving Book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                })
            }

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
                _id: user.id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
