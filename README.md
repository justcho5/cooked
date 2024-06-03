# cooked
cooked is a recipes app to help manage recipes, as well as import recipes by URL and generate recipes with AI. 

## Features
- Add, delete, edit your own recipes.
- Import by url feature allows users to import and add recipes by providing a url to the recipe.
- Generate Recipe feature utilizes GPT to generate a new recipe given user-inputed ingredients.

## Getting Started
### Prerequisites
Node.js 
npm (v10 or later)
A modern web browser

## Installation
1. Clone then navigate to the repository
  ```
  git clone https://github.com/yourusername/cooked.git
  cd cooked
  ```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory
```
OPENAI_API_KEY=your_openai_api_key

```

4. Start the application
```
// To run in development mode:
npm run dev

// To run in production mode:
npm run build
npm start
```
The application should now be running on http://localhost:3000. Open your web browser and navigate to this address to start using cooked.

