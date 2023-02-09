import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation newBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const SET_BIRTHYEAR = gql`
    mutation setBirthYear($name: String!, $year: Int!) {
        editAuthor(name: $name, setBornTo: $year) {
            name
            born
        }
    }
`
