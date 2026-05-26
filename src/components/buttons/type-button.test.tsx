import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import TypeButton from "./type-button";

describe("TypeButton", () => {
  test("renders title and description", async () => {
    render(
      <TypeButton
        title="Test Title"
        description="Test Description"
        onClick={() => {}}
      />,
    );

    await expect.element(page.getByText("Test Title")).toBeInTheDocument();
    await expect
      .element(page.getByText("Test Description"))
      .toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(
      <TypeButton
        title="Click Me"
        description="Click this button"
        onClick={onClick}
      />,
    );

    await page.getByRole("button", { name: /Click Me/i }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
