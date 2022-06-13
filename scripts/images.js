// Generate PNG Image imports using node.
// TODO: better handling on different file names.

const fs = require("fs")

const imageFileNames = () => {
    const array = fs
        .readdirSync("packages/app/src/assets/images")
        .filter((file) => file.endsWith(".png"))
        .map((file) => file.replace(".png", ""))

    return Array.from(new Set(array))
}

const generate = () => {
    const properties = imageFileNames()
        .map((name) => `${name}: require('./${name}.png')`)
        .join(",\n  ")

    console.log(properties)
    const string = `export const images = {
  ${properties}
}
`

    fs.writeFileSync("packages/app/src/assets/images/index.ts", string, "utf8")
    console.log(`
 __  .___  ___.      ___       _______  _______                                                   
|  | |   \\/   |     /   \\     /  _____||   ____|                                                  
|  | |  \\  /  |    /  ^  \\   |  |  __  |  |__                                                     
|  | |  |\\/|  |   /  /_\\  \\  |  | |_ | |   __|                                                    
|  | |  |  |  |  /  _____  \\ |  |__| | |  |____                                                   
|__| |__|  |__| /__/     \\__\\ \\______| |_______|                                                  
                                                                                                  
  _______  _______ .__   __.  _______ .______          ___   .___________. _______  _______   __  
 /  _____||   ____||  \\ |  | |   ____||   _  \\        /   \\  |           ||   ____||       \\ |  | 
|  |  __  |  |__   |   \\|  | |  |__   |  |_)  |      /  ^  \\ \`---|  |----\`|  |__   |  .--.  ||  | 
|  | |_ | |   __|  |  . \`  | |   __|  |      /      /  /_\\  \\    |  |     |   __|  |  |  |  ||  | 
|  |__| | |  |____ |  |\\   | |  |____ |  |\\  \\----./  _____  \\   |  |     |  |____ |  '--'  ||__| 
 \\______| |_______||__| \\__| |_______|| _| \`._____/__/     \\__\\  |__|     |_______||_______/ (__) 
    `)
}

generate()
