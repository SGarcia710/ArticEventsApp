# Art Institute of Chicago - Events App

## How to launch the app

1. Clone this repo.
2. Run `yarn` command to install node dependencies.
3. Run `npx pod-install ios` to install pods.
4. Run `yarn ios` to launch the app in the iOS simulator.

## Requirements

- [x] Home Screen: The user should be able to see a thumbnail and a small description of each event in the main screen of the app.
- [x] Event Screen: When clicking on a thumbnail the user must be sent to a detailed screen of the event containing a better quality image and more detailed information about the piece, the author, and any other data you consider might be relevant for the end user.
- [ ] Favorites Screen: The user should be able to save some favorite events, and should be able to explore them even after the application is completely closed and reopened.
- [x] Use animated transitions and any other cool feature you consider will show up how experienced you are in mobile development.
- [x] Your solution will be evaluated on code quality, clarity and development best practices.
- [x] Build the application using React Native CLI and Typescript.
- [x] Select you preferred platform (iOS or Android) and create your own Native Module using the Bridge or the new Fabric Native Components to add the events schedules into the user calendar (Please don't use a react native package)
- [ ] OPTIONAL: Additional bonus if you implement some kind of push notifications.

## Own ideas:

- [x] Toast notifications
- [x] Alias-based imports

## TODO:

- [ ] Make it work on Android.
- [ ] Open the event in the Calendar App when the event is added. If not, keep the notification.
- [ ] Handle links in HTML Renderer.
- [ ] Infinity scrolling

## Links

- Icons: https://www.figma.com/community/file/886554014393250663
- Native Modules: https://reactnative.dev/docs/native-modules-ios
