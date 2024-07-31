function sad() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://maxwell882000.github.io/2048Ton/tonconnect-manifest.json", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}


sad()