export function isTestCompleted(answers: Array<number | undefined>) {
    const unAnsweredQuestions = answers.filter((answer) => {
        return answer === undefined;
    }).length;
    return unAnsweredQuestions == 0;
}