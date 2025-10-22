export interface ExampleNavItem {
  label: string;
  to: string;
}

export const examplesNavItems: ExampleNavItem[] = [
  { label: "예제 목록", to: "/examples" },
  { label: "기본 폼", to: "/examples/basic-form" },
  { label: "유효성 검사 (Zod)", to: "/examples/validation" },
  { label: "동적 필드", to: "/examples/dynamic-fields" },
  { label: "파일 업로드", to: "/examples/file-upload" },
  { label: "커스텀 컴포넌트", to: "/examples/custom-components" },
  { label: "조건부 필드", to: "/examples/conditional-fields" },
  { label: "배열 필드", to: "/examples/array-fields" },
  { label: "중첩 객체", to: "/examples/nested-objects" },
];
