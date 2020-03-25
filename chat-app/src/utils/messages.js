const generatedMessage = (text) => {
    return {
        text,
        createAt: new Date().getTime()
    }
}

module.exports = {
    generatedMessage
}