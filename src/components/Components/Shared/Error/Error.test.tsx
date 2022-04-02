import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Error from './Error';

const mockedError = {
    icon: "fas fa-exclamation-triangle",
    message: "Failed to fetch data"
}

const mockedNoResults = {
    message: "No results found"
}

test('Error "Failed to Fetch Data" : Renders', () => {
    render(<Error errorClass="error-message" error={mockedError} />);
    const FailedDataElement = screen.getByText('Failed to fetch data', { exact: false });
    expect(FailedDataElement).toBeInTheDocument();
});


test('Error "No results found" : Renders', () => {
    render(<Error errorClass="error-message" error={mockedNoResults} />);
    const noResultElement = screen.getByText('No results found', { exact: false });
    expect(noResultElement).toBeInTheDocument();
});

test('Error "Failed to Fetch Data": Snapshot', () => {
    const component = renderer.create(<Error errorClass="error-message" error={mockedError} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Error "No results found": Snapshot', () => {
    const component = renderer.create(<Error errorClass="error-message" error={mockedError} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});