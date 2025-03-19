# Custom Time Clock

Custom Time Clock is an iOS application that implements a unique time system where:
- **1 minute = 69 seconds**
- **1 hour = 69 minutes**

The app displays the current time based on this custom system, updating every second. It is designed using SwiftUI and is easily extendable to Apple Watch (watchOS).

## Features

- **Custom Time Conversion:** Converts standard Unix time to a custom format.
- **Live Updating Clock:** The UI updates every second to show the custom time.
- **SwiftUI Interface:** Clean, modern, and responsive design.
- **Extensible to Apple Watch:** Shared code makes it easy to deploy on watchOS.

## Requirements

- **Xcode 13 or later**
- **iOS 14 or later**
- **Swift 5**
- For watchOS support: **Xcode with watchOS SDK**

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/divyesh1099/69clock.git
   cd 69clock
   ```

2. **Open the Project in Xcode:**

   Open `CustomTimeClock.xcodeproj` in Xcode.

3. **Build and Run:**

   - Select an iOS Simulator or a connected iOS device.
   - Press `Cmd+R` to build and run the app.

## Project Structure

- **CustomTime.swift:** Contains the logic for converting standard seconds to custom time units.
- **ContentView.swift:** Main SwiftUI view displaying the custom time.
- **CustomTimeClockApp.swift:** The entry point of the iOS application.
- **WatchContentView.swift:** (Optional) SwiftUI view for the watchOS target if you extend the project to Apple Watch.

## Usage

Upon launching the app, you will see a live clock showing the time in the custom format (HH:MM:SS) based on:
- 1 minute = 69 seconds
- 1 hour = 69 minutes

The time updates every second.

## Extending to Apple Watch

To add watchOS support:
1. **Add a Watch App Target:**  
   Go to **File > New > Target** in Xcode and select the watchOS template.
2. **Share Code:**  
   Ensure that `CustomTime.swift` is added to the shared group so both the iOS and watchOS targets can access it.
3. **Design the Watch Interface:**  
   Create a similar interface as in `ContentView.swift` within `WatchContentView.swift`.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [divyesh1099@gmail.com](mailto:divyesh1099@gmail.com) or open an issue on GitHub.

## Inspiration
For my love of Moti ❤️ and the number 69, I made this clock. 