import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../index';
import { ThemeProvider } from '../../../context/ThemeContext';

describe('Landing Page & Modular Sections Integration', () => {
  const renderLanding = () =>
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Landing />
        </ThemeProvider>
      </MemoryRouter>
    );

  test('renders all modular sections properly', () => {
    renderLanding();

    // 1. Hero Section
    expect(screen.getByRole('heading', { level: 1, name: /Skin Disease Classification via/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Ensemble Deep Learning/i).length).toBeGreaterThanOrEqual(1);

    // 2. How It Works Section
    expect(screen.getByRole('heading', { level: 2, name: /How the Detection Pipeline Works/i })).toBeInTheDocument();
    expect(screen.getByText('STEP 01')).toBeInTheDocument();
    expect(screen.getByText('STEP 04')).toBeInTheDocument();

    // 3. Architecture Section
    expect(screen.getByRole('heading', { level: 2, name: /Why Ensemble Stacking\?/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'ResNet-101' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'DenseNet-121' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'EfficientNet-B3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Logistic Meta-Learner' })).toBeInTheDocument();

    // 4. Dataset Section
    expect(screen.getByRole('heading', { level: 2, name: /Trained on Kaggle's HAM10000 Dataset/i })).toBeInTheDocument();
    expect(screen.getByText('10,015')).toBeInTheDocument();

    // 5. Conditions Section
    expect(screen.getByRole('heading', { level: 2, name: /7 Supported Skin Disease Conditions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Melanoma' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Basal Cell Carcinoma' })).toBeInTheDocument();

    // 6. Limitations Section
    expect(screen.getByRole('heading', { level: 2, name: /Project Scope & AI Limitations/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Academic Research Project' })).toBeInTheDocument();

    // 7. Live Demo CTA Section
    expect(screen.getByRole('heading', { level: 2, name: /Ready to test the Ensemble Model\?/i })).toBeInTheDocument();

    // 8. Footer
    expect(screen.getByText(/Skin Disease Classification Project/i)).toBeInTheDocument();
  });

  test('filters conditions accurately by category', () => {
    renderLanding();

    // Scope queries to conditions section
    const conditionsSection = document.getElementById('conditions');
    expect(conditionsSection).toBeInTheDocument();

    // Default: All 7 conditions visible
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanoma' })).toBeInTheDocument();
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Basal Cell Carcinoma' })).toBeInTheDocument();
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanocytic Nevi' })).toBeInTheDocument();

    // Filter by Malignant
    const malignantBtn = within(conditionsSection).getByRole('button', { name: /Malignant \(2\)/i });
    fireEvent.click(malignantBtn);

    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanoma' })).toBeInTheDocument();
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Basal Cell Carcinoma' })).toBeInTheDocument();
    expect(within(conditionsSection).queryByRole('heading', { level: 4, name: 'Melanocytic Nevi' })).not.toBeInTheDocument();

    // Filter by Pre-Cancerous
    const precancerBtn = within(conditionsSection).getByRole('button', { name: /Pre-Cancerous \(1\)/i });
    fireEvent.click(precancerBtn);

    expect(within(conditionsSection).getByRole('heading', { level: 4, name: "Actinic Keratoses / Bowen's Disease" })).toBeInTheDocument();
    expect(within(conditionsSection).queryByRole('heading', { level: 4, name: 'Melanoma' })).not.toBeInTheDocument();

    // Filter by Benign
    const benignBtn = within(conditionsSection).getByRole('button', { name: /Benign \(4\)/i });
    fireEvent.click(benignBtn);

    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanocytic Nevi' })).toBeInTheDocument();
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Dermatofibroma' })).toBeInTheDocument();
    expect(within(conditionsSection).queryByRole('heading', { level: 4, name: 'Melanoma' })).not.toBeInTheDocument();

    // Switch back to All
    const allBtn = within(conditionsSection).getByRole('button', { name: /All Conditions \(7\)/i });
    fireEvent.click(allBtn);

    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanoma' })).toBeInTheDocument();
    expect(within(conditionsSection).getByRole('heading', { level: 4, name: 'Melanocytic Nevi' })).toBeInTheDocument();
  });
});
