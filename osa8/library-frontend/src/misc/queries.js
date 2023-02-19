import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation newBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
            }
            genres
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

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            username
            id
            favoriteGenre
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
