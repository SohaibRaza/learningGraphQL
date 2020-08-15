import {GraphQLServer} from 'graphql-yoga';

/**
 * Type Definitions OR Application schema:
 * It is very important we define very important thingd like the operations
 * that can be performed on the API & what our custom data-type look like.
 * const typedefs = `
 *         type Query {
 *             here define all the queries you want to support
 *             query_name: type of data
 *         }
 * we can also create @custom types first letter of the name should be
 * capital e.g.
 *      type User { id: ID!}
 *
 * `;
 *
 * @TYPE DETAILS:
 *
 * @Scalar_Types {String, Boolean, Int, FLoat, ID}
 * A scalar value is a single discrete value opposite to non scalar types i.e.
 * Objects, arrays which have collection of discrete values.
 *
 *  _____scalar String_____
 * The String scalar type represents textual data, represented as UTF-8 character
 * sequences. The String type is most often used by GraphQL to represent free-form
 * human-readable text.     e.g. hello: String!
 *
 *  _____scalar ID______
 * The ID scalar type represents a unique identifier, often used to refetch an
 * object or as key for a cache. The ID type appears in a JSON response as a String;
 * however, it is not intended to be human-readable. When expected as an input type,
 * any string (such as "4") or integer (such as 4) input value will be accepted as
 * an ID.       e.g.  id: ID!
 *
 *  _____scalar Boolean_____
 * The Boolean scalar type represents true or false. e.g. jobDone: Boolean!
 *
 *  _____scalar Int_____
 * The Int scalar type represents non-fractional signed whole numeric values. Int
 * can represent values between -(2^31) and 2^31 - 1.
 *
 *  _____scalar Float_____
 * The Float scalar type represents signed double-precision fractional values as
 * specified by IEEE 754.
 *
 */

const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(a: Float, b: String): Float!
        grades(grades: [Int!]!): [Int!]!
        user: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        rating: Float!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: String!
    }
`;

/**
 * Resolvers:   resolvers are nothing more than a set of functions, we are
 * are going to define functions that can run for each of the operations
 * that can be performed on our API e.g. read, write data.
 *
 * the structure of resolvers mirror the structutre above
 *
 * @arguments in resolver function: There are four that get passed to all
 * resolver functions:
 *      #1 @argument  {Parent}  it useful when we are working with the relational data.
 *      #2 @argument  {args} contains the information we need, contains operation arguments.
 *      #3 @argument  {ctx} Context(ctx) for contextual data. e.g. If a user is loggedin contians
 *                          ID of the user so we can access it throughout the application.
 *      #4 @argument  {info} contains information about actula operations that were
 *                           sent along to the server.
 */


const resolvers = {
    Query: {
        // define methods here, one method for each query, * Names should match
        greeting(Parent, args, ctx, info) {
            if (args.name) return `Welcome ${args.name}!`;
            return 'Welcome!';
        },
        add(Parent, args, context, information) {
            return args.a + args.b;
        },
        grades(parent, args, context, information) {
            return [99,70,88,75];
        },
        user() {
            return {
                id: '12311',
                name: 'sohaib',
                email: 'spam@spam4.me',
                age: 24,
                rating: 4.3
            };
        },
        post() {
            return {
                id: '43114edf21',
                title: 'Learn GraphQL',
                body:'Comming soon...',
                published: false
            };
        }

    }
};


// Create a GraphQL server

const server =  new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=>{
    console.log('Server is running');
})