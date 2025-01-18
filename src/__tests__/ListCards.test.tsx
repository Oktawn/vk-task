// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup } from '@testing-library/react';
import ListCards from '../ListCards/ListCards';
import { Cat } from '../stores/catStore';

afterEach(cleanup);

jest.mock("../stores/catStore", () => ({
    __esModule: true,
    default: {
        cats: [
            { id: "1", name: "Fluffy", url: "https://example.com/cat1.jpg" },
            { id: "2", name: "Whiskers", url: "https://example.com/cat2.jpg" },
        ]
    }
}));

jest.mock("../Card/Card", () => ({
    __esModule: true,
    default: ({ cat }: { cat: Cat }) => (
        <div data-testid="card">
            <span>{cat.name}</span>
        </div>
    )
}));

describe('ListCards', () => {
    it("renders list of cards correctly", async () => {
        await act(async () => {
            render(<ListCards />);
        });

        const cards = await screen.findAllByTestId("card");

        expect(cards).toHaveLength(2);

        expect(screen.getByText("Fluffy")).toBeInTheDocument();
        expect(screen.getByText("Whiskers")).toBeInTheDocument();
    });
});