import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'vnpt-rn-component' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const VnptRnComponentModule = isTurboModuleEnabled
  ? require('./NativeVnptRnComponent').default
  : NativeModules.VnptRnComponent;

const VnptRnComponent = VnptRnComponentModule
  ? VnptRnComponentModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return VnptRnComponent.multiply(a, b);
}
