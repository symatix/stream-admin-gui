module.exports = function(song){
    if (song.includes("&amp;")){
        return song.replace("&amp;", "&")
    }
    if (song.includes("&apos;")){
        return song.replace("&apos;", "'")
    }
    return song
}