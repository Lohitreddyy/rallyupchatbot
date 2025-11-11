
# 🚀 RallyUp AI – Authentic LinkedIn Post Generator

An AI-powered LinkedIn post generator designed to help founders, employees and mission-driven creators craft authentic, engaging content with a distinctive voice and energy.

## Features

- **AI-Powered Generation**: Uses OpenAI's fine-tuned model to generate LinkedIn posts with authentic energy
- **Model Selection**: Choose between base GPT-4o-mini or the custom fine-tuned RallyUp AI model
- **Modern UI**: Clean, responsive interface with dark mode support
- **Real-time Generation**: Fast, seamless post generation with loading states
- **Auto-resizing Input**: Smart textarea that adapts to your content
- **Keyboard Shortcuts**: Submit with `Cmd/Ctrl + Enter` for faster workflow

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Vercel account for deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rallyupchatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL_ID=ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW
   ```

4. **Start the development server**
   ```bash
   npm run dev
   vercel dev (if you see any error with npm run dev)
   ```

   The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run linting (placeholder)

### Project Structure

```
rallyupchatbot/
├── api/                 # API routes (Vercel serverless functions)
│   └── generate.ts      # OpenAI API integration
├── data/               # Training data and corpus
├── public/             # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── chat.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── OutputCard.tsx
│   │   ├── PromptForm.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WelcomeBanner.tsx
│   ├── lib/            # Utility functions
│   │   └── api.ts      # API client
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   ├── index.css       # Global styles
│   └── theme.ts        # Theme configuration
└── package.json        # Dependencies and scripts
```

## Configuration

### OpenAI Model

The application supports two models:

1. **Base Model**: `gpt-4o-mini-2024-07-18` - Standard OpenAI model
2. **Fine-tuned Model**: `ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW` - Custom RallyUp AI model (default)

You can switch between models using the dropdown in the application header.

### API Configuration

The API endpoint (`/api/generate`) is configured with:
- **Temperature**: 0.7 (balanced creativity)
- **Top-p**: 0.9
- **Max Output Tokens**: 500

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL_ID`

The API routes in the `api/` directory will automatically be deployed as serverless functions.

## Customization

### Styling

The project uses Tailwind CSS for styling. Modify `tailwind.config.js` to customize the design system.

### Theme

Dark mode is supported out of the box. Theme configuration can be found in `src/theme.ts`.

## Usage

1. **Enter your prompt**: Type what you want to write about in the input field
2. **Select a model**: Choose between the base model or the fine-tuned RallyUp AI model
3. **Generate**: Click the arrow button or press `Cmd/Ctrl + Enter`
4. **Copy and use**: Copy the generated post and use it on LinkedIn

### Example Prompts

- "I want to share my journey as a founder"
- "Announcing our new product launch"
- "Reflecting on lessons learned this year"
- "Sharing my thoughts on remote work"

## Security

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- Use environment variables for all sensitive configuration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

See the [LICENSE](LICENSE) file for details.

## Troubleshooting

### API Errors

- Verify your OpenAI API key is correct
- Check that you have sufficient API credits
- Ensure the model ID is valid (if using a fine-tuned model)

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Environment Variables

- Ensure `.env` file is in the root directory
- Restart the development server after changing environment variables

## Support

If you found RallyUp AI useful, please give this repo a ⭐ on GitHub!
It helps others discover the project and keeps the momentum going 🙌

For questions, ideas, or contributions — open an issue or PR anytime.

---

Built with ❤️ using React, TypeScript, Vite and OpenAI
```