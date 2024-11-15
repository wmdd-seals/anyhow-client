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
  /** Custom scalar for Date Object */
  Date: { input: any; output: any; }
  /** Custom scalar for JSON Object and Array */
  JSON: { input: any; output: any; }
  /** Base64 to Stream Conversion */
  Stream: { input: any; output: any; }
};

export type AddBookmarkInput = {
  guideId: Scalars['ID']['input'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  content?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type CheckIfGuideCompletedInput = {
  guideId?: InputMaybe<Scalars['ID']['input']>;
};

export type DateCount = {
  __typename?: 'DateCount';
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['String']['output']>;
};

export type DateRangeInput = {
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
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
  bookmark?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  liked?: Maybe<Scalars['Boolean']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  quiz?: Maybe<Quiz>;
  rating?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
};

export type GuideChatRequest = {
  guideId: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};

export type GuideCompleted = {
  __typename?: 'GuideCompleted';
  createdAt?: Maybe<Scalars['String']['output']>;
  guide?: Maybe<Guide>;
  guideId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type GuideCompletedCountsResult = {
  __typename?: 'GuideCompletedCountsResult';
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['String']['output']>;
};

export type GuideCompletedDateRange = {
  end?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type GuideCreationInput = {
  body: Scalars['String']['input'];
  description: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  tags: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
};

export type GuideViewCountByGuideIdInput = {
  guideId: Scalars['ID']['input'];
};

export type GuideViewCountByGuideIdResult = {
  __typename?: 'GuideViewCountByGuideIdResult';
  count?: Maybe<Scalars['Int']['output']>;
  guideId?: Maybe<Scalars['ID']['output']>;
};

export type GuideViewCountInDateRangeInput = {
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
};

export type GuideViewCountInDateRangeInputResult = {
  __typename?: 'GuideViewCountInDateRangeInputResult';
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['String']['output']>;
};

export type GuideViewInput = {
  guideId: Scalars['ID']['input'];
};

export type GuideViewResult = {
  __typename?: 'GuideViewResult';
  count?: Maybe<Scalars['Int']['output']>;
  guideId?: Maybe<Scalars['ID']['output']>;
};

export type GuideViews = {
  __typename?: 'GuideViews';
  createdAt?: Maybe<Scalars['String']['output']>;
  guide?: Maybe<Guide>;
  guideId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark: Scalars['Boolean']['output'];
  createGuide: Guide;
  createQuiz: Quiz;
  generateQuiz: Quiz;
  guideChat: ChatResponse;
  removeBookmark: Scalars['Boolean']['output'];
  removeGuide: Guide;
  removeImage?: Maybe<Scalars['Boolean']['output']>;
  reviewGuide: Scalars['Boolean']['output'];
  revokeGuideReview: Scalars['Boolean']['output'];
  saveQuizAnswers: QuizAnswers;
  signupUser: User;
  storeGuideCompleted: GuideCompleted;
  storeGuideView: GuideViews;
  updateGuide: Guide;
  updateQuiz: Quiz;
  updateUserProfile: User;
  uploadCoverImage: File;
  uploadImage: File;
};


export type MutationAddBookmarkArgs = {
  input: AddBookmarkInput;
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


export type MutationRemoveBookmarkArgs = {
  input: RemoveBookmarkInput;
};


export type MutationRemoveGuideArgs = {
  input: RemoveGuideInput;
};


export type MutationRemoveImageArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationReviewGuideArgs = {
  input: ReviewGuideInput;
};


export type MutationRevokeGuideReviewArgs = {
  input: RevokeGuideReviewInput;
};


export type MutationSaveQuizAnswersArgs = {
  input?: InputMaybe<SaveQuizAnswersInput>;
};


export type MutationSignupUserArgs = {
  input: UserCreateInput;
};


export type MutationStoreGuideCompletedArgs = {
  input: StoreGuideCompletedInput;
};


export type MutationStoreGuideViewArgs = {
  input: GuideViewInput;
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
  bookmarks?: Maybe<Array<Maybe<Guide>>>;
  chathistory: Array<ChatResponse>;
  checkIfGuideCompleted: GuideCompleted;
  guide?: Maybe<Guide>;
  guideCompletedCounts: Array<GuideCompletedCountsResult>;
  guideCompletedList: Array<GuideCompleted>;
  guideCreatedCountInDateRange: Array<Maybe<DateCount>>;
  guideViewCount: GuideViewResult;
  guideViewCountByGuideId: GuideViewCountByGuideIdResult;
  guideViewCountInDateRange: Array<GuideViewCountInDateRangeInputResult>;
  guideViews: Array<GuideViews>;
  guides?: Maybe<Array<Maybe<Guide>>>;
  image: File;
  images: Array<File>;
  quizAnswers: Array<Maybe<QuizAnswers>>;
  quizAnswersByUser: Array<Maybe<QuizAnswers>>;
  signIn: UserSingIn;
  user: User;
};


export type QueryChathistoryArgs = {
  guideId: Scalars['String']['input'];
};


export type QueryCheckIfGuideCompletedArgs = {
  input?: InputMaybe<CheckIfGuideCompletedInput>;
};


export type QueryGuideArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGuideCompletedCountsArgs = {
  input?: InputMaybe<GuideCompletedDateRange>;
};


export type QueryGuideCreatedCountInDateRangeArgs = {
  input: DateRangeInput;
};


export type QueryGuideViewCountArgs = {
  input: GuideViewInput;
};


export type QueryGuideViewCountByGuideIdArgs = {
  input: GuideViewCountByGuideIdInput;
};


export type QueryGuideViewCountInDateRangeArgs = {
  input: GuideViewCountInDateRangeInput;
};


export type QueryGuidesArgs = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
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


export type QueryQuizAnswersByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
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

export type RemoveBookmarkInput = {
  guideId: Scalars['ID']['input'];
};

export type RemoveGuideInput = {
  id: Scalars['ID']['input'];
};

export type ReviewGuideInput = {
  id: Scalars['ID']['input'];
  liked: Scalars['Boolean']['input'];
};

export type RevokeGuideReviewInput = {
  id: Scalars['ID']['input'];
};

export type SaveQuizAnswersInput = {
  answers: Scalars['JSON']['input'];
  iscompleted?: InputMaybe<Scalars['Boolean']['input']>;
  quizid: Scalars['ID']['input'];
};

export type StoreGuideCompletedInput = {
  guideId: Scalars['ID']['input'];
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

export type MutationMutationVariables = Exact<{
  input: RemoveGuideInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', removeGuide: { __typename?: 'Guide', bookmark?: boolean | null, createdAt?: any | null, description?: string | null, id?: string | null, published?: boolean | null, rating?: number | null, tags?: any | null, title?: string | null, user?: { __typename?: 'User', firstName: string, id: string, lastName: string } | null } };

export type GuideViewCountByGuideIdQueryVariables = Exact<{
  input: GuideViewCountByGuideIdInput;
}>;


export type GuideViewCountByGuideIdQuery = { __typename?: 'Query', res: { __typename?: 'GuideViewCountByGuideIdResult', count?: number | null, guideId?: string | null } };

export type GetQuizIdQueryVariables = Exact<{
  guideId: Scalars['ID']['input'];
}>;


export type GetQuizIdQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', id?: string | null, quiz?: { __typename?: 'Quiz', id?: string | null } | null } | null };

export type GetQuizQueryVariables = Exact<{
  guideId: Scalars['ID']['input'];
}>;


export type GetQuizQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', quiz?: { __typename?: 'Quiz', id?: string | null, body?: { __typename?: 'GenreatedQuiz', quiz?: { __typename?: 'QuizObject', questions?: Array<{ __typename?: 'Question', questionTitle: string, options: Array<string | null>, correctAnswerIndex: number } | null> | null } | null } | null } | null } | null };

export type CreateGuideMutationVariables = Exact<{
  input: GuideCreationInput;
}>;


export type CreateGuideMutation = { __typename?: 'Mutation', res: { __typename?: 'Guide', id?: string | null, title?: string | null, tags?: any | null, description?: string | null, body?: string | null } };

export type StoreGuideCompletedMutationVariables = Exact<{
  input: StoreGuideCompletedInput;
}>;


export type StoreGuideCompletedMutation = { __typename?: 'Mutation', storeGuideCompleted: { __typename?: 'GuideCompleted', id?: string | null, guideId?: string | null, userId?: string | null, createdAt?: string | null } };

export type RemoveGuideCoverMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveGuideCoverMutation = { __typename?: 'Mutation', res?: boolean | null };

export type UploadGuideCoverMutationVariables = Exact<{
  input: FileInfo;
}>;


export type UploadGuideCoverMutation = { __typename?: 'Mutation', res: { __typename?: 'File', id?: string | null } };

export type GuideCompletedCountsQueryVariables = Exact<{
  input?: InputMaybe<GuideCompletedDateRange>;
}>;


export type GuideCompletedCountsQuery = { __typename?: 'Query', res: Array<{ __typename?: 'GuideCompletedCountsResult', count?: number | null, date?: string | null }> };

export type GuideCompletedListQueryVariables = Exact<{ [key: string]: never; }>;


export type GuideCompletedListQuery = { __typename?: 'Query', res: Array<{ __typename?: 'GuideCompleted', createdAt?: string | null, id?: string | null, guideId?: string | null, guide?: { __typename?: 'Guide', body?: string | null, createdAt?: any | null, description?: string | null, id?: string | null, bookmark?: boolean | null, liked?: boolean | null, rating?: number | null, tags?: any | null, title?: string | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } | null }> };

export type QuizAnswersByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type QuizAnswersByUserQuery = { __typename?: 'Query', quizAnswersByUser: Array<{ __typename?: 'QuizAnswers', id?: string | null } | null> };

export type GuidesCreatedQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GuidesCreatedQuery = { __typename?: 'Query', res?: Array<{ __typename?: 'Guide', description?: string | null, id?: string | null, published?: boolean | null, rating?: number | null, title?: string | null, body?: string | null, createdAt?: any | null } | null> | null };

export type GuideViewCountInDateRangeQueryVariables = Exact<{
  input: GuideViewCountInDateRangeInput;
}>;


export type GuideViewCountInDateRangeQuery = { __typename?: 'Query', res: Array<{ __typename?: 'GuideViewCountInDateRangeInputResult', count?: number | null, date?: string | null }> };

export type GuideQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GuideQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', id?: string | null, title?: string | null, liked?: boolean | null, rating?: number | null, body?: string | null, bookmark?: boolean | null, tags?: any | null, user?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } | null };

export type ReviewGuideMutationVariables = Exact<{
  input: ReviewGuideInput;
}>;


export type ReviewGuideMutation = { __typename?: 'Mutation', res: boolean };

export type RevokeGuideReviewMutationVariables = Exact<{
  input: RevokeGuideReviewInput;
}>;


export type RevokeGuideReviewMutation = { __typename?: 'Mutation', res: boolean };

export type AddBookmarkMutationVariables = Exact<{
  input: AddBookmarkInput;
}>;


export type AddBookmarkMutation = { __typename?: 'Mutation', res: boolean };

export type RemoveBookmarkMutationVariables = Exact<{
  input: RemoveBookmarkInput;
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', res: boolean };

export type GuideViewCountByGuideQueryVariables = Exact<{
  input: GuideViewCountByGuideIdInput;
}>;


export type GuideViewCountByGuideQuery = { __typename?: 'Query', res: { __typename?: 'GuideViewCountByGuideIdResult', count?: number | null, guideId?: string | null } };

export type StoreGuideViewMutationVariables = Exact<{
  input: GuideViewInput;
}>;


export type StoreGuideViewMutation = { __typename?: 'Mutation', storeGuideView: { __typename?: 'GuideViews', createdAt?: string | null, guideId?: string | null, id?: string | null, userId?: string | null } };

export type SignInQueryVariables = Exact<{
  input?: InputMaybe<UserSignInInput>;
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'UserSingIn', message: string, token: string } };

export type SignupUserMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'User', id: string } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', email: string, favoriteTopics?: any | null, firstName: string, id: string, lastName: string, middleName?: string | null } };

export type GetGuideQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetGuideQuery = { __typename?: 'Query', res?: { __typename?: 'Guide', id?: string | null, title?: string | null, body?: string | null, tags?: any | null } | null };

export type UpdateGuideMutationVariables = Exact<{
  input: UpdateGuideInput;
}>;


export type UpdateGuideMutation = { __typename?: 'Mutation', res: { __typename?: 'Guide', id?: string | null } };

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

export type PanelGuidesQueryVariables = Exact<{ [key: string]: never; }>;


export type PanelGuidesQuery = { __typename?: 'Query', res?: Array<{ __typename?: 'Guide', body?: string | null, createdAt?: any | null, description?: string | null, id?: string | null, bookmark?: boolean | null, liked?: boolean | null, rating?: number | null, tags?: any | null, title?: string | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } | null> | null };

export type SlideGuidesQueryVariables = Exact<{ [key: string]: never; }>;


export type SlideGuidesQuery = { __typename?: 'Query', res?: Array<{ __typename?: 'Guide', body?: string | null, description?: string | null, id?: string | null, title?: string | null, bookmark?: boolean | null, liked?: boolean | null, rating?: number | null, tags?: any | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } | null> | null };

export type SaveFavoriteTopicsMutationVariables = Exact<{
  input?: InputMaybe<UserProfile>;
}>;


export type SaveFavoriteTopicsMutation = { __typename?: 'Mutation', res: { __typename?: 'User', id: string } };

export type GetGuideCompletedListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuideCompletedListQuery = { __typename?: 'Query', res: Array<{ __typename?: 'GuideCompleted', guideId?: string | null }> };

export type GetQuizAnswersQueryVariables = Exact<{
  quizId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuizAnswersQuery = { __typename?: 'Query', res: Array<{ __typename?: 'QuizAnswers', answers?: any | null } | null> };

export type SaveQuizAnswersMutationVariables = Exact<{
  input?: InputMaybe<SaveQuizAnswersInput>;
}>;


export type SaveQuizAnswersMutation = { __typename?: 'Mutation', res: { __typename?: 'QuizAnswers', id?: string | null, answers?: any | null } };

export type GenerateQuizMutationVariables = Exact<{
  input: GenerateQuizInput;
}>;


export type GenerateQuizMutation = { __typename?: 'Mutation', res: { __typename?: 'Quiz', id?: string | null, body?: { __typename?: 'GenreatedQuiz', quiz?: { __typename?: 'QuizObject', questions?: Array<{ __typename?: 'Question', questionTitle: string, options: Array<string | null>, correctAnswerIndex: number } | null> | null } | null } | null } };

export type PublishGuideMutationVariables = Exact<{
  input: UpdateGuideInput;
}>;


export type PublishGuideMutation = { __typename?: 'Mutation', res: { __typename?: 'Guide', id?: string | null } };

export type PublishQuizMutationVariables = Exact<{
  input: UpdateQuizInput;
}>;


export type PublishQuizMutation = { __typename?: 'Mutation', res: { __typename?: 'Quiz', id?: string | null } };

export type UpdateQuizMutationVariables = Exact<{
  input: UpdateQuizInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', res: { __typename?: 'Quiz', id?: string | null } };

export type GuideCreatedCountInDateRangeQueryVariables = Exact<{
  input: DateRangeInput;
}>;


export type GuideCreatedCountInDateRangeQuery = { __typename?: 'Query', res: Array<{ __typename?: 'DateCount', count?: number | null, date?: string | null } | null> };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveGuideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GuideViewCountByGuideIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideViewCountByGuideId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideViewCountByGuideIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideViewCountByGuideId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"guideId"}}]}}]}}]} as unknown as DocumentNode<GuideViewCountByGuideIdQuery, GuideViewCountByGuideIdQueryVariables>;
export const GetQuizIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizIdQuery, GetQuizIdQueryVariables>;
export const GetQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswerIndex"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizQuery, GetQuizQueryVariables>;
export const CreateGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideCreationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"createGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]} as unknown as DocumentNode<CreateGuideMutation, CreateGuideMutationVariables>;
export const StoreGuideCompletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StoreGuideCompleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoreGuideCompletedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storeGuideCompleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"guideId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<StoreGuideCompletedMutation, StoreGuideCompletedMutationVariables>;
export const RemoveGuideCoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGuideCover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"removeImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveGuideCoverMutation, RemoveGuideCoverMutationVariables>;
export const UploadGuideCoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadGuideCover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"uploadCoverImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadGuideCoverMutation, UploadGuideCoverMutationVariables>;
export const GuideCompletedCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideCompletedCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideCompletedDateRange"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideCompletedCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GuideCompletedCountsQuery, GuideCompletedCountsQueryVariables>;
export const GuideCompletedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideCompletedList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideCompletedList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"guide"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"guideId"}}]}}]}}]} as unknown as DocumentNode<GuideCompletedListQuery, GuideCompletedListQueryVariables>;
export const QuizAnswersByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizAnswersByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quizAnswersByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QuizAnswersByUserQuery, QuizAnswersByUserQueryVariables>;
export const GuidesCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuidesCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guides"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GuidesCreatedQuery, GuidesCreatedQueryVariables>;
export const GuideViewCountInDateRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideViewCountInDateRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideViewCountInDateRangeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideViewCountInDateRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GuideViewCountInDateRangeQuery, GuideViewCountInDateRangeQueryVariables>;
export const GuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Guide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GuideQuery, GuideQueryVariables>;
export const ReviewGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReviewGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewGuideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"reviewGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ReviewGuideMutation, ReviewGuideMutationVariables>;
export const RevokeGuideReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeGuideReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeGuideReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"revokeGuideReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RevokeGuideReviewMutation, RevokeGuideReviewMutationVariables>;
export const AddBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookmarkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"addBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const RemoveBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveBookmarkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"removeBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const GuideViewCountByGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideViewCountByGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideViewCountByGuideIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideViewCountByGuideId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"guideId"}}]}}]}}]} as unknown as DocumentNode<GuideViewCountByGuideQuery, GuideViewCountByGuideQueryVariables>;
export const StoreGuideViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StoreGuideView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideViewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storeGuideView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"guideId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<StoreGuideViewMutation, StoreGuideViewMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSignInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignInQuery, SignInQueryVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteTopics"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const GetGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetGuideQuery, GetGuideQueryVariables>;
export const UpdateGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGuideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateGuideMutation, UpdateGuideMutationVariables>;
export const UploadGuideImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadGuideImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"uploadImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadGuideImageMutation, UploadGuideImageMutationVariables>;
export const GuideChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GuideChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GuideChatRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GuideChatMutation, GuideChatMutationVariables>;
export const ChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"chathistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"guideId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guideId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<ChatMessagesQuery, ChatMessagesQueryVariables>;
export const PanelGuidesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PanelGuides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<PanelGuidesQuery, PanelGuidesQueryVariables>;
export const SlideGuidesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SlideGuides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<SlideGuidesQuery, SlideGuidesQueryVariables>;
export const SaveFavoriteTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveFavoriteTopics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SaveFavoriteTopicsMutation, SaveFavoriteTopicsMutationVariables>;
export const GetGuideCompletedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuideCompletedList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideCompletedList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"guideId"}}]}}]}}]} as unknown as DocumentNode<GetGuideCompletedListQuery, GetGuideCompletedListQueryVariables>;
export const GetQuizAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"quizAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]} as unknown as DocumentNode<GetQuizAnswersQuery, GetQuizAnswersQueryVariables>;
export const SaveQuizAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveQuizAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveQuizAnswersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"saveQuizAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]} as unknown as DocumentNode<SaveQuizAnswersMutation, SaveQuizAnswersMutationVariables>;
export const GenerateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateQuizInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"generateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswerIndex"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GenerateQuizMutation, GenerateQuizMutationVariables>;
export const PublishGuideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishGuide"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGuideInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateGuide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PublishGuideMutation, PublishGuideMutationVariables>;
export const PublishQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuizInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PublishQuizMutation, PublishQuizMutationVariables>;
export const UpdateQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuizInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"updateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const GuideCreatedCountInDateRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GuideCreatedCountInDateRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateRangeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"res"},"name":{"kind":"Name","value":"guideCreatedCountInDateRange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GuideCreatedCountInDateRangeQuery, GuideCreatedCountInDateRangeQueryVariables>;