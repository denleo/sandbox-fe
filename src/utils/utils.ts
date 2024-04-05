import { SelectItem } from "../components/select/Select";

export function groupBy<T>(array: T[], keyAccessor: (item: T) => string) {
  return array.reduce((acc, value) => {
    (acc[keyAccessor(value)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function debounce<TCallback extends (...args) => void>(
  callback: TCallback,
  delay: number
) {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<TCallback>) => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
