/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([{
        type: "input",
        name: "url",
        message: "Please enter the URL you wish to use for the QR code:",
    }])
    .then((answers) => {
        // pass answers.url to qr-image
        console.log(`URL Entered: ${answers.url}`);
        var qr_svg = qr.imageSync(answers.url, {type: 'svg'});
        fs.writeFileSync("qr_img.svg", qr_svg);
        console.log("QR image generated")
        fs.writeFileSync("URL.txt", answers.url);
        console.log("URL saved to URL.txt");
})
    .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});
