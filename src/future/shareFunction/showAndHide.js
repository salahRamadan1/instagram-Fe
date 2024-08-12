

const show = (id) => {
    const myDiv = document.getElementById(`${id}`)

    setTimeout(() => {
        myDiv.style.opacity = "1";
        myDiv.style.transition = "1s"
    }, 1000);
}

export default show