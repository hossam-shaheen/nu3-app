import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ResultCount from "./ResultCount";

test("ResultCount pass count 0 : Renders", () => {
  render(<ResultCount count={0} />);
  const resultText = screen.getByText("0 result");
  expect(resultText).toBeInTheDocument();
});

test("ResultCount pass count 1 : Renders", () => {
  render(<ResultCount count={1} />);
  const resultText = screen.getByText("1 result");
  expect(resultText).toBeInTheDocument();
});

test("ResultCount pass count 2 : Renders", () => {
  render(<ResultCount count={2} />);
  const resultText = screen.getByText("2 results");
  expect(resultText).toBeInTheDocument();
});

test("ResultCount pass count 0: Snapshot", () => {
  const component = renderer.create(<ResultCount count={0} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("ResultCount pass count 1: Snapshot", () => {
  const component = renderer.create(<ResultCount count={1} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("ResultCount pass count 2: Snapshot", () => {
  const component = renderer.create(<ResultCount count={2} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
