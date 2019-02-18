import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me:User!
        post:Post!
    }
    
    type User{
        _id:ID!
        name:String!
        email:String!
        age:Int
    }
    type Post{
        _id:ID!
        title:String!
        body:String!
        published:Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                _id: "12345",
                name: "Najam Shehzad Butt",
                email: "najambutt195@gmail.com",
                age: "21"
            }
        },
        post() {
            return {
                _id: "abc123",
                title: "Superman",
                body: "Superman vs Batman",
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})