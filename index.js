const fs = require("fs");
const inquirer = require("inquirer");
const { Triangle, Circle, Square } = require("./lib/shapes");

async function generateLogo() {
  const answers = await inquirer.prompt([
    {
      // 1) I can enter up to three characters
      type: "input",
      name: "text",
      message: "Enter up to three characters for the logo:",
    },
    {
      // 2) I can enter a color keyword (OR a hexadecimal number)
      type: "input",
      name: "textColor",
      message: "Enter the text color (keyword or hexadecimal number):",
    },
    {
      // 3) I am presented with a list of shapes to choose from: circle, triangle, and square
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: ["circle", "triangle", "square"],
    },
    {
      // 4) I can enter a color keyword (OR a hexadecimal number)
      type: "input",
      name: "shapeColor",
      message: "Enter the shape color (keyword or hexadecimal number):",
    },
  ]);

  const { text, textColor, shape, shapeColor } = answers;

  let shapeInstance;
  switch (shape) {
    case "circle":
      shapeInstance = new Circle();
      break;
    case "triangle":
      shapeInstance = new Triangle();
      break;
    case "square":
      shapeInstance = new Square();
      break;
    default:
      throw new Error("Invalid shape");
  }

  shapeInstance.setColor(shapeColor);
  // 7) I am shown a 300x200 pixel image that matches the criteria I entered
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeInstance.render()}
      <text x="150" y="100" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `;
  // 5) an SVG file is created named `logo.svg`
  await fs.writeFileSync("logo.svg", svgString.trim());
  // 6) the output text "Generated logo.svg" is printed in the command line
  console.log("Generated logo.svg");
}

generateLogo();
