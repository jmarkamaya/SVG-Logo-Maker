const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
    run() {
        return inquirer.prompt([
            {
                name: "text",
                type: "input",
                message:
                    "Enter text for the logo. (Must not be more than 3 characters.)",
                validate: (text) =>
                    text.length <= 3 ||
                    "The message must not contain more than 3 characters",
            },
            {
                name: "textColor",
                type: "input",
                message: "Enter text color for logo",
            },
            {
                name: "shapeType",
                type: "list",
                message: "Select type of shape for logo",
                choices: ["circle", "square", "triangle"],
            },
            {
                name: "shapeColor",
                type: "input",
                message: "Select the color of the shape",
            },

        ]).then(({ text, textColor, shapeType, shapeColor }) => {
            let shape;
            // google switch case
            switch (shapeType) {

                case "circle":
                    shape = new Circle();
                    break;

                case "square":
                    shape = new Square();
                    break;

                default:
                    shape = new Triangle();
                    break;
            }
            shape.setColor(shapeColor)
            const svg = new SVG();
            svg.setText(text, textColor);
            svg.setShape(shape);
            return writeFile("logo.svg", svg.render());
        })
            .then(() => {
                console.log("Generated logo.svg");
            })
            .catch((error) => {
                console.log(error);
                console.log("Oops! Something went wrong.");

            })
    }
}

module.exports = CLI;