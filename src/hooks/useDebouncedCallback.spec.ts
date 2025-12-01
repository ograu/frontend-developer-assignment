import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useDebouncedCallback } from "./useDebouncedCallback";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("should debounce callback execution", () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(callback, 500));

  // Call debounced function multiple times
  act(() => {
    result.current.debounced("first");
    result.current.debounced("second");
    result.current.debounced("third");
  });

  // Callback should not be called yet
  expect(callback).not.toHaveBeenCalled();

  // Fast-forward time by 500ms
  act(() => {
    vi.advanceTimersByTime(500);
  });

  // Callback should be called only once with the last value
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("third");
});

it("should use default debounce time of 500ms", () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(callback));

  act(() => {
    result.current.debounced("test");
  });

  // Should not be called before 500ms
  act(() => {
    vi.advanceTimersByTime(499);
  });
  expect(callback).not.toHaveBeenCalled();

  // Should be called after 500ms
  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(callback).toHaveBeenCalledWith("test");
});

it("should respect custom debounce time", () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

  act(() => {
    result.current.debounced("test");
  });

  // Should not be called before 1000ms
  act(() => {
    vi.advanceTimersByTime(999);
  });
  expect(callback).not.toHaveBeenCalled();

  // Should be called after 1000ms
  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(callback).toHaveBeenCalledWith("test");
});

it("should handle multiple arguments", () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useDebouncedCallback(callback, 500));

  act(() => {
    result.current.debounced("arg1", "arg2", "arg3");
  });

  act(() => {
    vi.advanceTimersByTime(500);
  });

  expect(callback).toHaveBeenCalledWith("arg1", "arg2", "arg3");
});
