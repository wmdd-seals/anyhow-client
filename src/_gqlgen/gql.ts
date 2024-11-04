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
    "\n    query User {\n        user {\n            email\n            favoriteTopics\n            firstName\n            id\n            lastName\n            middleName\n        }\n    }\n": types.UserDocument,
    "\n    query GetQuizId($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n            }\n        }\n    }\n": types.GetQuizIdDocument,
    "\n    query GetQuiz($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n                body {\n                    quiz {\n                        questions {\n                            questionTitle\n                            options\n                            correctAnswerIndex\n                        }\n                    }\n                }\n            }\n        }\n    }\n": types.GetQuizDocument,
    "\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n": types.CreateGuideDocument,
    "\n    mutation StoreGuideCompleted($input: StoreGuideCompletedInput!) {\n        storeGuideCompleted(input: $input) {\n            id\n            guideId\n            userId\n            createdAt\n        }\n    }\n": types.StoreGuideCompletedDocument,
    "\n    query GuideCompletedCounts($input: GuideCompletedDateRange) {\n        res: guideCompletedCounts(input: $input) {\n            count\n            date\n        }\n    }\n": types.GuideCompletedCountsDocument,
    "\n    query GuideCompletedList {\n        res: guideCompletedList {\n            guide {\n                description\n                id\n                tags\n                title\n            }\n            createdAt\n            id\n            guideId\n        }\n    }\n": types.GuideCompletedListDocument,
    "\n    query Guide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n            user {\n                id\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GuideDocument,
    "\n    query SignIn($input: UserSignInInput) {\n        signIn(input: $input) {\n            message\n            token\n        }\n    }\n": types.SignInDocument,
    "\n    mutation SignupUser($input: UserCreateInput!) {\n        signupUser(input: $input) {\n            id\n        }\n    }\n": types.SignupUserDocument,
    "\n    query GetGuide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n        }\n    }\n": types.GetGuideDocument,
    "\n    mutation RemoveGuideCover($id: String!) {\n        res: removeImage(id: $id)\n    }\n": types.RemoveGuideCoverDocument,
    "\n    mutation UpdateGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n": types.UpdateGuideDocument,
    "\n    mutation UploadGuideCover($input: FileInfo!) {\n        res: uploadCoverImage(input: $input) {\n            id\n        }\n    }\n": types.UploadGuideCoverDocument,
    "\n    mutation UploadGuideImage($input: FileInfo!) {\n        res: uploadImage(input: $input) {\n            id\n        }\n    }\n": types.UploadGuideImageDocument,
    "\n    mutation GuideChat($input: GuideChatRequest) {\n        res: guideChat(input: $input) {\n            content\n            role\n        }\n    }\n": types.GuideChatDocument,
    "\n    query ChatMessages($guideId: String!) {\n        res: chathistory(guideId: $guideId) {\n            content\n            role\n        }\n    }\n": types.ChatMessagesDocument,
    "\n    query Guides {\n        res: guides {\n            body\n            description\n            id\n            title\n            tags\n            user {\n                firstName\n                lastName\n            }\n        }\n    }\n": types.GuidesDocument,
    "\n    mutation saveFavoriteTopics($input: UserProfile) {\n        res: updateUserProfile(input: $input) {\n            id\n        }\n    }\n": types.SaveFavoriteTopicsDocument,
    "\n    query GetQuizAnswers($quizId: String) {\n        res: quizAnswers(quizId: $quizId) {\n            answers\n        }\n    }\n": types.GetQuizAnswersDocument,
    "\n    mutation SaveQuizAnswers($input: SaveQuizAnswersInput) {\n        res: saveQuizAnswers(input: $input) {\n            id\n            answers\n        }\n    }\n": types.SaveQuizAnswersDocument,
    "\n    mutation GenerateQuiz($input: GenerateQuizInput!) {\n        res: generateQuiz(input: $input) {\n            id\n            body {\n                quiz {\n                    questions {\n                        questionTitle\n                        options\n                        correctAnswerIndex\n                    }\n                }\n            }\n        }\n    }\n": types.GenerateQuizDocument,
    "\n    mutation PublishGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n": types.PublishGuideDocument,
    "\n    mutation PublishQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n": types.PublishQuizDocument,
    "\n    mutation UpdateQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n": types.UpdateQuizDocument,
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
export function graphql(source: "\n    query User {\n        user {\n            email\n            favoriteTopics\n            firstName\n            id\n            lastName\n            middleName\n        }\n    }\n"): (typeof documents)["\n    query User {\n        user {\n            email\n            favoriteTopics\n            firstName\n            id\n            lastName\n            middleName\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetQuizId($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetQuizId($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetQuiz($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n                body {\n                    quiz {\n                        questions {\n                            questionTitle\n                            options\n                            correctAnswerIndex\n                        }\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetQuiz($guideId: ID!) {\n        res: guide(id: $guideId) {\n            quiz {\n                id\n                body {\n                    quiz {\n                        questions {\n                            questionTitle\n                            options\n                            correctAnswerIndex\n                        }\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n"): (typeof documents)["\n    mutation CreateGuide($input: GuideCreationInput!) {\n        res: createGuide(input: $input) {\n            id\n            title\n            tags\n            description\n            body\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation StoreGuideCompleted($input: StoreGuideCompletedInput!) {\n        storeGuideCompleted(input: $input) {\n            id\n            guideId\n            userId\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation StoreGuideCompleted($input: StoreGuideCompletedInput!) {\n        storeGuideCompleted(input: $input) {\n            id\n            guideId\n            userId\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GuideCompletedCounts($input: GuideCompletedDateRange) {\n        res: guideCompletedCounts(input: $input) {\n            count\n            date\n        }\n    }\n"): (typeof documents)["\n    query GuideCompletedCounts($input: GuideCompletedDateRange) {\n        res: guideCompletedCounts(input: $input) {\n            count\n            date\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GuideCompletedList {\n        res: guideCompletedList {\n            guide {\n                description\n                id\n                tags\n                title\n            }\n            createdAt\n            id\n            guideId\n        }\n    }\n"): (typeof documents)["\n    query GuideCompletedList {\n        res: guideCompletedList {\n            guide {\n                description\n                id\n                tags\n                title\n            }\n            createdAt\n            id\n            guideId\n        }\n    }\n"];
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
export function graphql(source: "\n    mutation SignupUser($input: UserCreateInput!) {\n        signupUser(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation SignupUser($input: UserCreateInput!) {\n        signupUser(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetGuide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n        }\n    }\n"): (typeof documents)["\n    query GetGuide($id: ID!) {\n        res: guide(id: $id) {\n            id\n            title\n            body\n            tags\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RemoveGuideCover($id: String!) {\n        res: removeImage(id: $id)\n    }\n"): (typeof documents)["\n    mutation RemoveGuideCover($id: String!) {\n        res: removeImage(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UploadGuideCover($input: FileInfo!) {\n        res: uploadCoverImage(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UploadGuideCover($input: FileInfo!) {\n        res: uploadCoverImage(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UploadGuideImage($input: FileInfo!) {\n        res: uploadImage(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UploadGuideImage($input: FileInfo!) {\n        res: uploadImage(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation GuideChat($input: GuideChatRequest) {\n        res: guideChat(input: $input) {\n            content\n            role\n        }\n    }\n"): (typeof documents)["\n    mutation GuideChat($input: GuideChatRequest) {\n        res: guideChat(input: $input) {\n            content\n            role\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ChatMessages($guideId: String!) {\n        res: chathistory(guideId: $guideId) {\n            content\n            role\n        }\n    }\n"): (typeof documents)["\n    query ChatMessages($guideId: String!) {\n        res: chathistory(guideId: $guideId) {\n            content\n            role\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Guides {\n        res: guides {\n            body\n            description\n            id\n            title\n            tags\n            user {\n                firstName\n                lastName\n            }\n        }\n    }\n"): (typeof documents)["\n    query Guides {\n        res: guides {\n            body\n            description\n            id\n            title\n            tags\n            user {\n                firstName\n                lastName\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation saveFavoriteTopics($input: UserProfile) {\n        res: updateUserProfile(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation saveFavoriteTopics($input: UserProfile) {\n        res: updateUserProfile(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetQuizAnswers($quizId: String) {\n        res: quizAnswers(quizId: $quizId) {\n            answers\n        }\n    }\n"): (typeof documents)["\n    query GetQuizAnswers($quizId: String) {\n        res: quizAnswers(quizId: $quizId) {\n            answers\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SaveQuizAnswers($input: SaveQuizAnswersInput) {\n        res: saveQuizAnswers(input: $input) {\n            id\n            answers\n        }\n    }\n"): (typeof documents)["\n    mutation SaveQuizAnswers($input: SaveQuizAnswersInput) {\n        res: saveQuizAnswers(input: $input) {\n            id\n            answers\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation GenerateQuiz($input: GenerateQuizInput!) {\n        res: generateQuiz(input: $input) {\n            id\n            body {\n                quiz {\n                    questions {\n                        questionTitle\n                        options\n                        correctAnswerIndex\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation GenerateQuiz($input: GenerateQuizInput!) {\n        res: generateQuiz(input: $input) {\n            id\n            body {\n                quiz {\n                    questions {\n                        questionTitle\n                        options\n                        correctAnswerIndex\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation PublishGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation PublishGuide($input: UpdateGuideInput!) {\n        res: updateGuide(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation PublishQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation PublishQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateQuiz($input: UpdateQuizInput!) {\n        res: updateQuiz(input: $input) {\n            id\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;