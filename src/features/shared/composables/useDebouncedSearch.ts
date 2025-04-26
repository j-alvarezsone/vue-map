import { computed, ref } from "vue";

export function useDebouncedSearch(callback: (value: string) => void, delay = 500) {
  const searchTerm = ref<string>("");
  let debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  const debouncedSearchTerm = computed({
    get() {
      return searchTerm.value;
    },
    set(value: string) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        searchTerm.value = value;
        callback(value);
      }, delay);
    },
  });

  return {
    debouncedSearchTerm,
  };
}
