/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query Guide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GuideDocument,
    "\n    query SignIn($input: UserSignInInput) {\n        signIn(input: $input) {\n            message\n            token\n        }\n    }\n": types.SignInDocument,
    "\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n": types.CreateGuideDocument,
    "\n    query Guides {\n        res: guides {\n            description\n            title\n            id\n            tags\n        }\n    }\n": types.GuidesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Guide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n"): (typeof documents)["\n    query Guide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SignIn($input: UserSignInInput) {\n        signIn(input: $input) {\n            message\n            token\n        }\n    }\n"): (typeof documents)["\n    query SignIn($input: UserSignInInput) {\n        signIn(input: $input) {\n            message\n            token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n"): (typeof documents)["\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Guides {\n        res: guides {\n            description\n            title\n            id\n            tags\n        }\n    }\n"): (typeof documents)["\n    query Guides {\n        res: guides {\n            description\n            title\n            id\n            tags\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;