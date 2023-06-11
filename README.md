# vnpt-rn-component

VNPT RN Component

## Installation

```sh
npm install vnpt-rn-component
```

## iOS

* Edit `ios/Podfile`
  - Add `pod 'RNFastImage', :path => '../node_modules/react-native-fast-image'` to **Podfile**.
  - Run
       ```sh 
       cd ios && pod install
       ```

## Android

* Edit `android/settings.gradle`

```diff
rootProject.name = 'MyApp'

include ':app'

+ include ':react-native-fast-image'
+ project(':react-native-fast-image').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fast-image/android')
```

* Edit `android/app/build.gradle`

```diff
apply plugin: 'com.android.application'

android {
    ...
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':react-native-fast-image')
}
```

* Edit `android/app/src/main/java/.../MainApplication.java`

```diff
package com.myapp;

+ import com.dylanvann.fastimage.FastImageViewPackage;

....

            @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          +   packages.add(new FastImageViewPackage());
          return packages;
        }

}
```

## Usage

```js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  Box,
  Text,
  fontSizeLine,
  Color,
  heightLize,
  widthLize,
  Input,
  TouchRippleSingle,
  AlertProvider,
  Thumb,
  DatePicker,
  AppProvider,
} from 'vnpt-rn-component';
import TextTitle from './components/TextTitle';
import { translations } from './locales';

// ...

export default function App() {
  const [locales, setLocales] = useState('vi');
  return (
    <AppProvider
      locale={locales}
      translations={translations}
      onChangeLocale={(v) => {
        setLocales(v);
      }}
    >
      <AlertProvider>
        <Box flex={1} middle center>
          <Text size={fontSizeLine(14)} color={Color.black}>
            Hello vnpt
          </Text>
          <Box
            width={widthLize(40)}
            height={heightLize(40)}
            color={Color.red_04}
          />
          <Box
            row
            radius={50}
            border={1}
            margin={[widthLize(40), heightLize(20)]}
          >
            <Input
              flex={1}
              placeholder={'Some text'}
              padding={[widthLize(20), heightLize(20)]}
              size={fontSizeLine(14)}
              color={'red'}
            />
          </Box>
          <TouchRippleSingle
            onPress={() => {
              AlertProvider.show({
                title: 'Alert',
                content: 'Content',
                actions: [
                  { text: 'OK', onPress: () => console.log('On Press') },
                ],
              });
            }}
          >
            <Box
              padding={[widthLize(40), widthLize(10)]}
              color={'blue'}
              radius={50}
            >
              <Text size={fontSizeLine(14)} color={Color.white}>
                Button
              </Text>
            </Box>
          </TouchRippleSingle>
          <Thumb
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <Thumb
            style={styles.image}
            resizeMode="contain"
            loadingColor={Color.white}
          />
          <DatePicker>
            <Text size={14}>Date picker</Text>
          </DatePicker>
          <TextTitle />
          <Text
            onPress={() => {
              setLocales((e) => (e === 'vi' ? 'en' : 'vi'));
            }}
            size={fontSizeLine(14)}
          >
            Change languages
          </Text>
        </Box>
      </AlertProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});


```
