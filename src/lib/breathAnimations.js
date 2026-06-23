const BREATH_ANIMATIONS = {
  'kapal-bhati': {
    bodyClass: 'bg-amber-100 border-amber-200 text-amber-700 animate-kapal-bhati',
    ringClass: 'border-amber-200 opacity-40 animate-kapal-ring',
    label: 'Kapal Bhati'
  },
  'anulom-vilom': {
    bodyClass: 'bg-slate-100 border-slate-300 text-slate-800 animate-anulom-vilom',
    ringClass: 'border-slate-300 opacity-30 animate-anulom-ring',
    label: 'Anulom Vilom'
  },
  'bhramari': {
    bodyClass: 'bg-violet-100 border-violet-200 text-violet-700 animate-bhramari',
    ringClass: 'border-violet-200 opacity-35 animate-bhramari-ring',
    label: 'Bhramari'
  },
  default: {
    bodyClass: 'bg-sky-100 border-sky-200 text-sky-700 animate-breath',
    ringClass: 'border-sky-200 opacity-40 animate-breath-ring',
    label: 'Breathing'
  }
};

export default BREATH_ANIMATIONS;
