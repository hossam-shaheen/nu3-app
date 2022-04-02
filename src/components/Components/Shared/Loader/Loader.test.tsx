import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loader from './Loader';

test('Loader  : Renders', () => {
    render(<Loader />);
    const loader = screen.queryByTestId('loader');
    expect(loader).toBeInTheDocument();
});



test('Loader: Snapshot', () => {
    const component = renderer.create(<Loader />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});