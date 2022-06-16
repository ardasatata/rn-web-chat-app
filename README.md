# React Native & Web Monorepo

## App Demo



## Description

React-native + web monorepo with graph ql api for chatting apps

**notes on how to run this repo:**

after you clone the repo you may need to set up it using yarn `berry` version

## Setting up Yarn 2+

1. Run `yarn set version berry` at the root of project. It will create a `.yarnrc.yml` file.
2. Add the following lines to `.yarnrc.yml` to ensure `node_modules` directories are all created in each workspace:
```yml
nodeLinker: node-modules
nmHoistingLimits: workspaces
```
3. `nmHositingLimits` tells how to hoist dependencies for each workspace. By setting it to `workspaces` all dependencies will be installed in each workspace's `node_modules` rather than being hoisted to the root folder. This means you can now you can safely the `noHoist` section in the root's `package.json`.

Check out [Yarn 2+'s "getting started" guide](https://yarnpkg.com/getting-started/install) for more info.

then you can build the react native app normally inside this path
/packages/mobile
you can go to `/packages/mobile/ios` folder to do the `pod install`
after that you can start `yarn ios:metro` to run the metro bundler

If you're going to run the web version you can just run:
`yarn web:start`

## Available commands

Development and build commands:

- `yarn android:metro`: Start the metro server for Android/iOS
- `yarn android:start`: Start developing the Android app
- `yarn android:studio`: Open the android app on Android Studio
- `yarn ios:metro`: Start the metro server for Android/iOS
- `yarn ios:start`: Start developing the iOS app
- `yarn ios:pods`: Install iOS cocoapods dependencies
- `yarn ios:xcode`: Open the iOS app on XCode
- `yarn web:start`: Start developing the web app
- `yarn web:build`: Create a production build of the web app
