# portfolio

minimal single-page portfolio with multi-language support and contact form.

## stack

- next.js 15
- typescript
- tailwind 4
- web3forms + hcaptcha

## run

```bash
npm install
npm run dev
```

## env

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-key
```

get your key at https://web3forms.com (free, unlimited submissions)

## structure

```
app/
  page.tsx             - main page (client component)
  layout.tsx           - metadata + fonts
  globals.css          - tailwind theme + custom styles

lib/
  translations.ts      - all text in 4 languages
```

## sections

```
hero                   - name, title, tagline, stack
what i build           - skills with bullet points
selected work          - project cards with hover
contact                - form (name, email, message)
links                  - github, linkedin, email copy
```

## features

- language switcher (en, pl, uk, ru)
- contact form with web3forms + hcaptcha
- click to copy email with feedback
- card hover effects
- dark gradient theme
- mobile-first responsive

## customization

edit `lib/translations.ts`:
- personal info
- skills list
- project descriptions
- all text in any language

## deploy

```bash
vercel
```
