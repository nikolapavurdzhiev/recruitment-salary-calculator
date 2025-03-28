# Recruitica Salary Calculator

A smarter way to estimate your base salary in tech recruitment.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with:

```plaintext
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the app.

---

## 📱 How It Works

1. **Landing Page**: Enter your email to begin
2. **Registration**: Fill in a short form if you're a first-time user
3. **Calculator**: Input your role, location, experience, and more
4. **Feedback**: Rate the accuracy of your results and leave suggestions

---

## 📊 Algorithm Behind the Scenes

We use a multi-factor algorithm that takes into account:

- Base salary bands by role and region
- Experience level (logarithmic scaling)
- Niche specialization and industry verticals
- Performance data (billings or placements)
- Client book status
- Performance-based caps to avoid inflated outliers

---

## ⚠️ Disclaimer

This tool provides **base salary estimates only** — it does **not** include commissions or bonuses.

Estimates can vary based on:

- Internal salary bands and budgets
- Market dynamics and economic conditions
- Team structure and responsibilities
- Cultural alignment and soft skills
- Individual negotiation

Use this as a **guide**, not a final answer.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## 📄 License

MIT License. See the `LICENSE` file for more info.

---

## 🙏 Thanks To

- Recruitica 2025 Salary Guide
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Lucide React](https://lucide.dev/) for icons

---

© 2025 Recruitica. All rights reserved.
