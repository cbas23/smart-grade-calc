# Smart Grade Calculator

An intelligent grade calculation tool that automatically extracts grading criteria from course syllabi using AI and provides real-time grade tracking with visual feedback.

## Features

- **AI-Powered Syllabus Processing**: Automatically extracts grading components, weights, and grade scales from uploaded syllabus files or text descriptions
- **Multi-Tab Interface**: Manage multiple courses simultaneously with dedicated tabs for each subject
- **Real-Time Grade Calculation**: Instantly calculates final grades as you update your scores
- **Visual Grade Feedback**: Color-coded grade display (A=green, B=blue, C=amber, D=orange, F=red)
- **Detailed Grade Breakdown**: Comprehensive table showing individual section contributions and overall performance
- **File Upload Support**: Accepts various file formats for syllabus upload (PDF, DOCX, etc.)
- **Text Input Option**: Manually enter course descriptions when files aren't available
- **Responsive Design**: Clean, modern interface built with Tailwind CSS

## Technology Stack

- **Frontend**: Svelte 5 with SvelteKit
- **Styling**: Tailwind CSS v4
- **AI Integration**: OpenRouter API with XAI Grok-4-fast model
- **Type Safety**: TypeScript with Zod schemas
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite
- **Package Manager**: Bun

## Architecture

### Core Components

- **[`src/routes/+page.svelte`](src/routes/+page.svelte)**: Main application shell with tab management
- **[`src/lib/components/Composer.svelte`](src/lib/components/Composer.svelte)**: State management component that orchestrates different views
- **[`src/lib/components/Greet.svelte`](src/lib/components/Greet.svelte)**: File upload and text input interface
- **[`src/lib/components/Calculator.svelte`](src/lib/components/Calculator.svelte)**: Grade calculation and display logic
- **[`src/lib/components/Loading.svelte`](src/lib/components/Loading.svelte)**: Animated loading component

### Data Models

- **[`src/lib/subjectData.svelte.ts`](src/lib/subjectData.svelte.ts)**: Core data structures for courses, sections, and grading
- **[`src/lib/schemas/get-data.ts`](src/lib/schemas/get-data.ts)**: Zod validation schemas for API requests/responses

### Backend Services

- **[`src/routes/api/get-data/+server.ts`](src/routes/api/get-data/+server.ts)**: API endpoint for syllabus processing
- **[`src/lib/server/ai.ts`](src/lib/server/ai.ts)**: AI service integration with OpenRouter
- **[`src/lib/server/prompts.ts`](src/lib/server/prompts.ts)**: Structured prompts for AI data extraction

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenRouter API key (for AI functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd patriothacks-2025
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
OPENROUTER_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Create a production build:
```bash
bun run build
# or
npm run build
```

### Deployment

Deploy to Cloudflare Workers:
```bash
bun run deploy
# or
npm run deploy
```

## Usage

1. **Upload a Syllabus**: Drag and drop a course syllabus file or click "Choose File" to select one
2. **Or Enter Text**: Type or paste your course grading criteria in the text area
3. **Process with AI**: Click "Submit" to analyze the syllabus and extract grading components
4. **Track Grades**: Once processed, enter your current scores for each assignment/category
5. **Monitor Progress**: Watch your final grade update in real-time with visual feedback

## Grade Calculation Logic

The calculator uses a weighted average system:

```
Final Grade = Σ (Section Score × Section Weight)
```

Where:
- Section Score = (Points Earned / Max Points) for each category
- Section Weight = Percentage weight of each category (as decimal)

### Default Grade Scale

If no grade scale is found in the syllabus, the application uses:
- A+: 97%+
- A: 93%+
- A-: 90%+
- B+: 87%+
- B: 83%+
- B-: 80%+
- C+: 77%+
- C: 73%+
- C-: 70%+
- D+: 67%+
- D: 63%+
- D-: 60%+
- F: Below 60%

## File Support

The application supports various file formats for syllabus upload:
- PDF documents
- Microsoft Word documents (.docx)
- Text files (.txt)
- And other common document formats

Maximum file size: 10MB

## API Integration

The application integrates with OpenRouter to use the XAI Grok-4-fast model for:
- Extracting grading criteria from syllabi
- Identifying assignment categories and weights
- Parsing grade scales and boundaries
- Structuring unstructured course information

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Built With

- [Svelte](https://svelte.dev/) - Cybernetically enhanced web apps
- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte apps
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenRouter](https://openrouter.ai/) - Unified access to multiple AI models
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless computing platform

---

**Smart Grade Calculator** - Transform how students track their academic progress with AI-powered grade analysis.
