function sad() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("1241242114")
            // resolve("Asdsadsadasdsaads")
        }, 300)
    })
}

async function asd() {
    try {
        await sad();
    } catch (e) {
        console.log(e)
    }
}

asd()