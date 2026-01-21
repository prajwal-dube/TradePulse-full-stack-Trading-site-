import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';   // It will wait data to load and then it start's Testing . 
import Hero from '../landing_page/home/Hero';

// TEST SUITE
describe('Hero Component', () => {
    test('render hero image', () => {
        render(<Hero/>);
        const heroImage = screen.getByAltText('Hero Image');  // It should match with alt attribute if image tag . 
        expect(heroImage).toBeInTheDocument()  // Output that we are expecting  should match with present 
        expect(heroImage).toHaveAttribute('src',"media/images/homeHero.png")
    });

    test('render signup button', () => {
        render(<Hero/>);
        const signupButton = screen.getByRole('button', {name:/SignUp Now/});  // It should match with alt attribute if image tag . 
        expect(signupButton).toBeInTheDocument()  // Output that we are expecting  should match with present 
        expect(signupButton).toHaveClass("btn-primary")
    });
});