import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Poll from './Poll';

describe('Poll Component', () => {
  test('renders the first question', () => {
    render(<Poll />);
    expect(screen.getByText("How was your week overall?")).toBeInTheDocument();
  });

  test('renders options for the first question', () => {
    render(<Poll />);
    expect(screen.getByText("Good 👍")).toBeInTheDocument();
    expect(screen.getByText("Neutral 😐")).toBeInTheDocument();
    expect(screen.getByText("Bad 👎")).toBeInTheDocument();
  });

  test('moves to the next question on option click', () => {
    render(<Poll />);
    fireEvent.click(screen.getByText("Good 👍"));
    expect(screen.getByText("How was the workload?")).toBeInTheDocument();
  });

  test('renders summary after the last question', () => {
    render(<Poll />);
    fireEvent.click(screen.getByText("Good 👍"));
    fireEvent.click(screen.getByText("Manageable 😌"));
    expect(screen.getByText("Summary of your responses:")).toBeInTheDocument();
  });

  test('displays user responses in summary', () => {
    render(<Poll />);
    fireEvent.click(screen.getByText("Good 👍"));
    fireEvent.click(screen.getByText("Manageable 😌"));
    expect(screen.getByText("How was your week overall?: Good")).toBeInTheDocument();
    expect(screen.getByText("How was the workload?: Manageable")).toBeInTheDocument();
  });

  test('submits responses to the mock API on summary page', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    render(<Poll />);
    fireEvent.click(screen.getByText("Good 👍"));
    fireEvent.click(screen.getByText("Manageable 😌"));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "How was your week overall?": "Good",
        "How was the workload?": "Manageable",
      }),
    });
  });

  test('restarts the poll when the restart button is clicked', () => {
    render(<Poll />);
    fireEvent.click(screen.getByText("Good 👍"));
    fireEvent.click(screen.getByText("Manageable 😌"));
    fireEvent.click(screen.getByText("Restart"));
    expect(screen.getByText("How was your week overall?")).toBeInTheDocument();
  });
});
