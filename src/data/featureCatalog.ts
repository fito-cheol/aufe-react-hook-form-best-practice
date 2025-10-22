export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  docs?: string;
  route?: string;
}

// React Hook Form 핵심 기능 기반 카탈로그
export const featureCatalog: FeatureItem[] = [
  {
    id: "useForm",
    title: "useForm",
    description: "폼 상태, 제출, 유효성 검사 등을 관리하는 핵심 훅",
    docs: "https://react-hook-form.com/docs/useform",
    route: "/examples/basic-form",
  },
  {
    id: "register",
    title: "register",
    description: "입력 필드를 RHF에 등록하여 상태와 유효성 검사를 연결",
    docs: "https://react-hook-form.com/docs/useform/register",
    route: "/examples/basic-form",
  },
  {
    id: "handleSubmit",
    title: "handleSubmit",
    description: "제출 이벤트를 감싸 유효성 검사 후 콜백 실행",
    docs: "https://react-hook-form.com/docs/useform/handlesubmit",
    route: "/examples/basic-form",
  },
  {
    id: "formState.errors",
    title: "formState.errors",
    description: "유효성 검사 에러 상태 접근",
    docs: "https://react-hook-form.com/docs/useform/formstate",
    route: "/examples/validation",
  },
  {
    id: "zodResolver",
    title: "zodResolver",
    description: "Zod 스키마와 RHF를 연결하여 스키마 기반 검증",
    docs: "https://github.com/react-hook-form/resolvers",
    route: "/examples/validation",
  },
  {
    id: "useFieldArray",
    title: "useFieldArray",
    description: "동적 배열 필드 추가/삭제/이동 관리",
    docs: "https://react-hook-form.com/docs/usefieldarray",
    route: "/examples/dynamic-fields",
  },
  {
    id: "Controller",
    title: "Controller",
    description: "외부/커스텀 컴포넌트를 RHF와 연결",
    docs: "https://react-hook-form.com/docs/usecontroller/controller",
    route: "/examples/custom-components",
  },
  {
    id: "useWatch",
    title: "useWatch",
    description: "특정 필드 변화 감시로 조건부 UI 구현",
    docs: "https://react-hook-form.com/docs/usewatch",
    route: "/examples/conditional-fields",
  },
  {
    id: "NestedObject",
    title: "중첩 객체 (dot notation)",
    description: "점 표기법으로 중첩 필드 등록/검증",
    docs: "https://react-hook-form.com/advanced-usage#FieldArrays",
    route: "/examples/nested-objects",
  },
  {
    id: "FileInputs",
    title: "파일 입력 처리",
    description: "FileList와 유효성 검사 처리",
    docs: "https://react-hook-form.com/advanced-usage#IntegratingControlledInputs",
    route: "/examples/file-upload",
  },
];
