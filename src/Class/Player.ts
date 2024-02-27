type eachD = {
  name: string;
  properties: boolean[];
};
type datta = eachD[];

export class Player {
  answer: boolean = false;
  answers: boolean[] = [];
  numQuestion: number = 0;
  data: datta;
  isDecide: boolean | string = false;
  arrayQuestionDecide: string[] = [];
  guessed: boolean = false;
  name: string = "";

  constructor(data: datta) {
    this.data = data;
  }

  //true
  getQuestion(answers: boolean[]): string {
    if (answers[0] === undefined) {
      return "¿es un animal?";
    } else if (answers[0] === true) {
      //blablabla
      if (typeof answers[1] === "boolean" && answers[2] === undefined) {
        return "¿es peludo ó tiene plumaje?";
      } else if (typeof answers[2] === "boolean" && answers[3] === undefined) {
        return "¿es animal de casa?";
      } else if (typeof answers[3] === "boolean" && answers[4] === undefined) {
        return "¿posa 4 patas?";
      } else if (typeof answers[4] === "boolean") {
        return this.getHeadBanz(answers);
      }
      return "¿se cría para su comsumo?";
    } else if (answers[0] === false && answers[1] === undefined) {
      return "¿es una fruta?";
    } else if (answers[0] === false && answers[1] === true) {
      //blablabla
      if (typeof answers[2] === "boolean" && answers[3] === undefined) {
        return "¿es redonda?";
      } else if (typeof answers[3] === "boolean" && answers[4] === undefined) {
        return "¿es grande?";
      } else if (typeof answers[4] === "boolean") {
        return this.getHeadBanz(answers);
      }
      return "¿es roja?";
    } else if (
      answers[0] === false &&
      answers[1] === false &&
      answers[2] === undefined
    ) {
      return "¿es un país?";
    } else if (
      answers[0] === false &&
      answers[1] === false &&
      answers[2] === true
    ) {
      if (typeof answers[3] === "boolean" && answers[4] === undefined) {
        return "¿se habla inglés?";
      } else if (typeof answers[4] === "boolean" && answers[5] === undefined) {
        return "¿tiene mar?";
      } else if (typeof answers[5] === "boolean" && answers[6] === undefined) {
        return "¿el país tiene una A en su nombre?";
      } else if (typeof answers[6] === "boolean") {
        return this.getHeadBanz(answers);
      }
      return "¿es un país desarrollado?";
    }
    if (typeof answers[4] === "boolean" && answers[5] === undefined) {
      return "¿contiene picante/salsa?";
    } else if (typeof answers[5] === "boolean") {
      return this.getHeadBanz(answers);
    }
    return "¿es dulce?";
  }

  pushAnswer(answer: boolean): void {
    this.answers.push(answer);
  }
  getHeadBanz(answers: boolean[]): string {
    const foundHeadbandName = this.data.find((data) => {
      return JSON.stringify(data.properties) === JSON.stringify(answers);
    });

    if (foundHeadbandName) {
      console.log(foundHeadbandName.name);
      this.guessed = true;
      this.name = foundHeadbandName.name;
      return foundHeadbandName.name;
    } else {
      this.guessed = true;
      return "Headband no encontrada";
    }
  }
}
