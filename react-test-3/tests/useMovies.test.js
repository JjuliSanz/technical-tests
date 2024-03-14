import { renderHook, act } from "@testing-library/react";
import { useMovies } from "../src/hooks/useMovies";
import { describe, expect, test } from "vitest";

describe("test hooks", () => {
  test("test useMovies", async () => {
    const searchMovie = "avengers";

    const { result } = renderHook(() => useMovies({ search: "", sort: false }));

    const { getMovies } = result.current;

    await act(async () => {
      await getMovies({ search: searchMovie });
    });

    expect(result.current.movies.length).toBeGreaterThan(0);
    expect(result.current.loading).toBe(false);

    result.current.movies.forEach((movie) => {
      expect(movie.title.toLowerCase()).toContain(searchMovie);
    });
  });
});
