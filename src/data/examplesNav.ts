export interface ExampleNavItem {
  label: string;
  to: string;
}

export const examplesNavItems: ExampleNavItem[] = [
  { label: "예제 목록", to: "/examples" },
  { label: "Basic Form", to: "/examples/basic-form" },
  { label: "Validation (Zod)", to: "/examples/validation" },
  { label: "Dynamic Fields", to: "/examples/dynamic-fields" },
  { label: "File Upload", to: "/examples/file-upload" },
  { label: "Custom Components", to: "/examples/custom-components" },
  { label: "Conditional Fields", to: "/examples/conditional-fields" },
  { label: "Array Fields", to: "/examples/array-fields" },
  { label: "Nested Objects", to: "/examples/nested-objects" },
];


