import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { observer } from 'mobx-react';
import catStore from '../stores/catStore';
import ListCards from '../ListCards/ListCards';

jest.mock("../stores/catStore", () => ({
    cats: [],
}));

// Mocking the imported Card component
jest.mock("../Card/Card", () => ({
    default: ({ cat }: { cat: { id: string; name: string; url: string } }) => (
        <div data-testid="card">
            <span>{cat.name}</span>
        </div>
    ),
}));

describe('renders ListCards component with cats', () => {

    it("render list", async () => {
        // Задаем данные для хранилища
        catStore.cats = [
            { id: "1", name: "Fluffy", url: "https://example.com/cat1.jpg" },
            { id: "2", name: "Whiskers", url: "https://example.com/cat2.jpg" },
        ];

        await act(async () => render(<ListCards />))

        await waitFor(() => {
            // Проверяем, что количество рендеров соответствует количеству котов
            const cards = screen.getAllByTestId("card");
            console.log(cards);
            expect(cards).toHaveLength(catStore.cats.length);

            // Проверяем отображение имен котов
            expect(screen.getByText("Nah")).toBeInTheDocument();
            expect(screen.getByText("Whiskers")).toBeInTheDocument();
        })
    })
});
