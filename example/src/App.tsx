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
  getOffset,
  Button,
} from 'vnpt-rn-component';
import TextTitle from './components/TextTitle';
import { translations } from './locales';

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
        <Box
          flex={1}
          // middle
          // center
          marginTop={getOffset().top}
          color={'#B5B2B2'}
        >
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
            weight="bold"
            onPress={() => {
              setLocales((e) => (e === 'vi' ? 'en' : 'vi'));
            }}
            size={fontSizeLine(14)}
          >
            Đăng nhập
          </Text>
          {/* <InputWithLabel
            value={text}
            onChangeText={(e) => setText(e)}
            label={'Mật khẩu'}
            size={14}
            placeholder={'Nhập mật khẩu'}
            regex={new RegExp('foo*')}
            messageError={'Không đúng định dạng'}
          /> */}
          <Button lable={'Dang nhap'} />
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
