# @divetocode/modal

> A lightweight, beautiful modal dialog system for React & Next.js — powered by emotion, built for speed..

## ✨ Features

- ⚡ Lightweight & fast
- 🎨 Simple, modern design
- 🧠 Intuitive API: `<AlertModal />`
- 🎯 Fully compatible with React & Next.js
- 🎛️ Smooth open/close transitions
- 🖱️ Close on background click

---

## 📦 Install

```bash
npm install @divetocode/modal
```

## 🎯 Usage

### AlertModal

#### 1. Import & use the AlertModal component:

```tsx

import { useState } from "react";
import { AlertModal } from "@divetocode/modal";

export default function ExamplePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <AlertModal
        isOpen={isOpen}
        message="Are you sure you want to proceed?"
        confirmText="Confirm"
        alarmText="Alarm"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

```

#### 2. AlertModal Props

| Prop          | Type         | Description                             | Required | Default |
| ------------- | ------------ | --------------------------------------- | -------- | ------- |
| `isOpen`      | `boolean`    | Whether the modal is open               | ✅        | -       |
| `message`     | `string`     | The text message displayed in the modal | ✅        | -       |
| `confirmText` | `string`     | The text for the confirm button         | ❌        | `Confirm`  |
| `alarmText`   | `string`     | The text for the Alarm                  | ❌        | `Alarm`  |
| `onClose`     | `() => void` | Function to call when closing the modal | ✅        | -       |


## 📁 Folder structure:

src/

├── AlertModal.tsx

└── index.ts

## 📄 License
MIT © divetocode

## 🖤 From divetocode
Built to feel right in design systems & product codebases.
Use it, fork it, and modal your users the beautiful way.

## 📦 Package

**npm:** [`@divetocode/modal`](https://www.npmjs.com/package/@divetocode/modal)  
**GitHub:** [`divetocode/divetocode-modal`](https://github.com/divetocode/divetocode-modal)

