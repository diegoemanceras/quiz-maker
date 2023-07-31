import { OpenTriviaQuestion } from "./open-trivia-question";

export interface OpenTriviaResponse {
    response_code: number;
    results: OpenTriviaQuestion[];
}
