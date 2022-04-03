import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import QrCode from "./QrCode";

const url = "https://www.nu3.de/products/nu3-bio-acerola-pulver";
test("QrCode pass valid url : Renders", () => {
  render(<QrCode url={url} />);
  const svgElement = screen.queryByTestId("QR-Code-SVG");
  expect(svgElement).toBeInTheDocument();
});

test("QrCode pass invalid url : Renders", () => {
  render(<QrCode url="" />);
  const svgElement = screen.queryByTestId("QR-Code-SVG");
  expect(svgElement).not.toBeInTheDocument();
});

test("QrCode pass valid url: Snapshot", () => {
  const component = renderer.create(<QrCode url={url} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("QrCode pass invalid url: Snapshot", () => {
  const component = renderer.create(<QrCode url="" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
