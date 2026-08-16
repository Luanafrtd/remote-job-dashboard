import { expect, test } from "@playwright/test";

test.describe("unauthenticated visitors", () => {
  test("root redirects to /login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { name: "Welcome back" }),
    ).toBeVisible();
  });

  test("direct access to a protected route redirects to /login with a return path", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?from=%2Fdashboard$/);
  });

  test("unknown routes render the branded 404 page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });
});

test.describe("login", () => {
  test("signing in redirects to the originally requested page and unlocks it", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?from=%2Fdashboard$/);

    await page.getByLabel("Email address").fill("demo@example.com");
    await page.getByLabel("Password", { exact: true }).fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText("Total Applications")).toBeVisible();
  });

  test("shows a validation error for an empty submission", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(
      page.getByText("Please enter both your email and password."),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("continue as guest reaches the dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /Continue as guest/ }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
  });
});

test.describe("logout", () => {
  test("logging out clears the session and re-locks protected routes", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /Continue as guest/ }).click();
    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/login$/);

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login\?from=%2Fdashboard$/);
  });
});

test.describe("register", () => {
  test("validates password length and confirmation before submitting", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.getByLabel("Full name").fill("Jane Doe");
    await page.getByLabel("Email address").fill("jane@example.com");
    await page.getByLabel("Password", { exact: true }).fill("short");
    await page.getByLabel("Confirm password").fill("short");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(
      page.getByText("Password must be at least 8 characters long."),
    ).toBeVisible();

    await page.getByLabel("Password", { exact: true }).fill("longenough1");
    await page.getByLabel("Confirm password").fill("different1");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText("Passwords do not match.")).toBeVisible();
  });

  test("a valid submission creates a session and reaches the dashboard", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.getByLabel("Full name").fill("Jane Doe");
    await page.getByLabel("Email address").fill("jane@example.com");
    await page.getByLabel("Password", { exact: true }).fill("longenough1");
    await page.getByLabel("Confirm password").fill("longenough1");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
