class Question {
    question: string;
    questionChapter: number;
    A: string;
    B: string;
    C: string;
    D: string;

    constructor(
        question: string,
        questionChapter: number,
        A: string,
        B: string,
        C: string,
        D: string
    ) {
        this.question = question;
        this.questionChapter = questionChapter;
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
    }
}

export default Question;