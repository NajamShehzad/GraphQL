import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

//Demo Post Data

const posts = [{
        _id: "1",
        title: "New Post",
        body: "Body of Post 1",
        published: false
    },
    {
        _id: "2",
        title: "2nd Post",
        body: "Body of Post 3 ",
        published: true
    },
    {
        _id: "3",
        title: "3nd Post",
        body: "Body of Post  3",
        published: true

    }
]





//Demo User Data
const users = [{
        _id: "1",
        name: "Najam Shehzad Butt",
        age: 21,
        email: "najam@example.com"
    },
    {
        _id: "2",
        name: "Mutlib",
        age: 14,
        email: "najam@example.com"
    },
    {
        _id: "3",
        name: "A.rehman",
        age: 12,
        email: "najam@example.com"
    },
    {
        _id: "4",
        name: "Muneeb",
        age: 19,
        email: "najam@example.com"
    }
]



// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query:String):[User!]!
        grades:[Int!]!
        greeting(name:String,age:Int!):String!
        me:User!
        post(query:String):[Post!]!
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter(data => {
                return data.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
            })
        },
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
        post(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter(post => {
                let titleBool = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
                let bodyBool = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase());
                return titleBool || bodyBool;
            })
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