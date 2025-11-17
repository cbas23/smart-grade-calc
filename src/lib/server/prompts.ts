export const extractDataPrompt = `
  Extract All the grading criteria from the given text/file.
  All the data should be in Markdown format.
`;

export const getSubjectDataPrompt = `
  From the following text, extract the data required for each section of the course.
  Make sure all the grading criteria and components are in resulting JSON.

  Extract the Grading Scale in the following format:
  - lower-grade based, so if A is (100-90)
  - a list of all the letter grades possible with its respective minimum percent required according to the syllabus
  - include all letters including 'A+', 'A', 'A-', 'B+' if present.
  [
    {
      "minPercent": 0.9,
      "letterGrade": "A"
    },
    {
      "minPercent": 0.8,
      "letterGrade": "B"
    },
    ...
  ]
  If the Grade Scale is not present, assume the following:
  - A+: 97
  - A: 93
  - A-: 90
  - B+: 87
  - B: 83
  - B-: 80
  - C+: 77
  - C: 73
  - C-: 70
  - D+: 67
  - D: 63
  - D-: 60
  - F: 0
  as 90 will be the minimum required to reach that letter grade.
  ## For Every Section
  Extract the title max 3 words.
  Extract the weight as a decimal from 0 to 1, ex: 0.5 for 50%
  Extract the number of points will return if completed successfully (has to be integer).
  All the Exams should have their own individual component.
  Do the same for projects that are less than or equal to 5 projects in the course.

  ## For General Data
  Extract the title of the subject (really short, no course number) it should represent the subject:
`;
