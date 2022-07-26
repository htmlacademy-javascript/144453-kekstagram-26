
/*

Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;

*/

const effectsPreset = [
  {effect:'chrome',
    filter:'grayscale',
    min:0,
    max:1,
    step:0.1,
    format:''
  },
  {effect:'sepia',
    filter:'sepia',
    min:0,
    max:1,
    step:0.1,
    format:''
  },
  {effect:'marvin',
    filter:'invert',
    min:0,
    max:100,
    step:1,
    format:'%'
  },
  {effect:'phobos',
    filter:'blur',
    min:0,
    max:3,
    step:0.1,
    format:'px'
  },
  {effect:'heat',
    filter:'brightness',
    min:1,
    max:3,
    step:0.1,
    format:''
  },
];


export {effectsPreset};
