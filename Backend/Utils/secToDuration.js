function convertSecondsToDuration(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60)
    const seconds = Math.floor((totalSec % 3600) % 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    } else {
        return `${seconds}s`
    }
}

exports.module = {
    convertSecondsToDuration
}