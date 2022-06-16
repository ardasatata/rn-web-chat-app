# React Native & Web Monorepo

React-native + web monorepo with graph ql api for chatting apps, utilized monorepo so that we could share the same context, logic, & primitive UI component between those 2 platforms, then finally we could write different screen layout between different platform but still able to maintain the same functionality.

## App Demo

**Mobile + Web**

<img src="https://user-images.githubusercontent.com/17568508/174103784-1e04d76e-f17d-4d66-b63b-15c5519b9389.png" alt="drawing" width="480"/>

**Chat**

<img src="https://user-images.githubusercontent.com/17568508/174104390-eaa02f8f-1e75-4bdd-a12a-6521e7f17dc5.gif" alt="drawing" height="480"/>

**Unsent Chat** <br>
user can tap on the unsent chat & it will try to sent the chat again

<img src="https://user-images.githubusercontent.com/17568508/174104760-de98f2ef-74f7-4b30-907b-c22252be2f59.gif" alt="drawing" height="480"/>

**Infinite Scroll** <br>
user can scroll to the top to fetch the earlier chat data

<img src="https://user-images.githubusercontent.com/17568508/174106132-d77b8e30-3f6e-40f0-940d-6ff8af98bfe0.gif" alt="drawing" height="480"/>

**Saved text editor** <br>
the text editor state would be saved after the user reopen the app

<img src="https://user-images.githubusercontent.com/17568508/174106850-fb4e9261-e196-401a-a249-67609e0ee5de.gif" alt="drawing" height="480"/>

**Switch user** <br>
Switching between users

<img src="https://user-images.githubusercontent.com/17568508/174108019-eb1b4c85-c07f-4e76-a83d-cf29cef5de65.gif" alt="drawing" height="480"/>

**Switch channel** <br>
Switching between channel

<img src="https://user-images.githubusercontent.com/17568508/174108072-f7c22ead-83fe-4d37-bd8d-54d576042570.gif" alt="drawing" height="480"/>

**Message exchange between mobile & web** <br>

<img src="https://user-images.githubusercontent.com/17568508/174108215-6b30c913-4e97-4109-8293-f8bfc056301b.gif" alt="web-mobile" width="480"/><img src="https://user-images.githubusercontent.com/17568508/174108264-9878c1ee-bfb8-4287-90a9-291e1a66d524.gif" alt="mobile-web" width="480"/>

## Notes on how to run this repo:

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
