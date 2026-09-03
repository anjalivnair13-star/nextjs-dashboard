# Next.js Upskilling and Knowledge Building

## Overview

As part of the preparation for the upcoming **Information Service project**, dedicated time was allocated to build foundational knowledge and hands-on experience with **Next.js**.

The objective of this learning activity was to understand core Next.js concepts and gain practical experience in creating, running, troubleshooting, and extending a Next.js application.

The primary learning resource used was the official Next.js Learn course:

* Next.js Learn: https://nextjs.org/learn/
* Tutorial Project: Next.js Dashboard Application

> **Implementation Note:** The original tutorial uses PostgreSQL and Vercel for database setup and deployment-related activities. For this learning exercise, the application was adapted to use **Next.js API Route Handlers and local/mock data** instead of PostgreSQL. This allowed the complete learning journey and sample application to be implemented and tested locally.

---

# Overall Learning Status

## 🟢 Completed

All **15 chapters** of the Next.js Learn tutorial have been completed.

The Next.js Dashboard sample application was implemented and adapted to use an **API-based approach instead of PostgreSQL database queries**.

---

# Chapter-wise Learning Progress

| Chapter | Topic                        | Status                     | Practical Learning / Implementation                                                                                                           |
| ------- | ---------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | Getting Started              | 🟢 Completed               | Created, configured, and ran the Next.js Dashboard application locally using `pnpm`.                                                          |
| 2       | CSS Styling                  | 🟢 Completed               | Worked with global CSS, CSS Modules, and Tailwind CSS.                                                                                        |
| 3       | Optimizing Fonts and Images  | 🟢 Completed               | Used `next/font` and `next/image` for optimized fonts and images.                                                                             |
| 4       | Creating Layouts and Pages   | 🟢 Completed               | Implemented layouts and file-based routing using the App Router.                                                                              |
| 5       | Navigating Between Pages     | 🟢 Completed               | Used `next/link` for navigation between application pages.                                                                                    |
| 6       | Setting Up the Database      | 🟢 Completed – API Adapted | Studied the database concepts from the tutorial and replaced the PostgreSQL implementation with API Route Handlers and local/mock data.       |
| 7       | Fetching Data                | 🟢 Completed – API Adapted | Replaced SQL queries with API calls for revenue, invoices, customers, and dashboard data. Used concurrent data fetching with `Promise.all()`. |
| 8       | Static and Dynamic Rendering | 🟢 Completed               | Learned the concepts of static and dynamic rendering and how data fetching affects rendering behaviour.                                       |
| 9       | Streaming                    | 🟢 Completed – API Adapted | Implemented React `Suspense`, streaming, and loading skeleton components.                                                                     |
| 10      | Partial Prerendering         | 🟢 Completed               | Learned the concepts of combining static and dynamic content within an application.                                                           |
| 11      | Mutating Data                | 🟢 Completed – API Adapted | Implemented Create, Update, and Delete invoice operations using Server Actions and API Route Handlers instead of SQL queries.                 |
| 12      | Handling Errors              | 🟢 Completed               | Implemented error handling, `error.tsx`, `notFound()`, and custom `not-found.tsx` pages.                                                      |
| 13      | Improving Accessibility      | 🟢 Completed               | Learned and implemented accessibility improvements, form validation, semantic structure, and accessible error feedback.                       |
| 14      | Adding Authentication        | 🟢 Completed – API Adapted | Implemented authentication concepts using Auth.js Credentials Provider with API/local mock user validation instead of PostgreSQL.             |
| 15      | Adding Metadata              | 🟢 Completed               | Learned how to add metadata and improve application information for pages and browser/search engine presentation.                             |

---

# Key Learning Areas

## 1. Next.js Fundamentals and Project Structure

**Status: 🟢 Completed**

Completed activities:

* Understanding the purpose and benefits of Next.js.
* Creating and running a Next.js application locally.
* Understanding the project structure.
* Working with the `app` directory.
* Understanding the purpose of `page.tsx`.
* Understanding the purpose of `layout.tsx`.
* Creating reusable UI components.
* Running the application using:

```bash
pnpm dev
```

---

## 2. App Router and File-Based Routing

**Status: 🟢 Completed**

Practical implementation included:

* Using the Next.js App Router.
* Creating routes based on folder structure.
* Creating pages using `page.tsx`.
* Creating shared layouts using `layout.tsx`.
* Working with nested routes.
* Implementing dynamic routes.

Example:

```text
/dashboard/invoices/[id]/edit
```

Also implemented:

* Navigation using `next/link`.
* Route protection concepts.
* Missing resource handling using `notFound()`.

---

## 3. React Server Components and Client Components

**Status: 🟢 Completed**

Learning included:

* Understanding Server Components.
* Understanding Client Components.
* Using `'use client'` for interactive components.
* Understanding when browser APIs and React hooks require Client Components.
* Performing server-side data fetching.
* Separating server and client responsibilities.

Examples explored include:

* Search functionality.
* Forms.
* Pagination.
* Interactive UI components.
* Server-rendered dashboard components.

---

## 4. Server-Side Rendering and Dynamic Rendering

**Status: 🟢 Completed**

Learning included:

* Understanding server-side rendering concepts.
* Understanding dynamic rendering.
* Understanding how server-side data fetching works.
* Exploring how API-based data fetching can be used within Server Components.
* Understanding when dynamic rendering is appropriate.

---

## 5. Static Rendering / Static Site Generation Concepts

**Status: 🟢 Completed**

Learning included:

* Understanding static rendering.
* Understanding when pages can be pre-rendered.
* Comparing static and dynamic rendering.
* Understanding the benefits of serving pre-rendered content.

---

## 6. Incremental Static Regeneration Concepts

**Status: 🟢 Completed**

Learning included:

* Understanding Incremental Static Regeneration.
* Understanding revalidation concepts.
* Understanding how cached content can be refreshed.
* Comparing static, dynamic, and revalidated content.

---

## 7. Client-Side Rendering

**Status: 🟢 Completed**

Learning included:

* Understanding Client Components.
* Understanding client-side interactivity.
* Using React hooks where appropriate.
* Understanding the difference between server-side and client-side responsibilities.
* Comparing CSR with static and dynamic rendering approaches.

---

## 8. Data Fetching Patterns

**Status: 🟢 Completed**

The original tutorial used PostgreSQL queries for data access.

For this implementation, database queries were replaced with an API-based architecture.

Architecture used:

```text
Next.js Page / Server Component
            ↓
      Data Function
            ↓
       fetchApi()
            ↓
Next.js API Route Handler
            ↓
     Local / Mock Data
```

Implemented data operations included:

* Fetching revenue data.
* Fetching latest invoices.
* Fetching dashboard card data.
* Fetching filtered invoices.
* Searching invoices.
* Pagination.
* Fetching individual invoices.
* Fetching customers.
* Fetching filtered customers.

`Promise.all()` was also used to fetch independent resources concurrently.

Example:

```ts
const [invoice, customers] = await Promise.all([
  fetchInvoiceById(id),
  fetchCustomers(),
]);
```

---

## 9. State Management Approaches

**Status: 🟢 Completed**

Learning included:

* Managing search and pagination state using URL search parameters.
* Understanding server state and client state.
* Using React state where required.
* Using Server Actions for form submissions.
* Understanding how application state can be managed without introducing an external state management library for simple scenarios.

---

## 10. Data Mutation and Server Actions

**Status: 🟢 Completed**

The application implemented data mutation using:

* Server Actions.
* Form submissions.
* API Route Handlers.
* Cache revalidation.
* Redirects after successful operations.

The following operations were implemented:

```text
Create Invoice
      ↓
POST API
```

```text
Update Invoice
      ↓
PUT/PATCH API
```

```text
Delete Invoice
      ↓
DELETE API
```

The original SQL queries were replaced with API requests.

---

## 11. Streaming, Suspense, and Loading States

**Status: 🟢 Completed**

Practical implementation included:

* React `Suspense`.
* Loading skeleton components.
* Streaming dashboard content.
* Separating loading boundaries for different sections of a page.

---

## 12. Error Handling

**Status: 🟢 Completed**

Implemented and explored:

* Runtime error handling.
* Error boundaries using `error.tsx`.
* Custom Not Found pages.
* `notFound()` from `next/navigation`.
* API error handling.
* Handling missing invoices and other invalid resources.

Example flow:

```text
Invalid Invoice ID
        ↓
API returns 404
        ↓
fetchInvoiceById() returns null
        ↓
notFound()
        ↓
not-found.tsx
```

---

## 13. Authentication Concepts

**Status: 🟢 Completed – API Adapted**

Authentication was implemented without PostgreSQL or Vercel.

Learning included:

* Auth.js configuration.
* Credentials Provider.
* Login forms.
* Server Actions.
* User validation.
* Sessions.
* Protected routes.
* Authentication callbacks.
* `proxy.ts`.
* Environment variables.
* `AUTH_SECRET`.
* Login and logout concepts.

Authentication architecture:

```text
Login Form
     ↓
Server Action
     ↓
Auth.js Credentials Provider
     ↓
API User Validation
     ↓
Local / Mock User Data
     ↓
Session Creation
     ↓
Protected Dashboard Routes
```

> The API/local user approach was used for learning purposes. In a production application, user credentials should be securely stored and passwords should be hashed.

---

## 14. Accessibility

**Status: 🟢 Completed**

Learning included:

* Form validation.
* Accessible error messages.
* Semantic HTML.
* Accessible labels.
* Client-side and server-side validation concepts.
* Improving the user experience for form submissions.

---

## 15. Metadata

**Status: 🟢 Completed**

Learning included:

* Understanding metadata in Next.js.
* Adding page metadata.
* Understanding metadata inheritance.
* Improving page information for browsers and search engines.

---

# Sample Application Evidence

The learning activities were applied to the **Next.js Dashboard sample application**.

| Requirement         | Implementation                                        |
| ------------------- | ----------------------------------------------------- |
| Next.js application | Next.js Dashboard application created and run locally |
| App Router          | Implemented using the `app` directory                 |
| Routing             | File-based routing                                    |
| Layouts             | Shared dashboard layouts                              |
| Dynamic routes      | Invoice editing using `[id]`                          |
| Data fetching       | API-based data fetching                               |
| Mock data           | Local/mock data used instead of PostgreSQL            |
| API routes          | Next.js Route Handlers                                |
| Concurrent requests | `Promise.all()`                                       |
| Search              | Invoice and customer search                           |
| Pagination          | Invoice pagination                                    |
| Create              | API-based invoice creation                            |
| Update              | API-based invoice update                              |
| Delete              | API-based invoice deletion                            |
| Server Actions      | Used for form mutations                               |
| Streaming           | React `Suspense` and loading skeletons                |
| Error handling      | `error.tsx`                                           |
| Not Found           | `notFound()` and custom `not-found.tsx`               |
| Authentication      | Auth.js with API/local user validation                |
| Accessibility       | Form validation and accessibility improvements        |
| Metadata            | Next.js metadata implementation                       |

---

# Acceptance Criteria Status

| Acceptance Criteria                                                               | Status       | Evidence                                                                                                                                          |
| --------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Team members complete agreed Next.js learning activities                          | 🟢 Completed | All 15 chapters of the Next.js Learn tutorial completed.                                                                                          |
| Developers can create and run a Next.js application locally                       | 🟢 Completed | Created and ran the Next.js Dashboard application locally using `pnpm dev`.                                                                       |
| Developers understand SSR, SSG, ISR, and CSR concepts                             | 🟢 Completed | Completed the relevant tutorial concepts covering rendering strategies, caching, static/dynamic rendering, and client/server rendering.           |
| A sample application is created demonstrating routing, layouts, and data fetching | 🟢 Completed | Next.js Dashboard application demonstrates App Router, layouts, dynamic routes, API-based data fetching, search, pagination, and CRUD operations. |
| Learning materials and useful references are documented                           | 🟢 Completed | Learning progress, implementation approach, and useful references documented in this file.                                                        |

---

# Learning Materials and References

## Primary Learning Material

* Next.js Learn: https://nextjs.org/learn/
* Next.js Dashboard Tutorial: https://nextjs.org/learn/dashboard-app

## Useful References

* Next.js Documentation: https://nextjs.org/docs
* App Router: https://nextjs.org/docs/app
* Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching
* Rendering: https://nextjs.org/docs/app/building-your-application/rendering
* Caching: https://nextjs.org/docs/app/building-your-application/caching
* Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
* Authentication: https://nextjs.org/docs/app/guides/authentication
* Auth.js: https://authjs.dev/
* Playwright: https://playwright.dev/

---

# Final Learning Summary

**Overall Status: 🟢 Completed**

All **15 chapters of the Next.js Learn tutorial** have been completed successfully.

The learning activities provided hands-on experience with:

* Next.js fundamentals and project structure.
* App Router and file-based routing.
* Layouts and navigation.
* Server and Client Components.
* Static and dynamic rendering concepts.
* Server-side and client-side rendering concepts.
* Data fetching patterns.
* API Route Handlers.
* Concurrent data fetching using `Promise.all()`.
* Streaming and React `Suspense`.
* Search and pagination.
* Server Actions.
* Create, Update, and Delete operations.
* Error handling and custom Not Found pages.
* Accessibility improvements.
* Authentication using Auth.js.
* Session and protected route concepts.
* Metadata.

The original PostgreSQL-based sections of the tutorial were successfully adapted to use **API Route Handlers and local/mock data**, allowing the complete sample application to be developed and tested locally.

The completed learning activity provides a practical foundation for working on upcoming **Next.js-based development within the Information Service project**.
