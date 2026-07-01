import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentActivityCard from './CurrentActivityCard';

const baseStep = {
  stepKey: 'kapal-bhati',
  names: {
    devanagari: 'कपालभाति प्राणायाम',
    roman: 'Kapal Bhati Pranayam',
    english: 'Skull-Shining Breath'
  },
  category: 'Pranayama',
  type: 'time',
  duration: 300,
  prepTime: 5,
  hasSides: false,
  breathPattern: 'Forceful exhale through the nose, passive inhale. Keep the belly engaged.',
  caution: '',
  videoUrl: '',
  pictureUrl: ''
};

describe('CurrentActivityCard', () => {
  it('renders breath pattern guidance and animation label for Kapal Bhati', () => {
    render(<CurrentActivityCard currentStep={baseStep} isPreparing={false} uiLanguage="English" />);

    expect(screen.getByText(/Breath Pattern/i)).toBeInTheDocument();
    expect(screen.getByText(/Animation: Skull-Shining Breath/i)).toBeInTheDocument();
    expect(screen.getByText(/Forceful exhale through the nose/i)).toBeInTheDocument();
  });

  it('renders default breath animation label for a non-specific breathing step', () => {
    const step = {
      ...baseStep,
      stepKey: 'easy-breathing',
      names: {
        devanagari: 'सरल श्वसन',
        roman: 'Saral Shwasan',
        english: 'Easy Breathing'
      },
      breathPattern: 'Inhale for 4, exhale for 4 — keep the breath even and relaxed.'
    };

    render(<CurrentActivityCard currentStep={step} isPreparing={false} uiLanguage="English" />);

    expect(screen.getByText(/Animation: Easy Breathing/i)).toBeInTheDocument();
    expect(screen.getByText(/Inhale for 4, exhale for 4/i)).toBeInTheDocument();
  });

  it('renders a dual-layer progress monitor for steps with a substep pattern', () => {
    const step = {
      ...baseStep,
      stepKey: 'surya-namaskar',
      names: {
        devanagari: 'सूर्य नमस्कार',
        roman: 'Surya Namaskar',
        english: 'Sun Salutation'
      },
      type: 'sequence',
      reps: 2,
      substepDuration: 5,
      substepAsanaPatternKey: 'sun-salutation-12-step',
      breathPattern: ''
    };

    render(<CurrentActivityCard currentStep={step} isPreparing={false} uiLanguage="English" />);

    expect(screen.getByText('Cycle')).toBeInTheDocument();
    expect(screen.getByText('Substep')).toBeInTheDocument();
  });
});
