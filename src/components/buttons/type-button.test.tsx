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

  test("applies custom className", async () => {
    render(
      <TypeButton
        title="Styled"
        description="Button"
        onClick={() => {}}
        className="my-custom-class"
      />,
    );

    const button = page.getByRole("button");
    await expect.element(button).toHaveClass("my-custom-class");
    await expect.element(button).toHaveClass("border");
    await expect.element(button).toHaveClass("rounded-lg");
  });
});
