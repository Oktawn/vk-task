
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card/Card"
import catStore, { Cat } from "../stores/catStore";
// @ts-ignore
import React from 'react';

// Создаем mock для хранилища
jest.mock("../stores/catStore", () => ({
    deleteCat: jest.fn(),
    updateCat: jest.fn(),
}));

describe("Card Component", () => {

    const mockCat: Cat = {
        id: "1",
        name: "Fluffy",
        url: "https://example.com/cat.jpg",
    };

    it("renders the cat's information", () => {
        render(<Card cat={mockCat} />);
        expect(screen.getByText(mockCat.name)).toBeInTheDocument();
    });

    it("edit cat", () => {
        render(<Card cat={mockCat} />);
        fireEvent.click(screen.getByTestId("EditOutlined"));
        const input = screen.getByTestId("input");
        fireEvent.change(input, { target: { value: "Whiskers" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        expect(screen.getByText("Whiskers")).toBeInTheDocument();
    })

    it("return name if input empty", () => {
        render(<Card cat={mockCat} />);
        fireEvent.click(screen.getByTestId("EditOutlined"));
        const input = screen.getByTestId("input")
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        expect(screen.getByText(mockCat.name)).toBeInTheDocument();
    })

    it("delete cat", () => {
        render(<Card cat={mockCat} />);
        fireEvent.click(screen.getByText("Delete"));
        expect(catStore.deleteCat).toHaveBeenCalledWith(mockCat);
    })
});
