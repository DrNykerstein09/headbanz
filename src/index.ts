import { Player } from "./Class/Player.js";
import inquirer from "inquirer";
// import colors from "colors";
import figlet from "figlet";
import data from "./data.js";

type eachD = {
  name: string;
  properties: boolean[];
};
type datta = eachD[];

const typedData: datta = data as datta;

export function main() {
  const player = new Player(data);
  const questions: boolean[] = [];
  let user1: string; // almacena el nickname del primer jugador
  const introduccion = "Este juego está basado en el juego popular heabanz";

  // Es ejecutada cuando el banco de preguntas por base se acaba
  function sinPreguntas() {
    console.log(`Has pensado en ${player.name}`);
    figlet(`Has pensado en ${player.name}`, (error, result) => {
      console.log(result);
    });
  }

  console.log(introduccion);

  // Pide el nickname del primer jugador
  inquirer
    .prompt({
      name: "jugador1", // Se le asigna el valor a la propiedad name
      type: "input", // Se le asigna el tipo de input por el cual se va a mostrar las preguntas
      message: "Ingresa tu nombre:", // Mensaje de inicialización
    })
    // Genera una promesa y retorna un valor que es asignado por argumento
    .then((user) => {
      const regex = /^[a-zA-Z0-9]{1,15}$/;

      if (!regex.test(user.jugador1)) {
        console.log("Nombre no válido");
        console.log("Vuelve a iniciar el juego e ingresa un nombre válido");
        return;
      }
      //Se le atribuye el valor del obejeto user
      user1 = user.jugador1;

      data.forEach((element) => {
        console.log(element.name);
      });

      inquirer
        .prompt({
          name: "respuestas",
          message: "Elige mentalmente un objeto y contesta las peguntas",
          type: "confirm",
        })
        .then((response) => {
          function guest1(user1: string) {
            const opciones = player.getQuestion(questions); // obtiene las opciones de la pregunta actual

            inquirer
              .prompt([
                {
                  name: "respuesta",
                  message: opciones,
                  type: "list",
                  choices: ["Sí", "No"],
                },
              ])
              // El objeto retornado es la respuesta seleccionada por el jugador
              .then((answer) => {
                if (answer.respuesta === "Sí") {
                  questions.push(true);
                } else {
                  questions.push(false);
                }
                console.log(player.guessed)
                if (player.guessed === true) {
                  const headBanz = player.getHeadBanz(questions);
                  sinPreguntas();
                  return;
                } else {
                  guest1(user1);
                }
              });
          }

          if (player.guessed === true) {
            sinPreguntas();
            return;
          } else {
            guest1(user1);
          }
        });
    });
}

main();
