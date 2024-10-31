/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Custom scalar for JSON Object and Array */
  JSON: { input: any; output: any; }
  /** Base64 to Stream Conversion */
  Stream: { input: any; output: any; }
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  content?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type File = {
  __typename?: 'File';
  base64Data?: Maybe<Scalars['Stream']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FileInfo = {
  base64Data: Scalars['String']['input'];
  guideId: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type GenerateQuizInput = {
  guideId: Scalars['ID']['input'];
};

export type GenreatedQuiz = {
  __typename?: 'GenreatedQuiz';
  quiz?: Maybe<QuizObject>;
};

export type GenreatedQuizInput = {
  quiz?: InputMaybe<QuizInput>;
};

export type Guide = {
  __typename?: 'Guide';
  body?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  quiz?: Maybe<Quiz>;
  tags?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type GuideChatRequest = {
  guideId: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};

export type GuideCreationInput = {
  body: Scalars['String']['input'];
  description: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  tags: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGuide: Guide;
  createQuiz: Quiz;
  generateQuiz: Quiz;
  guideChat: ChatResponse;
  removeImage?: Maybe<Scalars['Boolean']['output']>;
  saveQuizAnswers: QuizAnswers;
  signupUser: User;
  updateGuide: Guide;
  updateQuiz: Quiz;
  updateUserProfile: User;
  uploadCoverImage: File;
  uploadImage: File;
};


export type MutationCreateGuideArgs = {
  input: GuideCreationInput;
};


export type MutationCreateQuizArgs = {
  input: QuizCreationInput;
};


export type MutationGenerateQuizArgs = {
  input: GenerateQuizInput;
};


export type MutationGuideChatArgs = {
  input?: InputMaybe<GuideChatRequest>;
};


export type MutationRemoveImageArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveQuizAnswersArgs = {
  input?: InputMaybe<SaveQuizAnswersInput>;
};


export type MutationSignupUserArgs = {
  input: UserCreateInput;
};


export type MutationUpdateGuideArgs = {
  input: UpdateGuideInput;
};


export type MutationUpdateQuizArgs = {
  input: UpdateQuizInput;
};


export type MutationUpdateUserProfileArgs = {
  input?: InputMaybe<UserProfile>;
};


export type MutationUploadCoverImageArgs = {
  input: FileInfo;
};


export type MutationUploadImageArgs = {
  input: FileInfo;
};

export type Query = {
  __typename?: 'Query';
  chathistory: Array<ChatResponse>;
  guide?: Maybe<Guide>;
  guides?: Maybe<Array<Maybe<Guide>>>;
  image: File;
  images: Array<File>;
  quizAnswers: Array<Maybe<QuizAnswers>>;
  signIn: UserSingIn;
  user: User;
};


export type QueryChathistoryArgs = {
  guideId: Scalars['String']['input'];
};


export type QueryGuideArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGuidesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryImageArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryImagesArgs = {
  guideId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuizAnswersArgs = {
  quizId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySignInArgs = {
  input?: InputMaybe<UserSignInInput>;
};

export type Question = {
  __typename?: 'Question';
  correctAnswerIndex: Scalars['Int']['output'];
  options: Array<Maybe<Scalars['String']['output']>>;
  questionTitle: Scalars['String']['output'];
};

export type QuestionInput = {
  correctAnswerIndex: Scalars['Int']['input'];
  options: Array<InputMaybe<Scalars['String']['input']>>;
  questionTitle: Scalars['String']['input'];
};

export type Quiz = {
  __typename?: 'Quiz';
  body?: Maybe<GenreatedQuiz>;
  description?: Maybe<Scalars['String']['output']>;
  guide?: Maybe<Guide>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type QuizAnswers = {
  __typename?: 'QuizAnswers';
  answers?: Maybe<Scalars['JSON']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  iscompleted?: Maybe<Scalars['Boolean']['output']>;
  quiz?: Maybe<Quiz>;
  user?: Maybe<User>;
};

export type QuizCreationInput = {
  body: GenreatedQuizInput;
  description?: InputMaybe<Scalars['String']['input']>;
  guideId: Scalars['ID']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type QuizInput = {
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type QuizObject = {
  __typename?: 'QuizObject';
  questions?: Maybe<Array<Maybe<Question>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SaveQuizAnswersInput = {
  answers: Scalars['JSON']['input'];
  iscompleted?: InputMaybe<Scalars['Boolean']['input']>;
  quizid: Scalars['ID']['input'];
};

export type UpdateGuideInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuizInput = {
  body?: InputMaybe<GenreatedQuizInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favoriteTopics?: Maybe<Scalars['JSON']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type UserInput = {
  email: Scalars['String']['input'];
};

export type UserProfile = {
  email?: InputMaybe<Scalars['String']['input']>;
  favoriteTopics?: InputMaybe<Scalars['JSON']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserSignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSingIn = {
  __typename?: 'UserSingIn';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type CreateGuideMutationVariables = Exact<{
  input: GuideCreationInput;
}>;


export type CreateGuideMutation = { __typename?: 'Mutation', res: { __typename?: 'Guide', id?: string | null, title?: string | null, tags?: any | null, description?: string | null, body?: string | null } };

export type GuideQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GuideQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', id?: string | null, title?: string | null, body?: string | null, tags?: any | null, user?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } | null };

export type SignInQueryVariables = Exact<{
  input?: InputMaybe<UserSignInInput>;
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'UserSingIn', message: string, token: string } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', email: string, favoriteTopics?: any | null, firstName: string, id: string, lastName: string, middleName?: string | null } };

export type GetGuideQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetGuideQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', id?: string | null, title?: string | null, body?: string | null, tags?: any | null } | null };

export type RemoveGuideCoverMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveGuideCoverMutation = { __typename?: 'Mutation', res?: boolean | null };

export type UpdateGuideMutationVariables = Exact<{
  input: UpdateGuideInput;
}>;


export type UpdateGuideMutation = { __typename?: 'Mutation', res: { __typename?: 'Guide', id?: string | null } };

export type UploadGuideCoverMutationVariables = Exact<{
  input: FileInfo;
}>;


export type UploadGuideCoverMutation = { __typename?: 'Mutation', res: { __typename?: 'File', id?: string | null } };

export type UploadGuideImageMutationVariables = Exact<{
  input: FileInfo;
}>;


export type UploadGuideImageMutation = { __typename?: 'Mutation', res: { __typename?: 'File', id?: string | null } };

export type GuideChatMutationVariables = Exact<{
  input?: InputMaybe<GuideChatRequest>;
}>;


export type GuideChatMutation = { __typename?: 'Mutation', res: { __typename?: 'ChatResponse', content?: string | null, role?: string | null } };

export type ChatMessagesQueryVariables = Exact<{
  guideId: Scalars['String']['input'];
}>;


export type ChatMessagesQuery = { __typename?: 'Query', res: Array<{ __typename?: 'ChatResponse', content?: string | null, role?: string | null }> };

export type GuidesQueryVariables = Exact<{ [key: string]: never; }>;


export type GuidesQuery = { __typename?: 'Query', res?: Array<{ __typename?: 'Guide', description?: string | null, title?: string | null, id?: string | null, tags?: any | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } | null> | null };

export type SaveFavoriteTopicsMutationVariables = Exact<{
  input?: InputMaybe<UserProfile>;
}>;


export type SaveFavoriteTopicsMutation = { __typename?: 'Mutation', res: { __typename?: 'User', id: string } };


export const CreateGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideCreationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]} as unknown as DocumentNode<CreateGuideMutation, CreateGuideMutationVariables>;
export const GuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Guide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GuideQuery, GuideQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSignInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignInQuery, SignInQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteTopics"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const GetGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetGuideQuery, GetGuideQueryVariables>;
export const RemoveGuideCoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGuideCover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"removeImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveGuideCoverMutation, RemoveGuideCoverMutationVariables>;
export const UpdateGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGuideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateGuideMutation, UpdateGuideMutationVariables>;
export const UploadGuideCoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadGuideCover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"uploadCoverImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadGuideCoverMutation, UploadGuideCoverMutationVariables>;
export const UploadGuideImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadGuideImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"uploadImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadGuideImageMutation, UploadGuideImageMutationVariables>;
export const GuideChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GuideChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideChatRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GuideChatMutation, GuideChatMutationVariables>;
export const ChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"chathistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"guideId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ChatMessagesQuery, ChatMessagesQueryVariables>;
export const GuidesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Guides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GuidesQuery, GuidesQueryVariables>;
export const SaveFavoriteTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveFavoriteTopics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SaveFavoriteTopicsMutation, SaveFavoriteTopicsMutationVariables>;