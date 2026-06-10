import { sejamAccountTypes, sejamRiskTestQuestions, sejamUserTypes } from "../staticData/StaticData";

export enum RiskTestActionKind {
    agreeTest = 'agreeTest',
    setDescription = 'setDescription',
    answer = 'answer',
    getTestResult = 'getTestResult',
    reset = 'reset'
}

interface RistTestAction {
    type: RiskTestActionKind;
    payload: any;
}

export type SejamRiskTestState = {
    agreeTest: boolean,
    moreInfo: string,
    answers: Array<number | undefined>,
    suggestedAccount?: Array<any>,
    riskLevel?: string
}

export const initialRiskTestState = {
    agreeTest: false,
    moreInfo: '',
    answers: sejamRiskTestQuestions.map(() => undefined)
};

export function riskTestReducer(state: SejamRiskTestState, action: RistTestAction): SejamRiskTestState {
    const { type, payload } = action;
    switch (type) {
        case RiskTestActionKind.agreeTest:
            return {
                ...state,
                agreeTest: payload,
            };
        case RiskTestActionKind.setDescription:
            return {
                ...state,
                moreInfo: payload,
            };
        case RiskTestActionKind.answer: {
            const { question, answer } = payload;
            const _answers = [...state.answers];
            _answers[question] = answer;
            return {
                ...state,
                answers: _answers
            }
        }
        case RiskTestActionKind.getTestResult: {
            let { accountType, riskLevel } = getSuggestedAccount(payload, state.answers);
            return {
                ...state,
                suggestedAccount: accountType,
                riskLevel: riskLevel
            }
        }
        case RiskTestActionKind.reset: {
            return payload;
        }
        default:
            return state;
    }
}

function getScore(answerKeys: any, answers: Array<number | undefined>) {
    let score = 0;
    answers.forEach((answer, index) => {
        score = score + answerKeys[index][answer!];
    });
    return score
}

function getUserType(answerKeys: any, answers: Array<number | undefined>) {
    let score = getScore(answerKeys, answers);
    if (score >= 73) {
        return sejamUserTypes[4];
    }
    if (score >= 55) {
        return sejamUserTypes[3];
    }
    if (score >= 37) {
        return sejamUserTypes[2];
    }
    if (score >= 19) {
        return sejamUserTypes[1];
    }
    return sejamUserTypes[0];
}

function getSuggestedAccount(answerKeys: any, answers: Array<number | undefined>) {
    let riskLevel = getUserType(answerKeys, answers);
    let accountType;
    if (riskLevel == sejamUserTypes[4]) {
        accountType = [sejamAccountTypes[4], sejamAccountTypes[5], sejamAccountTypes[6], sejamAccountTypes[7]];
    }
    else if (riskLevel == sejamUserTypes[3]) {
        accountType = [sejamAccountTypes[3]];
    }
    else if (riskLevel == sejamUserTypes[2]) {
        accountType = [sejamAccountTypes[2]];
    }
    else if (riskLevel == sejamUserTypes[1]) {
        accountType = [sejamAccountTypes[1]];
    }
    else {
        accountType = [sejamAccountTypes[0]];
    }
    return {
        accountType: accountType,
        riskLevel: riskLevel
    }
}