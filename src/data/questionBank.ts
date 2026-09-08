import { Question } from '../types';

/**
 * Question Bank parsed directly from the CL-1000 Introduction to ICT Question Bank:
 * - Lab Manual 01: MS Word & MS Excel
 * - Lab Manual 02: MS PowerPoint
 * - Lab Manual 03: Number Systems
 * - Presentation: Introduction to Computer
 */

export const MCQ_POOL: Question[] = [
  // EASY MCQs (Difficulty: 'easy')
  {
    id: 'mcq-1',
    sourceId: 'Q1',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'What is the brain of a computer?',
    options: ['RAM', 'CPU', 'Hard Disk', 'Power Supply'],
    correctAnswer: 'CPU',
    explanation: 'The Central Processing Unit (CPU) is often described as the brain of the computer.'
  },
  {
    id: 'mcq-2',
    sourceId: 'Q5',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'What are the two main components that make up any computer?',
    options: ['Input and Output', 'Hardware and Software', 'RAM and ROM', 'Monitor and Keyboard'],
    correctAnswer: 'Hardware and Software',
    explanation: 'Any computer consists of physical hardware and programmatic software.'
  },
  {
    id: 'mcq-3',
    sourceId: 'Q7',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'Which type of memory is volatile, meaning its data is erased when power is turned off?',
    options: ['ROM', 'Hard Disk', 'RAM', 'Optical Disk'],
    correctAnswer: 'RAM',
    explanation: 'Random Access Memory (RAM) is volatile memory lost when power is turned off.'
  },
  {
    id: 'mcq-4',
    sourceId: 'Q86',
    type: 'mcq',
    difficulty: 'easy',
    category: 'MS Word',
    prompt: 'In MS Word, which tab do you click on to start creating a table?',
    options: ['Design', 'Layout', 'Insert', 'View'],
    correctAnswer: 'Insert',
    explanation: 'Tables are inserted from the Insert tab in Microsoft Word.'
  },
  {
    id: 'mcq-5',
    sourceId: 'Q171',
    type: 'mcq',
    difficulty: 'easy',
    category: 'MS Excel',
    prompt: 'In MS Excel, what is the first character you must type to begin creating a formula in a cell?',
    options: ['A plus sign (+)', 'An asterisk (*)', 'The equals sign (=)', 'An ampersand (&)'],
    correctAnswer: 'The equals sign (=)',
    explanation: 'All Excel formulas must begin with an equals sign (=).'
  },
  {
    id: 'mcq-11',
    sourceId: 'Q2',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'Which unit of the CPU executes all arithmetic and logical operations?',
    options: ['Registers', 'Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Cache Memory'],
    correctAnswer: 'Arithmetic Logic Unit (ALU)',
    explanation: 'The ALU executes mathematical calculations and comparison tests.'
  },
  {
    id: 'mcq-12',
    sourceId: 'Q12',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'What is the maximum storage capacity of a standard CD, as described in the course presentation?',
    options: ['50 GB', '8.4 GB', '700 MB', '1.44 MB'],
    correctAnswer: '700 MB',
    explanation: 'Standard CD storage capacity is 700 MB.'
  },
  {
    id: 'mcq-13',
    sourceId: 'Q15',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'What is the storage capacity of a traditional 3.5" floppy disk as described in the presentation?',
    options: ['1.44 MB', '700 MB', '8.4 GB', '128 KB'],
    correctAnswer: '1.44 MB',
    explanation: 'A 3.5" High Density floppy disk stores 1.44 MB.'
  },
  {
    id: 'mcq-e1',
    sourceId: 'Q18',
    type: 'mcq',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'Which of the following is strictly an input device?',
    options: ['Monitor', 'Printer', 'Mouse', 'Speaker'],
    correctAnswer: 'Mouse',
    explanation: 'A mouse is an input device used to send pointing and click commands into the computer.'
  },
  {
    id: 'mcq-e2',
    sourceId: 'Q65',
    type: 'mcq',
    difficulty: 'easy',
    category: 'MS PowerPoint',
    prompt: 'In MS PowerPoint, which keyboard key starts a presentation slide show from the very first slide?',
    options: ['F1', 'F5', 'F12', 'Ctrl + S'],
    correctAnswer: 'F5',
    explanation: 'Pressing F5 starts the slide show from the first slide in MS PowerPoint.'
  },
  {
    id: 'mcq-e3',
    sourceId: 'Q92',
    type: 'mcq',
    difficulty: 'easy',
    category: 'MS Word',
    prompt: 'In MS Word, which shortcut key is used to save the active document?',
    options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + O', 'Ctrl + Z'],
    correctAnswer: 'Ctrl + S',
    explanation: 'Ctrl + S is the universal keyboard shortcut to save the active document.'
  },

  // TRICKIER MCQs (Difficulty: 'medium')
  {
    id: 'mcq-6',
    sourceId: 'Q185',
    type: 'mcq',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, in the formula =IF(B2>=60,"Pass","Fail"), what is returned if cell B2 contains 93?',
    options: ['"Fail"', '"Pass"', '60', '93'],
    correctAnswer: '"Pass"',
    explanation: 'Since 93 is greater than or equal to 60, the logical condition is true, returning "Pass".'
  },
  {
    id: 'mcq-7',
    sourceId: 'Q194',
    type: 'mcq',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, to freeze the first two rows of a worksheet, which row should you select before clicking Freeze Panes?',
    options: ['The 1st row', 'The 2nd row', 'The 3rd row', 'The entire sheet'],
    correctAnswer: 'The 3rd row',
    explanation: 'Freeze Panes freezes rows above the currently selected row; therefore, select Row 3 to freeze rows 1 and 2.'
  },
  {
    id: 'mcq-8',
    sourceId: 'Q319',
    type: 'mcq',
    difficulty: 'medium',
    category: 'Number Systems',
    prompt: 'According to number system conversions, what is the standard method for converting a decimal number into binary, octal, or hexadecimal?',
    options: [
      'Multiplying repeatedly by 10',
      'Repeatedly dividing by the target base and reading the remainders from bottom to top',
      'Adding 1 to the number repeatedly',
      'Converting each digit directly into its ASCII code'
    ],
    correctAnswer: 'Repeatedly dividing by the target base and reading the remainders from bottom to top',
    explanation: 'Repeated division by the radix and capturing remainders in reverse order converts decimal integers.'
  },
  {
    id: 'mcq-14',
    sourceId: 'Q51',
    type: 'mcq',
    difficulty: 'medium',
    category: 'MS PowerPoint',
    prompt: 'Who are credited with creating the original PowerPoint program at Forethought, Inc.?',
    options: ['Steve Jobs and Steve Wozniak', 'Bill Gates and Paul Allen', 'Robert Gaskins and Dennis Austin', 'Charles Simonyi and Richard Brodie'],
    correctAnswer: 'Robert Gaskins and Dennis Austin',
    explanation: 'Robert Gaskins and Dennis Austin created PowerPoint at Forethought, Inc.'
  },
  {
    id: 'mcq-m1',
    sourceId: 'Q188',
    type: 'mcq',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, what does the dollar sign ($) indicate in the cell reference $A$1?',
    options: [
      'The value formatted in USD currency',
      'An absolute cell reference that does not change when copied',
      'A relative reference to another sheet',
      'An error in formula syntax'
    ],
    correctAnswer: 'An absolute cell reference that does not change when copied',
    explanation: '$ locks row and column coordinates in Excel formulas creating an absolute reference.'
  },
  {
    id: 'mcq-m2',
    sourceId: 'Q310',
    type: 'mcq',
    difficulty: 'medium',
    category: 'Number Systems',
    prompt: 'What is the base (radix) and set of valid digits used in the Octal number system?',
    options: [
      'Base 8, with digits 0 through 7',
      'Base 8, with digits 0 through 8',
      'Base 16, with digits 0 through F',
      'Base 2, with digits 0 and 1'
    ],
    correctAnswer: 'Base 8, with digits 0 through 7',
    explanation: 'Octal is base 8, consisting of exactly eight symbols: 0, 1, 2, 3, 4, 5, 6, 7.'
  },
  {
    id: 'mcq-m3',
    sourceId: 'Q58',
    type: 'mcq',
    difficulty: 'medium',
    category: 'MS PowerPoint',
    prompt: 'In MS PowerPoint, which presentation view displays all slides simultaneously as thumbnails for easy reordering?',
    options: ['Normal View', 'Slide Sorter View', 'Reading View', 'Notes Page View'],
    correctAnswer: 'Slide Sorter View',
    explanation: 'Slide Sorter view displays small thumbnails of all slides for organizing and reordering.'
  },

  // VERY DIFFICULT MCQs (Difficulty: 'hard')
  {
    id: 'mcq-9',
    sourceId: 'Q230',
    type: 'mcq',
    difficulty: 'hard',
    category: 'MS Excel',
    prompt: 'In MS Excel, for =NOT(OR(B2>=60, C2>=90)), if B2=93 and C2=80, what is the evaluated outcome?',
    options: ['TRUE', 'FALSE', '#VALUE!', '93'],
    correctAnswer: 'FALSE',
    explanation: 'B2>=60 is TRUE (93 >= 60), so OR evaluates to TRUE. The NOT function inverses TRUE to FALSE.'
  },
  {
    id: 'mcq-10',
    sourceId: 'Q396',
    type: 'mcq',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the hexadecimal number (E3C)₁₆ to a decimal number:',
    options: ['3644', '3744', '3646', '3844'],
    correctAnswer: '3644',
    explanation: 'E=14, 3=3, C=12. (14 × 16²) + (3 × 16¹) + (12 × 16⁰) = (14 × 256) + 48 + 12 = 3584 + 60 = 3644.'
  },
  {
    id: 'mcq-15',
    sourceId: 'Q325',
    type: 'mcq',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the decimal number (222)₁₀ to its 8-bit binary representation:',
    options: ['11011110', '10011110', '11011010', '11111010'],
    correctAnswer: '11011110',
    explanation: '222 = 128 + 64 + 16 + 8 + 4 + 2 = (11011110)₂.'
  },
  {
    id: 'mcq-16',
    sourceId: 'Q348',
    type: 'mcq',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the decimal number (3794)₁₀ to a hexadecimal number:',
    options: ['EC2', 'ED2', 'EDA', 'F2D'],
    correctAnswer: 'ED2',
    explanation: '3794 / 16 = 237 R 2; 237 / 16 = 14 (E) R 13 (D); result is ED2.'
  },
  {
    id: 'mcq-h1',
    sourceId: 'Q235',
    type: 'mcq',
    difficulty: 'hard',
    category: 'MS Excel',
    prompt: 'In MS Excel, what is the outcome of =AND(5>2, NOT(10<4), OR(3=4, 8>6))?',
    options: ['TRUE', 'FALSE', '#NAME?', '#VALUE!'],
    correctAnswer: 'TRUE',
    explanation: '5>2 is TRUE; 10<4 is FALSE so NOT(FALSE) is TRUE; OR(FALSE, TRUE) is TRUE. All conditions in AND are TRUE, resulting in TRUE.'
  }
];

export const TF_POOL: Question[] = [
  // EASY True/False (Difficulty: 'easy')
  {
    id: 'tf-1',
    sourceId: 'Q401',
    type: 'tf',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'The CPU is described as the brain of a computer.',
    correctAnswer: 'True',
    explanation: 'True. The CPU processes instructions and coordinates all computing operations.'
  },
  {
    id: 'tf-2',
    sourceId: 'Q407',
    type: 'tf',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'RAM is volatile, meaning its data is erased once the power supply is turned off.',
    correctAnswer: 'True',
    explanation: 'True. RAM loses contents when powered down.'
  },
  {
    id: 'tf-3',
    sourceId: 'Q431',
    type: 'tf',
    difficulty: 'easy',
    category: 'Number Systems',
    prompt: 'The binary number system uses only two digits, zero and one.',
    correctAnswer: 'True',
    explanation: 'True. Binary is base-2, using symbols 0 and 1.'
  },
  {
    id: 'tf-4',
    sourceId: 'Q446',
    type: 'tf',
    difficulty: 'easy',
    category: 'MS Word',
    prompt: 'In MS Word, a table is created by clicking the Insert tab and then Table.',
    correctAnswer: 'True',
    explanation: 'True. Tables are located in the Insert tab.'
  },
  {
    id: 'tf-5',
    sourceId: 'Q491',
    type: 'tf',
    difficulty: 'easy',
    category: 'MS Excel',
    prompt: 'In MS Excel, every formula must begin with an equals sign (=).',
    correctAnswer: 'True',
    explanation: 'True. The equals sign signals to Excel that a formula follows.'
  },
  {
    id: 'tf-e1',
    sourceId: 'Q408',
    type: 'tf',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'ROM (Read-Only Memory) is non-volatile and preserves its data even when power is turned off.',
    correctAnswer: 'True',
    explanation: 'True. ROM permanently stores firmware such as the BIOS/UEFI.'
  },
  {
    id: 'tf-e2',
    sourceId: 'Q410',
    type: 'tf',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'A computer monitor is classified as an input hardware device.',
    correctAnswer: 'False',
    explanation: 'False. A monitor is an output device that visually presents data.'
  },
  {
    id: 'tf-e3',
    sourceId: 'Q455',
    type: 'tf',
    difficulty: 'easy',
    category: 'MS Word',
    prompt: 'Pressing Ctrl + Z in Microsoft Word undoes the most recent action.',
    correctAnswer: 'True',
    explanation: 'True. Ctrl + Z is the standard undo shortcut.'
  },
  {
    id: 'tf-e4',
    sourceId: 'Q462',
    type: 'tf',
    difficulty: 'easy',
    category: 'MS PowerPoint',
    prompt: 'In MS PowerPoint, animations and slide transitions refer to the exact same visual feature.',
    correctAnswer: 'False',
    explanation: 'False. Transitions occur between slides; animations apply to individual objects on a slide.'
  },

  // TRICKIER True/False (Difficulty: 'medium')
  {
    id: 'tf-6',
    sourceId: 'Q402',
    type: 'tf',
    difficulty: 'medium',
    category: 'Computer Fundamentals',
    prompt: 'The ALU (Arithmetic Logic Unit) is responsible for controlling and co-ordinating the computer’s components.',
    correctAnswer: 'False',
    explanation: 'False. The Control Unit (CU) coordinates components; the ALU executes arithmetic/logic operations.'
  },
  {
    id: 'tf-7',
    sourceId: 'Q427',
    type: 'tf',
    difficulty: 'medium',
    category: 'Computer Fundamentals',
    prompt: 'Users always interact directly with system software while performing everyday tasks.',
    correctAnswer: 'False',
    explanation: 'False. System software typically runs in the background; users interact primarily with application software.'
  },
  {
    id: 'tf-8',
    sourceId: 'Q497',
    type: 'tf',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, the COUNTA function counts only cells containing numeric data, ignoring text.',
    correctAnswer: 'False',
    explanation: 'False. COUNTA counts all non-empty cells (both text and numbers). COUNT counts numeric only.'
  },
  {
    id: 'tf-11',
    sourceId: 'Q414',
    type: 'tf',
    difficulty: 'medium',
    category: 'Computer Fundamentals',
    prompt: 'According to the course presentation, a standard single-layer DVD can store up to 50 GB of data.',
    correctAnswer: 'False',
    explanation: 'False. A standard DVD stores 4.7 GB (or up to 8.5 GB dual-layer); 50 GB is standard for dual-layer Blu-ray.'
  },
  {
    id: 'tf-m1',
    sourceId: 'Q499',
    type: 'tf',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, the cell reference B$4 is completely absolute in both row and column.',
    correctAnswer: 'False',
    explanation: 'False. B$4 is a mixed reference: the row (4) is locked absolute, but the column (B) remains relative.'
  },
  {
    id: 'tf-m2',
    sourceId: 'Q470',
    type: 'tf',
    difficulty: 'medium',
    category: 'MS PowerPoint',
    prompt: 'In MS PowerPoint, the Slide Master view allows you to modify the layout and appearance of all slides at once.',
    correctAnswer: 'True',
    explanation: 'True. The Slide Master governs the universal design, fonts, and placeholders for the presentation.'
  },

  // VERY DIFFICULT True/False (Difficulty: 'hard')
  {
    id: 'tf-9',
    sourceId: 'Q575',
    type: 'tf',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Binary-to-decimal conversion is performed by repeatedly dividing the binary number by 2.',
    correctAnswer: 'False',
    explanation: 'False. Decimal-to-binary uses repeated division by 2; binary-to-decimal uses positional power summation (multiplying digits by 2ⁿ).'
  },
  {
    id: 'tf-10',
    sourceId: 'Q597',
    type: 'tf',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'The hexadecimal number (36E)₁₆ is equal to (870)₁₀ in decimal.',
    correctAnswer: 'False',
    explanation: 'False. (36E)₁₆ = (3 × 256) + (6 × 16) + 14 = 768 + 96 + 14 = 878, not 870.'
  },
  {
    id: 'tf-12',
    sourceId: 'Q588',
    type: 'tf',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'The binary number (10111101)₂ is equal to (189)₁₀ in the decimal system.',
    correctAnswer: 'True',
    explanation: 'True. 128 + 32 + 16 + 8 + 4 + 1 = 189.'
  },
  {
    id: 'tf-h1',
    sourceId: 'Q530',
    type: 'tf',
    difficulty: 'hard',
    category: 'MS Excel',
    prompt: 'In MS Excel, the formula =IF(AND(A1>10, B1<5), "Passed", "Failed") returns "Passed" if A1=12 and B1=5.',
    correctAnswer: 'False',
    explanation: 'False. B1<5 is FALSE because 5 is not strictly less than 5; AND evaluates to FALSE, returning "Failed".'
  },
  {
    id: 'tf-h2',
    sourceId: 'Q598',
    type: 'tf',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'The hexadecimal value (1F)₁₆ is equivalent to (37)₈ in the octal number system.',
    correctAnswer: 'True',
    explanation: 'True. (1F)₁₆ = (1×16) + 15 = 31 in decimal. 31 in octal is (3×8) + 7 = (37)₈.'
  }
];

export const FILL_POOL: Question[] = [
  // EASY Fill in the Blanks (Difficulty: 'easy')
  {
    id: 'fill-1',
    sourceId: 'Q601',
    type: 'fill',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'The ______ is described as the brain of a computer.',
    correctAnswer: 'CPU',
    acceptableAnswers: ['cpu', 'central processing unit', 'c.p.u.'],
    explanation: 'The CPU (Central Processing Unit) performs primary instruction execution.'
  },
  {
    id: 'fill-2',
    sourceId: 'Q620',
    type: 'fill',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'The basic unit used in computer data storage is called a ______.',
    correctAnswer: 'Bit',
    acceptableAnswers: ['bit', 'binary digit'],
    explanation: 'A bit (binary digit: 0 or 1) is the elementary unit of digital storage.'
  },
  {
    id: 'fill-3',
    sourceId: 'Q668',
    type: 'fill',
    difficulty: 'easy',
    category: 'MS Excel',
    prompt: 'In MS Excel, the function that adds all values of the cells in its argument is called ______.',
    correctAnswer: 'SUM',
    acceptableAnswers: ['sum', '=sum', 'autosum'],
    explanation: 'The SUM function totals cell ranges.'
  },
  {
    id: 'fill-6',
    sourceId: 'Q614',
    type: 'fill',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'According to the course presentation, a standard 3.5-inch floppy disk has a storage capacity of ______ MB.',
    correctAnswer: '1.44',
    acceptableAnswers: ['1.44', '1.44 mb', '1.44mb', '1.44 megabytes'],
    explanation: '1.44 MB is the standard storage capacity.'
  },
  {
    id: 'fill-e1',
    sourceId: 'Q622',
    type: 'fill',
    difficulty: 'easy',
    category: 'Computer Fundamentals',
    prompt: 'One Byte of computer data storage consists of exactly ______ bits.',
    correctAnswer: '8',
    acceptableAnswers: ['8', 'eight'],
    explanation: 'There are 8 bits in one byte.'
  },
  {
    id: 'fill-e2',
    sourceId: 'Q655',
    type: 'fill',
    difficulty: 'easy',
    category: 'MS PowerPoint',
    prompt: 'In MS PowerPoint, an individual page within a presentation is called a ______.',
    correctAnswer: 'Slide',
    acceptableAnswers: ['slide', 'slides'],
    explanation: 'Presentations are organized into individual slides.'
  },

  // TRICKIER Fill in the Blanks (Difficulty: 'medium')
  {
    id: 'fill-7',
    sourceId: 'Q673',
    type: 'fill',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, the function that counts the number of non-empty cells in a range is called ______.',
    correctAnswer: 'COUNTA',
    acceptableAnswers: ['counta', '=counta'],
    explanation: 'COUNTA counts cells that are not empty.'
  },
  {
    id: 'fill-m1',
    sourceId: 'Q630',
    type: 'fill',
    difficulty: 'medium',
    category: 'Number Systems',
    prompt: 'The base or radix of the hexadecimal number system is ______.',
    correctAnswer: '16',
    acceptableAnswers: ['16', 'sixteen'],
    explanation: 'Hexadecimal is base 16.'
  },
  {
    id: 'fill-m2',
    sourceId: 'Q685',
    type: 'fill',
    difficulty: 'medium',
    category: 'MS Excel',
    prompt: 'In MS Excel, the character symbol typed to lock a row or column for absolute referencing is ______.',
    correctAnswer: '$',
    acceptableAnswers: ['$', 'dollar', 'dollar sign'],
    explanation: 'The $ sign locks cell coordinate references.'
  },
  {
    id: 'fill-m3',
    sourceId: 'Q642',
    type: 'fill',
    difficulty: 'medium',
    category: 'MS Word',
    prompt: 'In MS Word, the page orientation where the width of the page is greater than its height is called ______.',
    correctAnswer: 'Landscape',
    acceptableAnswers: ['landscape'],
    explanation: 'Landscape is horizontal page orientation.'
  },

  // VERY DIFFICULT Fill in the Blanks (Difficulty: 'hard')
  {
    id: 'fill-4',
    sourceId: 'Q721',
    type: 'fill',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the decimal number (146)₁₀ into its 8-bit binary representation: (146)₁₀ = (______)₂',
    correctAnswer: '10010010',
    acceptableAnswers: ['10010010', '1001 0010'],
    explanation: '146 = 128 + 16 + 2 = (10010010)₂.'
  },
  {
    id: 'fill-5',
    sourceId: 'Q731',
    type: 'fill',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the decimal number (1491)₁₀ into hexadecimal notation: (1491)₁₀ = (______)₁₆',
    correctAnswer: '5D3',
    acceptableAnswers: ['5d3', '0x5d3', '5D3'],
    explanation: '1491 / 16 = 93 R 3; 93 / 16 = 5 R 13 (D); 5 / 16 = 0 R 5. Result: 5D3.'
  },
  {
    id: 'fill-h1',
    sourceId: 'Q725',
    type: 'fill',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the binary number (110101)₂ into its decimal equivalent: (110101)₂ = (______)₁₀',
    correctAnswer: '53',
    acceptableAnswers: ['53'],
    explanation: '32 + 16 + 4 + 1 = 53.'
  },
  {
    id: 'fill-h2',
    sourceId: 'Q739',
    type: 'fill',
    difficulty: 'hard',
    category: 'Number Systems',
    prompt: 'Convert the hexadecimal number (2B)₁₆ into decimal: (2B)₁₆ = (______)₁₀',
    correctAnswer: '43',
    acceptableAnswers: ['43'],
    explanation: '(2 × 16) + 11 = 32 + 11 = 43.'
  }
];

/**
 * Generates a fresh, randomized 25-question test matching requirements:
 * - 10 MCQs: 5 easy, 3 trickier, 2 very difficult
 * - 10 True/False: 5 easy, 3 trickier, 2 very difficult
 * - 5 Fill in the Blanks: 2 easy, 2 trickier, 1 very difficult
 * Total: exactly 25 questions, shuffled order, zero duplicates.
 */
export function generateTestQuestions(): Question[] {
  // Shuffle helper using Fisher-Yates
  const shuffle = <T>(array: T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // 10 MCQs: 5 easy, 3 trickier (medium), 2 very difficult (hard)
  const easyMCQs = shuffle(MCQ_POOL.filter(q => q.difficulty === 'easy')).slice(0, 5);
  const mediumMCQs = shuffle(MCQ_POOL.filter(q => q.difficulty === 'medium')).slice(0, 3);
  const hardMCQs = shuffle(MCQ_POOL.filter(q => q.difficulty === 'hard')).slice(0, 2);
  const selectedMCQs = [...easyMCQs, ...mediumMCQs, ...hardMCQs].map(q => ({
    ...q,
    options: shuffle(q.options || [])
  }));

  // 10 True/False: 5 easy, 3 trickier (medium), 2 very difficult (hard)
  const easyTFs = shuffle(TF_POOL.filter(q => q.difficulty === 'easy')).slice(0, 5);
  const mediumTFs = shuffle(TF_POOL.filter(q => q.difficulty === 'medium')).slice(0, 3);
  const hardTFs = shuffle(TF_POOL.filter(q => q.difficulty === 'hard')).slice(0, 2);
  const selectedTFs = [...easyTFs, ...mediumTFs, ...hardTFs];

  // 5 Fill in the Blanks: balanced mix of 2 easy, 2 trickier (medium), 1 very difficult (hard)
  const easyFills = shuffle(FILL_POOL.filter(q => q.difficulty === 'easy')).slice(0, 2);
  const mediumFills = shuffle(FILL_POOL.filter(q => q.difficulty === 'medium')).slice(0, 2);
  const hardFills = shuffle(FILL_POOL.filter(q => q.difficulty === 'hard')).slice(0, 1);
  const selectedFills = [...easyFills, ...mediumFills, ...hardFills];

  // Combine and shuffle the overall order of the 25 questions
  const combined = [...selectedMCQs, ...selectedTFs, ...selectedFills];
  return shuffle(combined);
}

/**
 * Smart answer verification for Fill in the Blanks
 * Case-insensitive, trims multiple spaces, accepts common variants
 */
export function verifyAnswer(question: Question, studentAnswer: string): boolean {
  if (!studentAnswer) return false;
  const cleanInput = studentAnswer.trim().toLowerCase().replace(/\s+/g, ' ');

  if (question.type === 'mcq' || question.type === 'tf') {
    return cleanInput === question.correctAnswer.trim().toLowerCase();
  }

  // Fill in the blanks smart check
  const canonical = question.correctAnswer.trim().toLowerCase();
  if (cleanInput === canonical) return true;

  if (question.acceptableAnswers && question.acceptableAnswers.length > 0) {
    return question.acceptableAnswers.some(variant => {
      const cleanVariant = variant.trim().toLowerCase().replace(/\s+/g, ' ');
      return cleanInput === cleanVariant;
    });
  }

  return false;
}
