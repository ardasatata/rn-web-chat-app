// Generate PNG Image imports using node.
// TODO: better handling on different file names.

const fs = require("fs")

const svgFileNames = () => {
    const array = fs
        .readdirSync("packages/app/src/assets/svgs")
        .filter((file) => file.endsWith(".svg"))
        .map((file) => file.replace(".svg", ""))

    return Array.from(new Set(array))
}

// export {default as ImportirNavbar} from "./importirNavbar.svg"

const generate = () => {
    const properties = svgFileNames()
        .map((name) => `export {default as ${name.charAt(0).toUpperCase() + name.slice(1)}} from "./${name}.svg"`)
        .join("\n")

    console.log(properties)
    const string = `${properties}`

    fs.writeFileSync("packages/app/src/assets/svgs/index.ts", string, "utf8")
    console.log(`
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⣰⣿⣿⣿⡿⠿⠻⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠏⠀⣴⣿⣿⣿⠉⠀⠀⠀⠀⠀⠈⢻⣿⣿⣇⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣼⣿⣿⡏⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡀⠀⠀
⠀⠀⠀⣰⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀
⠀⠀⢰⣿⣿⡿⣿⣿⣿⡇⠀⠘⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⠁⠀⠀
⠀⠀⣿⣿⣿⠁⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⠃⠀⠀⠀
⠀⢰⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⢸⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠉⢉⣿⣿⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣇⠀⣿⣿⣿⠀⠀⠀⠀⠀⢀⣤⣤⣤⡀⠀⠀⢸⣿⣿⣿⣷⣦⠀⠀⠀
⠀⠀⢻⣿⣿⣶⣿⣿⣿⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⡀⠀⠉⠉⠻⣿⣿⡇⠀⠀
⠀⠀⠀⠛⠿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠈⠹⣿⣿⣇⣀⠀⣠⣾⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠛⠋⠉⠉⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁             
 _____   ____ _ 
/ __\\ \\ / / _\` |
\\__ \\\\ V / (_| |
|___/ \\_/ \\__, |
          |___/                                                                                                                                              
  _______  _______ .__   __.  _______ .______          ___   .___________. _______  _______   __  
 /  _____||   ____||  \\ |  | |   ____||   _  \\        /   \\  |           ||   ____||       \\ |  | 
|  |  __  |  |__   |   \\|  | |  |__   |  |_)  |      /  ^  \\ \`---|  |----\`|  |__   |  .--.  ||  | 
|  | |_ | |   __|  |  . \`  | |   __|  |      /      /  /_\\  \\    |  |     |   __|  |  |  |  ||  | 
|  |__| | |  |____ |  |\\   | |  |____ |  |\\  \\----./  _____  \\   |  |     |  |____ |  '--'  ||__| 
 \\______| |_______||__| \\__| |_______|| _| \`._____/__/     \\__\\  |__|     |_______||_______/ (__) 
    `)
}

generate()
