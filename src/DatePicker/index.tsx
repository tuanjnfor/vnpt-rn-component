import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import TimePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

export type DateTime = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
};
export const checkIfDateIsInRange = (
  start: DateTime | undefined,
  end: DateTime | undefined,
  date: DateTime
): boolean => {
  const isBeforeStartDate = start ? compareDateTime(start, date) > 0 : false;
  const isAfterEndDate = end ? compareDateTime(date, end) > 0 : false;
  return isBeforeStartDate || isAfterEndDate;
};
const compareDateTime = (d1: DateTime, d2: DateTime): number => {
  const numD1 = d1.year * 10000 + d1.month * 100 + d1.day;
  const numD2 = d2.year * 10000 + d2.month * 100 + d2.day;
  return numD1 - numD2;
};
const dayOfWeek = {
  MONDAY: 'T2',
  TUESDAY: 'T3',
  WEDNESDAY: 'T4',
  THURSDAY: 'T5',
  FRIDAY: 'T6',
  SATURDAY: 'T7',
  SUNDAY: 'CN',
};
enum ACTIVE {
  NEXT_MONTH = 1,
  PREV_MONTH = 2,
}
enum Month {
  January = 1,
  December = 12,
}

const componentText = {
  CANCEL: 'HUỶ',
  OK: 'CHỌN',
  DAY: 'Ngày',
};
const listMonth = [
  {
    name: 'Tháng 1',
    num: 1,
  },
  {
    name: 'Tháng 2',
    num: 2,
  },
  {
    name: 'Tháng 3',
    num: 3,
  },
  {
    name: 'Tháng 4',
    num: 4,
  },
  {
    name: 'Tháng 5',
    num: 5,
  },
  {
    name: 'Tháng 6',
    num: 6,
  },
  {
    name: 'Tháng 7',
    num: 7,
  },
  {
    name: 'Tháng 8',
    num: 8,
  },
  {
    name: 'Tháng 9',
    num: 9,
  },
  {
    name: 'Tháng 10',
    num: 10,
  },
  {
    name: 'Tháng 11',
    num: 11,
  },
  {
    name: 'Tháng 12',
    num: 12,
  },
];

interface Props {
  onChange?: (date: Date) => void;
  value?: Date;
  children?: React.ReactElement;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number;
  toYear?: number;
  imperativeState?: 'show' | 'hide' | null;
  onClose?: () => void;
}

const convertDateObjToDateTime = (date: Date, fromYear: number): DateTime => {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear() - fromYear,
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};
const convertDateTimeToDateObj = (
  datetime: DateTime,
  fromYear: number
): Date => {
  const date = new Date();
  date.setDate(datetime.day);
  date.setMonth(datetime.month - 1);
  date.setFullYear(datetime.year + fromYear);
  date.setHours(datetime.hour);
  date.setMinutes(datetime.minute);
  date.setSeconds(datetime.second);
  return date;
};

export const DatePicker = ({
  onChange,
  value,
  children,
  mode = 'date',
  minDate,
  maxDate,
  fromYear = 1900,
  toYear = 2100,
  imperativeState = null,
  onClose,
}: Props): React.ReactElement => {
  const [editYear, setEditYear] = useState(false);
  const [editMonth, setEditMonth] = useState(false);
  const minDateTime = useMemo<DateTime | undefined>(
    () => minDate && convertDateObjToDateTime(minDate, fromYear),
    [minDate, fromYear]
  );
  const maxDateTime = useMemo<DateTime | undefined>(
    () => maxDate && convertDateObjToDateTime(maxDate, fromYear),
    [maxDate, fromYear]
  );
  const _value = useMemo(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      if (minDate && value < minDate) {
        return minDate;
      } else if (maxDate && value > maxDate) {
        return maxDate;
      } else {
        return value;
      }
    } else {
      return new Date();
    }
  }, [maxDate, minDate, value]);
  const [displayMode, setDisplayMode] = useState<'date' | 'time'>('date');
  useEffect(() => {
    setDisplayMode(mode === 'datetime' ? 'date' : mode);
  }, [mode]);

  const [viewDateTime, setViewDateTime] = useState<DateTime>(
    convertDateObjToDateTime(_value, fromYear)
  );
  const [activeDateTime, setActiveDateTime] = useState<DateTime>(
    convertDateObjToDateTime(_value, fromYear)
  );
  const validateAndSetActiveDateTime = useCallback(
    (dateObj: Date) => {
      if (minDate && dateObj < minDate && minDateTime) {
        setActiveDateTime(minDateTime);
      } else if (maxDate && dateObj > maxDate && maxDateTime) {
        setActiveDateTime(maxDateTime);
      } else {
        setActiveDateTime(convertDateObjToDateTime(dateObj, fromYear));
      }
    },
    [maxDate, maxDateTime, minDate, minDateTime, fromYear]
  );
  const activeDateObj = useMemo<Date>(
    () => convertDateTimeToDateObj(activeDateTime, fromYear),
    [activeDateTime, fromYear]
  );
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setViewDateTime(convertDateObjToDateTime(_value, fromYear));
    setActiveDateTime(convertDateObjToDateTime(_value, fromYear));
  }, [_value, fromYear]);

  // const [listYear] = useState<number[]>(() => {
  //   return Array.from(Array(toYear - fromYear)).map(
  //     (_, index) => index + fromYear
  //   );
  // });

  const [listYear, setListYear] = useState<number[]>([]);

  useEffect(() => {
    const yearSumDefault = toYear - fromYear;
    const arrayYear: number[] = [];
    for (let i = 0; i <= yearSumDefault; i++) {
      arrayYear.push(i + fromYear);
    }
    setListYear(arrayYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // century
  //   function calcCentury(y: number) {
  //     return Math.floor((fromYear + y) / 100);
  //   }
  // month
  //   function calcMonth(m: number) {
  //     if (m < 3) {
  //       return m + 10;
  //     } else {
  //       return m - 2;
  //     }
  //   }
  // year
  //   function calcYear(y: number) {
  //     return y % 100;
  //   }

  //  zeller
  //   function _zeller(day: number, month: number, year: number, century: number) {
  //     return (
  //       Math.floor(
  //         (13 * month - 1) / 5 + year / 4 + century / 4 + day + year - 2 * century
  //       ) % 7
  //     );
  //   }

  // ReWrite
  //   function zeller(d: number, m: number, y: number) {
  //     return _zeller(d, calcMonth(m), calcYear(y), calcCentury(y));
  //   }
  function isLeap(year: number) {
    if (year % 4 || (year % 100 === 0 && year % 400)) {
      return 0;
    } else {
      return 1;
    }
  }
  function daysIn(month: number, year: number) {
    return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
  }

  function calendar(month: number, year: number) {
    const getMonthString = month < 10 ? `0${month}` : `${month}`;
    const startIndex = new Date(
      year + 2000 + '-' + getMonthString + '-01'
    ).getDay();
    const endIndex = daysIn(month, year);
    const result = Array.apply(0, Array(35)).map(function () {
      return 0;
    });
    for (let i = startIndex; i < endIndex + startIndex; i++) {
      result[i] = i - startIndex + 1;
    }
    return result;
  }

  const onChangeDay = (newDay: number, _fromYear: number) => {
    if (!newDay) {
      return;
    }
    setViewDateTime((prev: any) => ({ ...prev, day: newDay }));
    validateAndSetActiveDateTime(
      convertDateTimeToDateObj(
        {
          ...activeDateTime,
          day: newDay,
          month: viewDateTime.month,
          year: viewDateTime.year,
        },
        fromYear
      )
    );
  };

  const onChangeTime = (time: Date) => {
    validateAndSetActiveDateTime(
      convertDateTimeToDateObj(
        {
          ...activeDateTime,
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds(),
        },
        fromYear
      )
    );
  };

  const activeMonth = (nextMonth: number) => {
    switch (nextMonth) {
      case ACTIVE.NEXT_MONTH: {
        if (viewDateTime.month === Month.December) {
          setViewDateTime((prev: any) => ({
            ...prev,
            month: Month.January,
            year: prev.year + 1,
          }));
        } else {
          setViewDateTime((prev: any) => ({
            ...prev,
            month: prev.month + 1,
          }));
        }
        break;
      }
      case ACTIVE.PREV_MONTH: {
        if (viewDateTime.month === Month.January) {
          setViewDateTime((prev: any) => ({
            ...prev,
            month: Month.December,
            year: prev.year - 1,
          }));
        } else {
          setViewDateTime((prev: any) => ({
            ...prev,
            month: prev.month - 1,
          }));
        }
        break;
      }
      default:
        return;
    }
  };

  const formatMonthToString = (month: number) => {
    for (const item of listMonth) {
      if (item.num === month) {
        return item.name;
      }
    }
  };

  useEffect(() => {
    if (imperativeState === 'show') {
      setModalVisible(true);
    }
  }, [imperativeState]);

  const renderDatePicker = () => {
    return (
      <>
        {/* Choose Time  */}
        {!editYear && !editMonth && (
          <View style={styles.tabDate}>
            <View style={styles.activeMonth}>
              <TouchableOpacity onPress={() => activeMonth(ACTIVE.PREV_MONTH)}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://cdn.icon-icons.com/icons2/1856/PNG/512/navigate-before_116975.png',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditMonth(true);
                  setDisplayMode('date');
                }}
              >
                <Text>
                  {formatMonthToString(viewDateTime.month)}{' '}
                  {viewDateTime.year + fromYear}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => activeMonth(ACTIVE.NEXT_MONTH)}>
                <Image
                  style={[
                    styles.icon,
                    {
                      transform: [{ rotate: '180deg' }],
                    },
                  ]}
                  source={{
                    uri: 'https://cdn.icon-icons.com/icons2/1856/PNG/512/navigate-before_116975.png',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.titleCalendar]}>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.SUNDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.MONDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.TUESDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.WEDNESDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.THURSDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.FRIDAY}</Text>
              </View>
              <View style={[styles.itemDay]}>
                <Text>{dayOfWeek.SATURDAY}</Text>
              </View>
            </View>
            <View style={styles.listDate}>
              {data?.map((day: number, index: number) => {
                const isBeforeMinOfAfterMax = checkIfDateIsInRange(
                  minDateTime,
                  maxDateTime,
                  {
                    ...viewDateTime,
                    day,
                  }
                );
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onChangeDay(day, fromYear);
                    }}
                    disabled={isBeforeMinOfAfterMax}
                    activeOpacity={isBeforeMinOfAfterMax ? 1 : 0.6}
                    style={styles.itemDay}
                    key={index}
                  >
                    {day === activeDateTime.day &&
                    viewDateTime.month === activeDateTime.month &&
                    viewDateTime.year === activeDateTime.year ? (
                      <View
                        style={[
                          styles.centeredView,
                          styles.textChooseContainer,
                          styles.backgroundActive,
                        ]}
                      >
                        <Text style={styles.textChoose}>
                          {day !== 0 && day}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.centeredView,
                          styles.textChooseContainer,
                          styles.backgroundDefault,
                        ]}
                      >
                        <Text
                          style={[
                            styles.textDate,
                            isBeforeMinOfAfterMax && styles.color_929295,
                          ]}
                        >
                          {day !== 0 && day}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        {/* Choose Month */}
        {editMonth && (
          <View style={styles.tabDate}>
            <FlatList
              data={listMonth}
              showsVerticalScrollIndicator={false}
              style={styles.maxHeight300}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.num)}
              getItemLayout={(_data, index) => ({
                length: 51.3,
                offset: 51.3 * (index - 3),
                index,
              })}
              renderItem={({ item }) => {
                const month = item.num;
                return (
                  <TouchableOpacity
                    style={[
                      defaultStyles.selfStretch,
                      defaultStyles.alignItemsCenter,
                      item.num === activeDateTime.month && styles.selectedYear,
                    ]}
                    onPress={() => {
                      setEditMonth(false);
                      setEditYear(false);
                      setViewDateTime((prev: any) => ({ ...prev, month }));
                      validateAndSetActiveDateTime(
                        convertDateTimeToDateObj(
                          {
                            ...activeDateTime,
                            month: month,
                          },
                          fromYear
                        )
                      );
                      // }
                    }}
                  >
                    <Text
                      style={[
                        styles.textYear,
                        item.num === activeDateTime.month &&
                          styles.selectedYearText,
                      ]}
                    >
                      {`Tháng ${item.num}`}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        {/* Choose Year */}
        {editYear && !editMonth && (
          <View style={styles.tabDate}>
            <FlatList
              data={listYear}
              showsVerticalScrollIndicator={false}
              style={styles.maxHeight300}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item)}
              initialScrollIndex={listYear.indexOf(
                fromYear + activeDateTime.year
              )}
              getItemLayout={(_data, index) => ({
                length: 51.3,
                offset: 51.3 * (index - 3),
                index,
              })}
              renderItem={({ item }) => {
                const year = item - fromYear;
                const isBeforeMinYear = minDateTime
                  ? year < minDateTime.year
                  : false;
                const isAfterMinYear = maxDateTime
                  ? year > maxDateTime.year
                  : false;
                const isOutOfYearRange = isBeforeMinYear || isAfterMinYear;
                return (
                  <TouchableOpacity
                    activeOpacity={isOutOfYearRange ? 1 : 0.6}
                    style={[
                      defaultStyles.selfStretch,
                      defaultStyles.alignItemsCenter,
                      item === fromYear + activeDateTime.year &&
                        styles.selectedYear,
                    ]}
                    onPress={() => {
                      if (!isOutOfYearRange) {
                        setEditYear(false);
                        setEditMonth(false);
                        setViewDateTime((prev: any) => ({ ...prev, year }));
                        // update activeDateTime = day,month,year
                        validateAndSetActiveDateTime(
                          convertDateTimeToDateObj(
                            {
                              ...activeDateTime,
                              year: year,
                            },
                            fromYear
                          )
                        );
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.textYear,
                        isOutOfYearRange && styles.color_929295,
                        item === fromYear + activeDateTime.year &&
                          styles.selectedYearText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </>
    );
  };

  const renderTimePicker = () => {
    return (
      <View style={defaultStyles.alignItemsCenter}>
        <TimePicker
          date={activeDateObj}
          onDateChange={onChangeTime}
          minimumDate={minDate}
          maximumDate={maxDate}
          mode="time"
        />
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View style={[styles.dateText]}>
        <TouchableOpacity
          onPress={() => {
            setEditYear(true);
            setDisplayMode('date');
          }}
        >
          <Text style={styles.infoYear}>{activeDateTime.year + fromYear}</Text>
        </TouchableOpacity>
        <View style={[defaultStyles.row, defaultStyles.justifyBetween]}>
          <TouchableOpacity
            onPress={() => {
              setEditYear(false);
              setDisplayMode('date');
            }}
          >
            <Text style={styles.infoDayMonth}>
              {activeDateTime.day} {formatMonthToString(activeDateTime.month)}
            </Text>
          </TouchableOpacity>
          {mode !== 'date' && (
            <TouchableOpacity onPress={() => setDisplayMode('time')}>
              <Text style={styles.infoDayMonth}>
                {dayjs(activeDateObj).format('hh:mm A')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const data = calendar(viewDateTime.month, viewDateTime.year + fromYear);
  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(false);
          setEditYear(false);
          onClose && onClose();
        }}
      >
        <View style={defaultStyles.flex_1}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.backgroundDefault}>
                {renderTitle()}
                {displayMode === 'date' && renderDatePicker()}
                {displayMode === 'time' && renderTimePicker()}
                <View style={styles.bottomBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setEditYear(false);
                      onClose && onClose();
                    }}
                    style={[styles.dateBtn]}
                  >
                    <Text style={styles.textBottom}>
                      {componentText.CANCEL}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setEditYear(false);
                      onClose && onClose();
                      onChange?.(activeDateObj);
                    }}
                    style={[styles.dateBtn]}
                  >
                    <Text style={styles.textBottom}> {componentText.OK} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {children &&
        React.cloneElement(children, {
          onPress: () => {
            children.props.onPress && children.props.onPress();
            if (imperativeState === null) {
              setModalVisible(true);
            }
          },
        })}
    </>
  );
};

const styles = StyleSheet.create({
  calendarTable: {
    flex: 1,
  },
  titleCalendar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  itemDay: {
    flexBasis: '14.2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listDate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textDate: {
    color: 'black',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  dateText: {
    backgroundColor: '#377dcd',
    minWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  activeMonth: {
    padding: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: '#212121',
  },
  infoDayMonth: {
    fontSize: 25,
    color: '#fff',
  },
  infoYear: {
    color: 'white',
    fontSize: 17,
  },
  backgroundActive: {
    backgroundColor: '#377dcd',
  },
  backgroundDefault: {
    backgroundColor: '#FFF',
  },
  textChooseContainer: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  textChoose: {
    color: '#fff',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
  },
  modalView: {
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 10, 18, 0.16)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateBtn: {
    padding: 10,
  },
  tabDate: {
    minWidth: 300,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  itemYear: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textYear: {
    fontSize: 16,
    paddingVertical: 16,
  },
  cardPicker: {
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  imgIcon: {
    width: 18,
    height: 18,
  },
  textPickerDate: {
    marginLeft: 12,
  },
  textBottom: {
    color: '#377dcd',
    fontWeight: 'bold',
  },
  maxHeight300: {
    maxHeight: 300,
  },
  color_929295: {
    color: '#929295',
  },
  selectedYear: {
    backgroundColor: '#377dcd',
    borderRadius: 26,
    marginHorizontal: 24,
  },
  selectedYearText: {
    color: '#FFFFFF',
  },
});

const defaultStyles = StyleSheet.create({
  selfStretch: {
    alignSelf: 'stretch',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  flex_1: {
    flex: 1,
  },
});
