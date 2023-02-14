const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author]!
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
        addBook: async (root, args) => {
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
        editAuthor: async (root, args) => {
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
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
