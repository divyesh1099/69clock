import Foundation

struct CustomTime {
    static let secondsPerMinute = 69
    static let minutesPerHour = 69

    // Calculate total seconds in one custom hour
    static var secondsPerHour: Int {
        return secondsPerMinute * minutesPerHour
    }
    
    // Convert a given number of seconds into custom hours, minutes, and seconds
    static func convert(seconds totalSeconds: Int) -> (hours: Int, minutes: Int, seconds: Int) {
        let hours = totalSeconds / secondsPerHour
        let remainderAfterHours = totalSeconds % secondsPerHour
        let minutes = remainderAfterHours / secondsPerMinute
        let seconds = remainderAfterHours % secondsPerMinute
        return (hours, minutes, seconds)
    }
}

// For demonstration, let's use the current Unix time's seconds (mod a custom hour)
let now = Date().timeIntervalSince1970
let totalSeconds = Int(now) % CustomTime.secondsPerHour
let customTime = CustomTime.convert(seconds: totalSeconds)

print("Custom Time: \(String(format: "%02d:%02d:%02d", customTime.hours, customTime.minutes, customTime.seconds))")
