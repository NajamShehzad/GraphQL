import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        grades:[Int!]!
        greeting(name:String,age:Int!):String!
        me:User!
        post:Post!
        add(numbers:[Float!]!):Float!
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
        grades() {
            return [88, 85, 12, 35, 33]
        },
        add(parent, args, ctx, info) {
            if (args.numbers.length == 0) {
                return 0
            }
            return args.numbers.reduce((previousValue, currentValue) => {
                return previousValue + currentValue
            })
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.age) {
                return `Hello ${args.name} Your age ${args.age}`
            }
            return "Hello"
        },
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